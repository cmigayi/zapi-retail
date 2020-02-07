var express = require("express");
const multer = require('multer');

const csv_upload = multer({ dest: "uploads/csv/" });
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

business.get(
  "/import",
  businessController.selectBusinessImportFile
);

business.post(
  "/import",
  csv_upload.single('file'),
  businessController.importBusinessFile
);

module.exports = business;
