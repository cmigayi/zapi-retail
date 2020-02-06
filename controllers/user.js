var userModel = require('../models/user');
const { check, validationResult } = require('express-validator');

var validateUser = (method) => {
  switch(method){
    case 'createUser': {
      return [
        check('firstname', "Firstname doesn't exist").isAlpha(),
        check('lastname', "Lastname doesn't exist").isAlpha(),
        check('email', "Email is invalid").exists().isEmail(),
        check('phone', "Phone is invalid").optional().isInt()
      ]
    }
    case 'loginUser': {
      return [
        check('username', "Username is invalid").isLength({min:4}),
        check('password', "Password is not correct").isLength({min:6})
      ]
    }
    case 'updateUser': {
      return [
        check('fname', "Firstname doesn't exist").isAlpha(),
        check('lname', "Lastname doesn't exist").isAlpha(),
        check('email', "Email is invalid").exists().isEmail(),
        check('phone', "Phone is invalid").optional().isInt()
      ]
    }
  }
}

var createUser = (req, res) => {
  try{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("signup", {"package": req.body.package, "errors": errors.array()});
      return;
    }
    //res.send("Cool!");
    userModel.createUser(req.body, function(status){
      console.log(status);
      if(status === true){
        res.render("login");
      }else{
        res.render("signup", {"package": req.body.package});
      }
    });
  }catch(error){
    res.send("There was an error"+error);
  }
}

var loginUser = (req, res) => {

    let errors = validationResult(req);
    let sys_errors = {};

  try{
    if(!errors.isEmpty()){
      console.log(errors.array());
      res.render("login", {"errors": errors.array()});
      return;
    }
    userModel.authUser(req.body, function(result){
      if(result === undefined){
        console.log("Sorry, the data server is not responding. Contact support.");
        sys_errors = [{"msg": "Sorry, the data server is not responding. Contact support."}];
        console.log(sys_errors);
        res.render("login", {"errors": sys_errors});
        return;
      }

      let json = JSON.parse(result);

      if(json.content[0].info[0].status == false){
        console.log("You entered the wrong username / password.");
        sys_errors = [{"msg": "You entered the wrong username or password."}];
        console.log(sys_errors);
        res.render("login", {"errors": sys_errors });
        return;
      }
      //console.log();
      req.session.key = json.content[0].user[0];
      console.log(json.content[0].user[0]);
      if(req.session.key){
        res.render("dashboard", { page:"dashboard" });
      }
    });
  }catch(error){
    res.send("There was an error"+error);
  }
}

var logoutUser = (req, res) => {
  try{
    userModel.logoutUser(function(result){
      if(result === undefined){
        console.log("Sorry, the data server is not responding. Contact support.");
        sys_errors = [{"msg": "Sorry, the data server is not responding. Contact support."}];
        console.log(sys_errors);
        res.render("login", {"errors": sys_errors});
        return;
      }

      let json = JSON.parse(result);

      if(json.content[0].info[0].status == false){
        console.log("Logout failed.");
        return;
      }
      res.render("login", { page:"login" });
    });
  }catch(error){
    res.send("There was an error "+error);
  }
}

var getUser = (req, res) => {
  try{
    userModel.getUser(function(result){
      if(result === undefined){
        console.log("Sorry, the data server is not responding. Contact support.");
        sys_errors = [{"msg": "Sorry, the data server is not responding. Contact support."}];
        console.log(sys_errors);
        //res.render("login", {"errors": sys_errors});
        return;
      }

      let json = JSON.parse(result);
      let json_status = json.content[0].info[0].status;
      let json_content = json.content[0].user[0];

      if(json_status == false || json_content == null){
        console.log("Retrieving user info failed.");
        return;
      }
      console.log("User: "+json_content);
      res.render("user_profile", {page:"user_profile", "errors": null, user: json_content});
    });
  }catch(error){
    res.send("There was an error "+error);
  }
}

var updateUser = (req, res) => {
  try{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log("errors: "+errors);
      return;
    }
    userModel.updateUser(req.body, function(result){
      if(result === undefined){
        console.log("Sorry, the data server is not responding. Contact support.");
        sys_errors = [{"msg": "Sorry, the data server is not responding. Contact support."}];
        console.log(sys_errors);
        //res.render("login", {"errors": sys_errors});
        return;
      }

      let json = JSON.parse(result);
      let json_status = json.content[0].info[0].status;
      let json_content = json.content[0].user[0];

      if(json_status == false || json_content == null){
        console.log("Retrieving user info failed.");
        return;
      }
      console.log("User: "+json_content);
      res.render("user_profile", {page:"user_profile", "errors": null, user: json_content});
    });
  }catch(error){
    res.send("There was an error "+error);
  }
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  validateUser,
  getUser,
  updateUser
}
