const request = require("request");

var base_url = "http://localhost:8000";
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

var logoutUser = (callback) => {
  let options = {
    url: base_url+"/user_logout.php/zapi-v1"
  }
  request.get(options, function(err, response, body){
    console.log("test"+body);
    return callback(body);
  });
}

var getUser = (callback) => {
  let options = {
    url: base_url+"/user_info.php/zapi-v1/user/"+user.user_id,
  }
  request.get(options, function(err, response, body){
    console.log("test"+body);
    return callback(body);
  });
}

var updateUser = (user, callback) => {
  let options = {
    url: base_url+"/update_user.php/zapi-v1/user/"+user.user_id,
    form: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone
    }
  }
  request.post(options, function(err, response, body){
    if(!err)
      console.log("test"+body);
      return callback(body);
    console.log("Error: "+err);
  });
}

module.exports = {
  createUser,
  authUser,
  logoutUser,
  getUser,
  updateUser
};
