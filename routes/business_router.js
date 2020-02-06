var express = require("express");
var businessController = require('../controllers/business');

var business = express.Router();

business.get(
  "/",
  businessController.getBusinesses
);

business.post(
  "/",
  businessController.validateBusiness('createBusiness'),
  businessController.createBusiness
);

business.get(
  "/:id/edit",
  businessController.editBusiness
);

business.post(
  "/update",
  businessController.validateBusiness('updateBusiness'),
  businessController.updateBusiness
);

business.get(
  "/:id/delete",
  businessController.deleteBusiness
);

module.exports = business;
