var businessModel = require('../models/business');
const { check, validationResult } = require('express-validator');

var validateBusiness = (method) => {
  switch(method){
    case 'createBusiness': {
      return [
        check('name', "Business name doesn't exist").isAlpha(),
        check('location', "Location doesn't exist").isAlpha(),
        check('country', "Country doesn't exist").isAlpha()
      ]
    }
    case 'updateBusiness': {
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

var createBusiness = (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    //res.render("businesses", { page:"businesses", "errors": errors.array()});
    res.send("errors: "+errors.array());
  }

  try{
    businessModel.createBusiness(req.body, function(result){
      if(result === null){
          res.redirect("/business#create-scroll-down-form");
      }
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status === false){
        res.redirect("/business#create-scroll-down-form");
      }
      res.redirect("/business");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getBusinesses = (req, res) => {
  try{
    businessModel.getBusinesses(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].businesses[0];
      res.render("businesses",{
        page:"businesses",
        "errors": null,
        businesses:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var updateBusiness = (req, res) => {
    try{
      businessModel.updateBusiness(req.body, function(err, result){
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
        res.render("business_edit", { page:"businesses", business: result_data });
      });
    }catch(error){
      res.send("Malfunction: "+error);
    }
}

var editBusiness = (req, res) => {
  try{
    businessModel.getBusiness(req.params.id, function(err, result){
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
      result_data = json.content[0].business[0];
      res.render("business_edit", { page:"businesses", business: result_data });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var deleteBusiness = (req, res) => {
  try{
    businessModel.deleteBusiness(req.params.id, function(err, result){
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
      res.redirect("/business");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var selectBusinessImportFile = (req, res) => {
    res.render("business_import", { page: "businesses" });
}

var importBusinessFile = (req, res) => {
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
          businessModel.importBusinessFile(strCSVData, function(err, result){
            console.log("PHP: "+result);
            if(result == null || undefined){

            }
            res.redirect("/business");
          });
        });
        stream.pipe(csvStream);
    }catch(err){
      res.send("Malfunction: "+error);
    }
}

module.exports = {
  validateBusiness,
  getBusinesses,
  createBusiness,
  updateBusiness,
  editBusiness,
  deleteBusiness,
  selectBusinessImportFile,
  importBusinessFile
}
