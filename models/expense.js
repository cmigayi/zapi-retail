const request = require("request");
const server = require("../databases/server");

var base_url = server.url;
var response_status = null;
var response_data = null;
var json = null;
var url_d = null;

var createExpense = (expense, callback) => {
  let options = {
    url: base_url+"/add_expense.php/zapi-v1/user/2",
    form: {
      //business_id: expense.business_id,
      business_id: 1,
      expense_item: expense.expense_item,
      expense_type: expense.expense_type,
      amount: expense.amount
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(body);
  });
}

var getExpenses = (callback) => {
  url_d = base_url+"/expenses.php/zapi-v1/user/2";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getNonRecurringExpenses = (callback) => {
  url_d = base_url+"/non_recurring_expenses.php/zapi-v1/user/2";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getRecurringExpenses = (callback) => {
  url_d = base_url+"/recurring_expenses.php/zapi-v1/user/2";
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var getExpense = (expenseId, callback) => {
  url_d = base_url+"/expense_info.php/zapi-v1/user/2/expense/"+expenseId;
  let options = {
    url: url_d,
    method: 'GET'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var updateExpense = (expense, callback) => {
  var expenseId = expense.expense_id;
  url_d = base_url+"/update_expense.php/zapi-v1/user/2/expense/"+expenseId;
  let options = {
    url: url_d,
    form: {
      expense_id: expenseId,
      business_id: expense.business_id,
      expense_item: expense.expense_item,
      expense_type: expense.expense_type,
      amount: expense.amount
    }
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var deleteExpense = (expenseId, callback) => {
  url_d = base_url+"/delete_expense.php/zapi-v1/user/2/expense/"+expenseId;
  let options = {
    url: url_d,
    method: 'DELETE'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var importExpenseFile = (strCSVData, callback) => {
  url_d = base_url+"/import_expense.php/zapi-v1/user/2/expense/"+strCSVData+"/format/array";
  let options = {
    url: url_d,
    method: 'POST'
  }
  request.post(options, function(err, response, body){
    console.log(body);
    return callback(err, body);
  });
}

var exportExpenseFile = (callback) => {
  url_d = base_url+"/expenses.php/zapi-v1/user/2/";
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
  createExpense,
  getExpenses,
  getExpense,
  getNonRecurringExpenses,
  getRecurringExpenses,
  updateExpense,
  deleteExpense,
  importExpenseFile,
  exportExpenseFile
}
