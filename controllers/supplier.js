var supplierModel = require('../models/supplier');
const { check, validationResult } = require('express-validator');

var validateSupplier = (method) => {
  switch(method){
    case 'createSupplier': {
      return [
        check('name', "name doesn't exist").isAlpha()
      ]
    }
    case 'updateSupplier': {
      return [
        check('name', "name doesn't exist").isAlpha()
      ]
    }
  }
}

const fs = require("fs");
const fastcsv = require("fast-csv");

var createSupplier = (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    //res.render("businesses", { page:"businesses", "errors": errors.array()});
    res.send("errors: "+errors.array());
  }

  try{
    supplierModel.createSupplier(req.body, function(result){
      if(result === null){
          res.redirect("/supplier#create-scroll-down-form");
      }
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status === false){
        res.redirect("/supplier#create-scroll-down-form");
      }
      res.redirect("/supplier");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getSuppliers = (req, res) => {
  try{
    supplierModel.getSuppliers(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].suppliers[0];
      res.render("suppliers",{
        page:"suppliers",
        "errors": null,
        suppliers:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var updateSupplier = (req, res) => {
    try{
      supplierModel.updateSupplier(req.body, function(err, result){
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
        result_data = json.content[0].supplier[0];
        res.render("supplier_edit", { page:"suppliers", supplier: result_data });
      });
    }catch(error){
      res.send("Malfunction: "+error);
    }
}

var editSupplier = (req, res) => {
  try{
    supplierModel.getSupplier(req.params.id, function(err, result){
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
      result_data = json.content[0].supplier[0];
      res.render("supplier_edit", { page:"suppliers", supplier: result_data });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var deleteSupplier = (req, res) => {
  try{
    supplierModel.deleteSupplier(req.params.id, function(err, result){
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
      res.redirect("/supplier");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var selectSupplierImportFile = (req, res) => {
    res.render("supplier_import", { page: "suppliers" });
}

var importSupplierFile = (req, res) => {
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
          supplierModel.importSupplierFile(strCSVData, function(err, result){
            console.log("PHP: "+result);
            if(result == null || undefined){

            }
            res.redirect("/supplier");
          });
        });
        stream.pipe(csvStream);
    }catch(err){
      res.send("Malfunction: "+error);
    }
}

var selectSupplierExportFile = (req, res) => {
    res.render("supplier_export", { page: "suppliers" });
}

var exportSupplierFile = (req, res) => {
  var fileFormat = req.body.fileFormat;
  var fileName = "my_suppliers_"+Date.now()+".csv";
  //Date.now()
  var filePath = "./public/download/supplier/csv/" + fileName;
  const ws = fs.createWriteStream(filePath);

  supplierModel.getSuppliers(function(err, result){
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

    let supplierListPromise = new Promise(function(resolve, reject){
      fastcsv
        .write(result_data, { headers: true })
        .on("finish", function() {
          console.log("Write to zapi_suppliers.csv successfully!");
          res.download(filePath);
        })
        .pipe(ws);
        resolve();
    });
    supplierListPromise.then(function(data){
      console.log(filePath);
    }).then(function(data){
      console.log("Download successful!");
    });
  });
}

module.exports = {
  validateSupplier,
  getSuppliers,
  createSupplier,
  updateSupplier,
  editSupplier,
  deleteSupplier,
  selectSupplierExportFile,
  importSupplierFile,
  selectSupplierImportFile,
  exportSupplierFile
}
