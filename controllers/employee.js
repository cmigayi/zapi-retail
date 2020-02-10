var employeeModel = require('../models/employee');
const { check, validationResult } = require('express-validator');

var validateEmployee = (method) => {
  switch(method){
    case 'createEmployee': {
      return [
        check('name', "Business name doesn't exist").isAlpha(),
        check('location', "Location doesn't exist").isAlpha(),
        check('country', "Country doesn't exist").isAlpha()
      ]
    }
    case 'updateEmployee': {
      return [
        check('name', "Business name doesn't exist").isAlpha(),
        check('location', "Location doesn't exist").isAlpha(),
        check('country', "Country doesn't exist").isAlpha()
      ]
    }
  }
}

const fs = require("fs");
const fastcsv = require("fast-csv");

var createEmployee = (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    //res.render("businesses", { page:"businesses", "errors": errors.array()});
    res.send("errors: "+errors.array());
  }

  try{
    employeeModel.createEmployee(req.body, function(result){
      if(result === null){
          res.redirect("/employee#create-scroll-down-form");
      }
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status === false){
        res.redirect("/employee#create-scroll-down-form");
      }
      res.redirect("/employee");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getEmployees = (req, res) => {
  try{
    employeeModel.getEmployees(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].employees[0];
      res.render("employees",{
        page:"employees",
        "errors": null,
        employees:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var updateEmployee = (req, res) => {
    try{
      employeeModel.updateEmployee(req.body, function(err, result){
        if(result == null){
          console.log("The server did not respond");
          res.send("error: "+err);
        }
        console.log(res.statusCode);
        if(res.statusCode != 200){
          console.log(err);
        }
        console.log(result);
        json = JSON.parse(result);
        result_status = json.content[0].info[0].status;
        result_data = json.content[0].business[0];
        res.render("employee_edit", { page:"employees", employee: result_data });
      });
    }catch(error){
      res.send("Malfunction: "+error);
    }
}

var editEmployee = (req, res) => {
  try{
    employeeModel.getEmployee(req.params.id, function(err, result){
      if(result == null){
        console.log("The server did not respond");
        res.redirect("../../error");
      }
      console.log(res.statusCode);
      if(res.statusCode != 200){
        console.log(err);
      }
      console.log(result);
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      result_data = json.content[0].employee[0];
      res.render("employee_edit", { page:"employees", employee: result_data });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var deleteEmployee = (req, res) => {
  try{
    employeeModel.deleteEmployee(req.params.id, function(err, result){
      if(result == null){
        console.log("The server did not respond");
        res.redirect("../../error");
      }
      console.log(res.statusCode);
      if(res.statusCode != 200){
        console.log(err);
      }
      console.log(result);
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status == false){
        console.log("Delete process failed");
      }
      res.redirect("/employee");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var selectEmployeeImportFile = (req, res) => {
    res.render("employee_import", { page: "employees" });
}

var importEmployeeFile = (req, res) => {
    try{
      var csv_file = req.file;
      console.log(csv_file);
      let stream = fs.createReadStream(csv_file.path);
      let csvData = [];
      let csvStream = fastcsv
        .parse()
        .on("data", function(data){
          csvData.push(data);
        })
        .on("end", function(){
          // Remove the first line: header
          csvData.shift();

          //console.log(csvData);
          let strCSVData = csvData.join('|');
          employeeModel.importEmployeeFile(strCSVData, function(err, result){
            console.log("PHP: "+result);
            if(result == null || undefined){

            }
            res.redirect("/employee");
          });
        });
        stream.pipe(csvStream);
    }catch(err){
      res.send("Malfunction: "+error);
    }
}

var selectEmployeeExportFile = (req, res) => {
    res.render("employee_export", { page: "employees" });
}

var exportEmployeeFile = (req, res) => {
  var fileFormat = req.body.fileFormat;
  var fileName = "my_employees_"+Date.now()+".csv";
  //Date.now()
  var filePath = "./public/download/business/csv/" + fileName;
  const ws = fs.createWriteStream(filePath);

  employeeModel.getEmployees(function(err, result){
    if(result == null){
      console.log("The server did not respond");
      res.redirect("../../error");
    }
    console.log(res.statusCode);
    if(res.statusCode != 200){
      console.log(err);
    }
    console.log(result);
    json = JSON.parse(result);
    result_status = json.content[0].info[0].status;
    result_data = json.content[0].employees[0];

    let employeeListPromise = new Promise(function(resolve, reject){
      fastcsv
        .write(result_data, { headers: true })
        .on("finish", function() {
          console.log("Write to zapi_employees.csv successfully!");
          res.download(filePath);
        })
        .pipe(ws);
        resolve();
    });
    employeeListPromise.then(function(data){
      console.log(filePath);
    }).then(function(data){
      console.log("Download successful!");
    });
  });
}

module.exports = {
  validateEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  editEmployee,
  deleteEmployee,
  selectEmployeeImportFile,
  importEmployeeFile,
  selectEmployeeExportFile,
  exportEmployeeFile
}
