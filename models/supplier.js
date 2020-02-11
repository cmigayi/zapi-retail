const request = require("request");
const server = require("../databases/server");

var base_url = server.url;
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

var createSupplier = (business, callback) => {
  let options = {
    url: base_url+"/add_supplier.php/zapi-v1/user/2",
    form: {
      supplier_name: req.body.supplier_name,
      email: req.body.email,
      phone: req.body.phone
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(body);
  });
}

var getSuppliers = (callback) => {
  url_d = base_url+"/suppliers.php/zapi-v1/user/2/business/1";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getSupplier = (supplierId, callback) => {
  url_d = base_url+"/supplier_info.php/zapi-v1/user/2/supplier/"+supplierId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var updateSupplier = (supplier, callback) => {
  var supplierId = supplier.supplier_id;
  url_d = base_url+"/update_supplier.php/zapi-v1/user/2/supplier/"+supplierId;
  let options = {
    url: url_d,
    form: {
      supplier_name: supplier.supplier_name,
      email: supplier.email,
      phone: supplier.phone,
      supplier_id: supplierId
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var deleteSupplier = (supplierId, callback) => {
  url_d = base_url+"/delete_supplier.php/zapi-v1/user/2/supplier/"+supplierId;
  let options = {
    url: url_d,
    method: 'DELETE'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var importSupplierFile = (strCSVData, callback) => {
  url_d = base_url+"/import_supplier.php/zapi-v1/user/2/supplier/"+strCSVData+"/format/array";
  let options = {
    url: url_d,
    method: 'POST'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var exportSupplierFile = (callback) => {
  url_d = base_url+"/suppliers.php/zapi-v1/user/2/";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  importSupplierFile,
  exportSupplierFile
}
