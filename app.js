var express = require("express");
var path = require("path");
var ejs = require("ejs");

var app = express();

app.set("view engine","ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static('./public'));

app.get("", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/dashboard", function(req, res){
  res.render("dashboard",{ page:"dashboard" });
});

app.get("/businesses", function(req, res){
  res.render("businesses",{ page:"businesses" });
});

app.get("/employees", function(req, res){
  res.render("employees", { page:"employees" });
});

app.get("/suppliers", function(req, res){
  res.render("suppliers", { page:"suppliers" });
});

app.get("/credits", function(req, res){
  res.render("credits", { page:"credits" });
});

app.get("/expenses", function(req, res){
  res.render("expenses", { page:"expenses" });
});

app.get("/stocks", function(req, res){
  res.render("stocks", { page:"stocks" });
});

app.get("/sales", function(req, res){
  res.render("sales", { page:"sales" });
});

app.listen(3000);
