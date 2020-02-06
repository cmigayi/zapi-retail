var express = require('express');

var setting = express.Router();

setting.get("/", function(req, res){
  res.render("settings", {"page": "settings", "user": null, "errors": null});
});

module.exports = setting;
