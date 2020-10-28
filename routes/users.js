const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check } = require('express-validator');
const userController = require('../controller/userSignup');
const { signup } = userController;

// @route    POST api/users
//@desc      Register a user
//@access    Public
router.post(
  '/',
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    'image'
  ),
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
  ],
  signup
);

// router.post(
//   '/',
//   upload.any(),
// [
//   check('name', 'Please add name').not().isEmpty(),
//   check('email', 'Please include a valid email').isEmail(),
//   check(
//     'password',
//     'Please enter a password with 8 or more characters'
//   ).isLength({ min: 8 }),
// ],
// async (req, res, next) => {
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   return res.status(400).json({ errors: errors.array() });
// }

// const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     let imageUrl = imageController.uploadImageToS3;
//     console.log(imageUrl);

//     user = new User({
//       name,
//       email,
//       password,
//     });

//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       config.get('jwtSecret'),
//       {
//         expiresIn: 360000,
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// }
// );

module.exports = router;
