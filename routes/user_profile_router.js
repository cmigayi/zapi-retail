var express = require('express');
var userController = require('../controllers/user');

var user_profile = express.Router();

user_profile.get(
  "/",
  userController.getUser
);

// user_profile.post(
//   "/",
//   userController.updateUser
// );

module.exports = user_profile;
