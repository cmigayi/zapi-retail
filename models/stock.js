const request = require("request");
const server = require("../databases/server");

var base_url = server.url;
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

var createStock = (stock, callback) => {
  let options = {
    url: base_url+"/add_stock.php/zapi-v1/user/2",
    form: {
      product_id: stock.product_id,
      business_id: stock.business_id,
      quantity: stock.quantity
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(body);
  });
}

var getStocks = (callback) => {
  url_d = base_url+"/business_products_stocks.php/zapi-v1/user/2/business/3";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getStock = (stockId, callback) => {
  url_d = base_url+"/stock_info.php/zapi-v1/user/2/stock/"+stockId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var updateStock = (stock, callback) => {
  var stockId = stock.stock_id;
  url_d = base_url+"/update_stock.php/zapi-v1/user/2/stock/"+stockId;
  let options = {
    url: url_d,
    form: {
      stock_id: stockId,
      product_id: stock.product_id,
      business_id: stock.stock_id,
      qunatity: stock.quantity
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var deleteStock = (stockId, callback) => {
  url_d = base_url+"/delete_stock.php/zapi-v1/user/2/stock/"+stockId;
  let options = {
    url: url_d,
    method: 'DELETE'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var importStockFile = (strCSVData, callback) => {
  url_d = base_url+"/import_stock.php/zapi-v1/user/2/stock/"+strCSVData+"/format/array";
  let options = {
    url: url_d,
    method: 'POST'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var exportStockFile = (callback) => {
  url_d = base_url+"/stocks.php/zapi-v1/user/2/";
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
  createStock,
  getStocks,
  getStock,
  updateStock,
  deleteStock,
  importStockFile,
  exportStockFile
}
