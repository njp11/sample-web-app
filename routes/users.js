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

module.exports = router;
