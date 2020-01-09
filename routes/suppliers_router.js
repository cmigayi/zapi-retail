var express = require("express");
const request = require("request");
const fs = require("fs");
const fastcsv = require("fast-csv");
const multer = require('multer');
const csv_upload = multer({ dest: "uploads/csv/" });

var supplier = express.Router();

var base_url = "http://192.168.100.88/zapi/web";
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

supplier.get("/", function(req, res){
  var businessId = 1;
  url_d = base_url+"/suppliers.php/zapi-v1/user/2/business/"+businessId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(response.statusCode);
    if(response.statusCode != 200){
      console.log(err);
    }
    json = JSON.parse(body);
    response_status = json.content[0].info[0].status;
    response_data = json.content[0].suppliers[0];
    console.log(response_data);
    res.render("suppliers",{ page:"suppliers", suppliers:response_data });
  });
});

supplier.post("/create", function(req, res){
  var businessId = 1;
  let options = {
    url: base_url+"/add_supplier.php/zapi-v1/user/2/business/"+businessId,
    form: {
      supplier_name: req.body.supplier_name,
      email: req.body.email,
      phone: req.body.phone,
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    json = JSON.parse(body);
    response_status = json.content[0].info[0].status;

    if(response_status != true){
      res.redirect("/suppliers#create-scroll-down-form");
    }
    res.redirect("/suppliers");
  });
});

supplier.get("/edit/:id", function(req, res){
  var supplierId = req.params.id;
  url_d = base_url+"/supplier_info.php/zapi-v1/user/2/supplier/"+supplierId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    if(response == null){
      console.log("The server did not respond");
      res.redirect("../../error");
    }
    console.log(response.statusCode);
    if(response.statusCode != 200){
      console.log(err);
    }
    console.log(body);
    json = JSON.parse(body);
    response_status = json.content[0].info[0].status;
    response_data = json.content[0].supplier[0];
    res.render("supplier_edit", { page:"suppliers", supplier: response_data });
  });
});

supplier.post("/edit", function(req, res){
  var supplierId = req.body.supplier_id;
  url_d = base_url+"/update_supplier.php/zapi-v1/user/2/supplier/"+supplierId;
  let options = {
    url: url_d,
    form: {
      supplier_id: supplierId,
      supplier_name: req.body.supplier_name,
      email: req.body.email,
      phone: req.body.phone,
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    json = JSON.parse(body);
    response_status = json.content[0].info[0].status;
    console.log(supplierId);
    if(response_status != true){

    }
    res.redirect("edit/"+supplierId);
  });
});

supplier.get("/delete/:id", function(req, res){
  var supplierId = req.params.id;
  url_d = base_url+"/delete_supplier.php/zapi-v1/user/2/supplier/"+supplierId;
  let options = {
    url: url_d,
    method: 'DELETE'
  }
  request.post(options, function(err, response, body){
    if(response == null){
      console.log("The server did not respond");
      res.redirect("../../error");
    }
    console.log(response.statusCode);
    if(response.statusCode != 200){
      console.log(err);
    }
    console.log(body);
    json = JSON.parse(body);
    response_status = json.content[0].info[0].status;
    if(response_status == false){
      console.log("Delete process failed");
    }
    res.redirect("/suppliers");
  });
});
//
// business.get("/import", function(req, res){
//   res.render("business_import", { page: "businesses" });
// });
//
// business.post("/import", csv_upload.single('file'), function(req, res){
//   var csv_file = req.file;
//   console.log(csv_file);
//   let stream = fs.createReadStream(csv_file.path);
//   let csvData = [];
//   let csvStream = fastcsv
//     .parse()
//     .on("data", function(data){
//       csvData.push(data);
//     })
//     .on("end", function(){
//       // Remove the first line: header
//       csvData.shift();
//
//       //console.log(csvData);
//
//       let strCSVData = csvData.join('|');
//
//       url_d = base_url+"/import_business.php/zapi-v1/user/2/business/"+strCSVData+"/format/array";
//       let options = {
//         url: url_d,
//         method: 'POST'
//       }
//       request.post(options, function(err, response, body){
//         console.log("PHP: "+body);
//         if(body == null || undefined){
//
//         }
//         res.redirect("/business");
//       });
//     });
//     stream.pipe(csvStream);
// });
//
// business.get("/export", function(req, res){
//   res.render("business_export", { page: "businesses" });
// });
//
// business.post("/export", function(req, res){
//   var fileFormat = req.body.fileFormat;
//   var fileName = "my_businesses_"+Date.now()+".csv";
//   //Date.now()
//   var filePath = "./public/download/business/csv/" + fileName;
//   const ws = fs.createWriteStream(filePath);
//
//   url_d = base_url+"/businesses.php/zapi-v1/user/2/";
//   let options = {
//     url: url_d,
//     method: 'GET'
//   }
//   request.post(options, function(err, response, body){
//     if(response == null){
//       console.log("The server did not respond");
//       res.redirect("../../error");
//     }
//     console.log(response.statusCode);
//     if(response.statusCode != 200){
//       console.log(err);
//     }
//     console.log(body);
//     json = JSON.parse(body);
//     response_status = json.content[0].info[0].status;
//     response_data = json.content[0].businesses[0];
//
//     let businessListPromise = new Promise(function(resolve, reject){
//       fastcsv
//         .write(response_data, { headers: true })
//         .on("finish", function() {
//           console.log("Write to zapi_businesses.csv successfully!");
//           res.download(filePath);
//         })
//         .pipe(ws);
//         resolve();
//     });
//     businessListPromise.then(function(data){
//       console.log(filePath);
//     }).then(function(data){
//       console.log("Download successful!");
//     });
//   });
// });

module.exports = supplier;
