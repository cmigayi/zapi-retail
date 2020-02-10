const request = require("request");
const server = require("../databases/server");

var base_url = server.url;
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

var createEmployee = (business, callback) => {
  let options = {
    url: base_url+"/add_employee.php/zapi-v1/user/2",
    form: {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      national_id: req.body.national_id
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(body);
  });
}

var getEmployees = (callback) => {
  url_d = base_url+"/employees.php/zapi-v1/user/2";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getEmployee = (employeeId, callback) => {
  url_d = base_url+"/employee_info.php/zapi-v1/user/2/employee/"+employeeId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var updateEmployee = (employee, callback) => {
  var employeeId = employee.employee_id;
  url_d = base_url+"/update_employee.php/zapi-v1/user/2/employee/"+employeeId;
  let options = {
    url: url_d,
    form: {
      employee_id: employeeId,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      national_id: req.body.national_id
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var deleteEmployee = (employeeId, callback) => {
  url_d = base_url+"/delete_employee.php/zapi-v1/user/2/employee/"+employeeId;
  let options = {
    url: url_d,
    method: 'DELETE'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var importEmployeeFile = (strCSVData, callback) => {
  url_d = base_url+"/import_employee.php/zapi-v1/user/2/employee/"+strCSVData+"/format/array";
  let options = {
    url: url_d,
    method: 'POST'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var exportEmployeeFile = (callback) => {
  url_d = base_url+"/employees.php/zapi-v1/user/2/";
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
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployeeFile,
  exportEmployeeFile
}
