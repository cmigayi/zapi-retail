var express = require("express");
var path = require("path");
var ejs = require("ejs");
var bodyParser = require("body-parser");

var businessRouter = require("./routes/business_router");
var employeeRouter = require("./routes/employees_router");
var supplierRouter = require("./routes/suppliers_router");
var signupRouter = require("./routes/signup_router");
var loginRouter = require("./routes/login_router");

var app = express();

app.set("view engine","ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("", function(req, res){
  res.render("index");
});

app.use("/business", businessRouter);
app.use("/employees", employeeRouter);
app.use("/suppliers", supplierRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.get("/dashboard", function(req, res){
  res.render("dashboard",{ page:"dashboard" });
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

app.get("/services", function(req, res){
  res.render("services", { page:"services" });
});

app.get("/products", function(req, res){
  res.render("products", { page:"products" });
});

app.get("/customers", function(req, res){
  res.render("customers", { page:"customers" });
});

app.listen(3000);
