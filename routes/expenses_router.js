var express = require("express");
const multer = require('multer');

const csv_upload = multer({ dest: "uploads/csv/" });
var expenseController = require('../controllers/expense');

var expense = express.Router();

expense.get(
  "/",
  expenseController.getExpenses
);

expense.post(
  "/",
  expenseController.validateExpense('createExpense'),
  expenseController.createExpense
);

expense.get(
  "/:id/edit",
  expenseController.editExpense
);

expense.post(
  "/update",
  expenseController.validateExpense('updateExpense'),
  expenseController.updateExpense
);

expense.get(
  "/:id/delete",
  expenseController.deleteExpense
);

expense.get(
  "/import",
  expenseController.selectExpenseImportFile
);

expense.post(
  "/import",
  csv_upload.single('file'),
  expenseController.importExpenseFile
);

expense.get(
  "/export",
  expenseController.selectExpenseExportFile
);

expense.post(
  "/export",
  expenseController.exportExpenseFile
);

module.exports = expense;
