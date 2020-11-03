var express = require("express");
var path = require("path");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var redis = require('redis');
// var redisStore = require('connect-redis')(session);
// var client = redis.createClient();

var businessRouter = require("./routes/business_router");
var employeeRouter = require("./routes/employees_router");
var supplierRouter = require("./routes/suppliers_router");
var expenseRouter = require("./routes/expenses_router");
var stockRouter = require("./routes/stocks_router");
var userProfileRouter = require("./routes/user_profile_router");
var settingRouter = require("./routes/setting_router");
var signupRouter = require("./routes/signup_router");
var loginRouter = require("./routes/login_router");
var logoutRouter = require("./routes/logout_router");

var app = express();

app.use(cookieParser());
// app.use(session({
//   secret: "shhhh",
//   // create redis redisStore
//   store: new redisStore({host: "localhost", port: 6379, client: client, ttl: 260}),
//   saveUninitialized: false,
//   resave: false
// }));

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
app.use("/expenses", expenseRouter);
app.use("/stocks", stockRouter);
app.use("/user_profile", userProfileRouter);
app.use("/settings", settingRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.get("/dashboard", function(req, res){
  res.render("dashboard",{ page:"dashboard" });
});

app.get("/credits", function(req, res){
  res.render("credits", { page:"credits" });
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
