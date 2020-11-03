var stockModel = require('../models/stock');
const { check, validationResult } = require('express-validator');

var validateStock = (method) => {
  switch(method){
    case 'createStock': {
      return [
        //check('name', "Business name doesn't exist").isAlpha()
      ]
    }
    case 'updateStock': {
      return [
        //check('name', "Business name doesn't exist").isAlpha()
      ]
    }
  }
}

const fs = require("fs");
const fastcsv = require("fast-csv");

var createStock = (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    //res.render("businesses", { page:"businesses", "errors": errors.array()});
    res.send("errors: "+errors.array());
  }

  try{
    stockModel.createStock(req.body, function(result){
      if(result === null){
          res.redirect("/stock#create-scroll-down-form");
      }
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status === false){
        res.redirect("/stock#create-scroll-down-form");
      }
      res.redirect("/stocks");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getStocks = (req, res) => {
  try{
    stockModel.getStocks(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].businessProductsStocks[0];
      res.render("stocks",{
        page:"stocks",
        "errors": null,
        stocks:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var updateStock = (req, res) => {
    try{
      stockModel.updateStock(req.body, function(err, result){
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
        result_data = json.content[0].stock[0];
        res.render("stock_edit", { page:"stocks", expense: result_data });
      });
    }catch(error){
      res.send("Malfunction: "+error);
    }
}

var editStock = (req, res) => {
  try{
    stockModel.getStock(req.params.id, function(err, result){
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
      result_data = json.content[0].stock[0];
      res.render("stock_edit", { page:"stocks", stock: result_data });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var deleteStock = (req, res) => {
  try{
    stockModel.deleteStock(req.params.id, function(err, result){
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
      res.redirect("/stocks");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var selectStockImportFile = (req, res) => {
    res.render("stock_import", { page: "stocks" });
}

var importStockFile = (req, res) => {
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
          stockModel.importStockFile(strCSVData, function(err, result){
            console.log("PHP: "+result);
            if(result == null || undefined){

            }
            res.redirect("/stock");
          });
        });
        stream.pipe(csvStream);
    }catch(err){
      res.send("Malfunction: "+error);
    }
}

var selectStockExportFile = (req, res) => {
    res.render("stock_export", { page: "stocks" });
}

var exportStockFile = (req, res) => {
  var fileFormat = req.body.fileFormat;
  var fileName = "my_stocks_"+Date.now()+".csv";
  //Date.now()
  var filePath = "./public/download/stock/csv/" + fileName;
  const ws = fs.createWriteStream(filePath);

  stockModel.getStocks(function(err, result){
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
    result_data = json.content[0].stocks[0];

    let stockListPromise = new Promise(function(resolve, reject){
      fastcsv
        .write(result_data, { headers: true })
        .on("finish", function() {
          console.log("Write to zapi_stocks.csv successfully!");
          res.download(filePath);
        })
        .pipe(ws);
        resolve();
    });
    stockListPromise.then(function(data){
      console.log(filePath);
    }).then(function(data){
      console.log("Download successful!");
    });
  });
}

module.exports = {
  validateStock,
  getStocks,
  createStock,
  updateStock,
  editStock,
  deleteStock,
  selectStockImportFile,
  importStockFile,
  selectStockExportFile,
  exportStockFile
}
