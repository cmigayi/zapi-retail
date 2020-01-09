var express = require('express');
var userController = require('../controllers/user');

var signup = express.Router();

signup.get("/:pkg_type", function(req, res){
  res.render("signup", {"package": req.params.pkg_type, "errors": null });
});

signup.post(
  "/",
  userController.validateUser('createUser'),
  userController.createUser
);

module.exports = signup;
