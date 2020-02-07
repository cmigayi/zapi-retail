const request = require("request");
const server = require("../databases/server");

var base_url = server.url;
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

var createBusiness = (business, callback) => {
  let options = {
    url: base_url+"/add_business.php/zapi-v1/user/2",
    form: {
      name: business.name,
      location: business.location,
      country: business.country
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(body);
  });
}

var getBusinesses = (callback) => {
  url_d = base_url+"/businesses.php/zapi-v1/user/2";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getBusiness = (businessId, callback) => {
  url_d = base_url+"/business_info.php/zapi-v1/user/2/business/"+businessId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var updateBusiness = (business, callback) => {
  var businessId = business.business_id;
  url_d = base_url+"/update_business.php/zapi-v1/user/2/business/"+businessId;
  let options = {
    url: url_d,
    form: {
      business_id: businessId,
      name: business.name,
      location: business.location,
      country: business.country
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var deleteBusiness = (businessId, callback) => {
  url_d = base_url+"/delete_business.php/zapi-v1/user/2/business/"+businessId;
  let options = {
    url: url_d,
    method: 'DELETE'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var importBusinessFile = (strCSVData, callback) => {
  url_d = base_url+"/import_business.php/zapi-v1/user/2/business/"+strCSVData+"/format/array";
  let options = {
    url: url_d,
    method: 'POST'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

module.exports = {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  importBusinessFile
}
