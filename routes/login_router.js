var express = require('express');
var userController = require('../controllers/user');

var login = express.Router();

login.get("/", function(req, res){
  res.render("login", {"errors": null});
});

login.post(
  "/",
  userController.validateUser('loginUser'),
  userController.loginUser
);

module.exports = login;
