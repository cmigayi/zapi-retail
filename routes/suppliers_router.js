var express = require("express");
const multer = require('multer');

const csv_upload = multer({ dest: "uploads/csv/" });
var supplierController = require('../controllers/supplier');

var supplier = express.Router();

supplier.get(
  "/",
  supplierController.getSuppliers
);

supplier.post(
  "/",
  supplierController.validateSupplier('createSupplier'),
  supplierController.createSupplier
);

supplier.get(
  "/:id/edit",
  supplierController.editSupplier
);

supplier.post(
  "/update",
  supplierController.validateSupplier('updateSupplier'),
  supplierController.updateSupplier
);

supplier.get(
  "/:id/delete",
  supplierController.deleteSupplier
);

supplier.get(
  "/import",
  supplierController.selectSupplierImportFile
);

supplier.post(
  "/import",
  csv_upload.single('file'),
  supplierController.importSupplierFile
);

supplier.get(
  "/export",
  supplierController.selectSupplierExportFile
);

supplier.post(
  "/export",
  supplierController.exportSupplierFile
);

module.exports = supplier;
