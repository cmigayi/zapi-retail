var express = require('express');
var userController = require('../controllers/user');

var logout = express.Router();

logout.get("/", userController.logoutUser);

module.exports = logout;
