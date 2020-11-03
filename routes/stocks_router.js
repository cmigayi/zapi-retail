var express = require("express");
const multer = require('multer');

const csv_upload = multer({ dest: "uploads/csv/" });
var stockController = require('../controllers/stock');

var stock = express.Router();

stock.get(
  "/",
  stockController.getStocks
);

stock.post(
  "/",
  stockController.validateStock('createStock'),
  stockController.createStock
);

stock.get(
  "/:id/edit",
  stockController.editStock
);

stock.post(
  "/update",
  stockController.validateStock('updateStock'),
  stockController.updateStock
);

stock.get(
  "/:id/delete",
  stockController.deleteStock
);

stock.get(
  "/import",
  stockController.selectStockImportFile
);

stock.post(
  "/import",
  csv_upload.single('file'),
  stockController.importStockFile
);

stock.get(
  "/export",
  stockController.selectStockExportFile
);

stock.post(
  "/export",
  stockController.exportStockFile
);

module.exports = stock;
