// import { userModel as Users } from '../models';
const aws = require('aws-sdk');
const fs = require('fs');
const config = require('config');
const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

module.exports = {
  signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      return res.status(400).json({ msg: errors.errors[0].msg });
    }
    const { name, email, password } = req.body;
    aws.config.setPromisesDependency();
    aws.config.update({
      secretAccessKey: process.env.secretAccessKey,
      accessKeyId: process.env.accessKeyId,
      region: process.env.region,
    });
    const s3 = new aws.S3();
    const id = uuid();
    var params = {
      ACL: 'public-read',
      Bucket: process.env.bucket,
      Body: fs.createReadStream(req.file.path),
      Key: `${id}${req.file.originalname}`,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder
        const locationUrl = data.Location;
        try {
          let user = await User.findOne({ email });

          if (user) {
            return res.status(400).json({ msg: 'User already exists' });
          }
          user = new User({
            name,
            email,
            password,
            avatar: locationUrl,
          });

          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(password, salt);

          await user.save();

          const payload = {
            user: {
              id: user.id,
            },
          };

          jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
              expiresIn: 360000,
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
      }
    });
  },
};
