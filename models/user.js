const request = require("request");

var base_url = "http://192.168.100.88/zapi/web";
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

var createUser = (user, callback)=> {
  let options = {
    url: base_url+"/add_user.php/zapi-v1",
    form: {
      fname: user.firstname,
      lname: user.lastname,
      email: user.email,
      phone: user.phone
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    var json = JSON.parse(body);
    return callback(json.content[0].info[0].status);
  });
}

var authUser = (user, callback)=> {
  let options = {
    url: base_url+"/user_login.php/zapi-v1",
    form: {
      username: user.username,
      password: user.password
    }
  }
  request.post(options, function(err, response, body){
    console.log("test:"+body);
    return callback(body);
  });
}

module.exports = {createUser, authUser};
