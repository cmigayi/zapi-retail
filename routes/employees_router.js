var express = require("express");
const multer = require('multer');

const csv_upload = multer({ dest: "uploads/csv/" });
var employeeController = require('../controllers/employee');

var employee = express.Router();

employee.get(
  "/",
  employeeController.getEmployees
);

employee.post(
  "/",
  employeeController.validateEmployee('createEmployee'),
  employeeController.createEmployee
);

employee.get(
  "/:id/edit",
  employeeController.editEmployee
);

employee.post(
  "/update",
  employeeController.validateEmployee('updateEmployee'),
  employeeController.updateEmployee
);

employee.get(
  "/:id/delete",
  employeeController.deleteEmployee
);

employee.get(
  "/import",
  employeeController.selectEmployeeImportFile
);

employee.post(
  "/import",
  csv_upload.single('file'),
  employeeController.importEmployeeFile
);

employee.get(
  "/export",
  employeeController.selectEmployeeExportFile
);

employee.post(
  "/export",
  employeeController.exportEmployeeFile
);

module.exports = employee;
