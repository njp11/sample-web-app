const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');
const uuid = require('uuid/v4');
aws.config.update({
  secretAccessKey: config.get('secretAccessKey'),
  accessKeyId: config.get('accessKeyId'),
  region: config.get('region'),
});
var s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'images-sample-web-app',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, req.s3Key);
    },
  }),
});

const fileUpload = upload.single('image');

const uploadToS3 = (req, res) => {
  req.s3Key = uuid();
  let downloadUrl = `https://s3-us-east-2.amazonaws.com/images-sample-web-app/${req.s3Key}`;
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

module.exports = {
  uploadImageToS3: (req, res) => {
    uploadToS3(req, res)
      .then((downloadUrl) => {
        console.log(downloadUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
