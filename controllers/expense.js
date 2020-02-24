var expenseModel = require('../models/expense');
const { check, validationResult } = require('express-validator');

var validateExpense = (method) => {
  switch(method){
    case 'createExpense': {
      return [
        //check('name', "Business name doesn't exist").isAlpha()
      ]
    }
    case 'updateExpense': {
      return [
        //check('name', "Business name doesn't exist").isAlpha()
      ]
    }
  }
}

const fs = require("fs");
const fastcsv = require("fast-csv");

var createExpense = (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    //res.render("businesses", { page:"businesses", "errors": errors.array()});
    res.send("errors: "+errors.array());
  }

  try{
    expenseModel.createExpense(req.body, function(result){
      if(result === null){
          res.redirect("/expense#create-scroll-down-form");
      }
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status === false){
        res.redirect("/expense#create-scroll-down-form");
      }
      res.redirect("/expenses");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getExpenses = (req, res) => {
  try{
    expenseModel.getExpenses(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].expenses[0];
      res.render("expenses",{
        page:"expenses",
        "errors": null,
        expenses:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getNonRecurringExpenses = (req, res) => {
  try{
    expenseModel.getNonRecurringExpenses(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].expenses[0];
      res.render("expenses",{
        page:"expenses",
        "errors": null,
        expenses:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var getRecurringExpenses = (req, res) => {
  try{
    expenseModel.getRecurringExpenses(function(err, result){
      if(result == null){
        res.send("The server did not respond "+err);
      }
      if(res.statusCode != 200){
        res.send(res.statusCode+': '+err);
      }
      json = JSON.parse(result);
      result_data = json.content[0].expenses[0];
      res.render("expenses",{
        page:"expenses",
        "errors": null,
        expenses:result_data
      });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var updateExpense = (req, res) => {
    try{
      expenseModel.updateExpense(req.body, function(err, result){
        if(result == null){
          console.log("The server did not respond");
          res.send("error: "+err);
        }
        console.log(res.statusCode);
        if(res.statusCode != 200){
          console.log(err);
        }
        console.log(result);
        json = JSON.parse(result);
        result_status = json.content[0].info[0].status;
        result_data = json.content[0].expense[0];
        res.render("expense_edit", { page:"expenses", expense: result_data });
      });
    }catch(error){
      res.send("Malfunction: "+error);
    }
}

var editExpense = (req, res) => {
  try{
    expenseModel.getExpense(req.params.id, function(err, result){
      if(result == null){
        console.log("The server did not respond");
        res.redirect("../../error");
      }
      console.log(res.statusCode);
      if(res.statusCode != 200){
        console.log(err);
      }
      console.log(result);
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      result_data = json.content[0].expense[0];
      res.render("expense_edit", { page:"expenses", expense: result_data });
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var deleteExpense = (req, res) => {
  try{
    expenseModel.deleteExpense(req.params.id, function(err, result){
      if(result == null){
        console.log("The server did not respond");
        res.redirect("../../error");
      }
      console.log(res.statusCode);
      if(res.statusCode != 200){
        console.log(err);
      }
      console.log(result);
      json = JSON.parse(result);
      result_status = json.content[0].info[0].status;
      if(result_status == false){
        console.log("Delete process failed");
      }
      res.redirect("/expenses");
    });
  }catch(error){
    res.send("Malfunction: "+error);
  }
}

var selectExpenseImportFile = (req, res) => {
    res.render("expense_import", { page: "expenses" });
}

var importExpenseFile = (req, res) => {
    try{
      var csv_file = req.file;
      console.log(csv_file);
      let stream = fs.createReadStream(csv_file.path);
      let csvData = [];
      let csvStream = fastcsv
        .parse()
        .on("data", function(data){
          csvData.push(data);
        })
        .on("end", function(){
          // Remove the first line: header
          csvData.shift();

          //console.log(csvData);
          let strCSVData = csvData.join('|');
          expenseModel.importExpenseFile(strCSVData, function(err, result){
            console.log("PHP: "+result);
            if(result == null || undefined){

            }
            res.redirect("/expense");
          });
        });
        stream.pipe(csvStream);
    }catch(err){
      res.send("Malfunction: "+error);
    }
}

var selectExpenseExportFile = (req, res) => {
    res.render("expense_export", { page: "expenses" });
}

var exportExpenseFile = (req, res) => {
  var fileFormat = req.body.fileFormat;
  var fileName = "my_expenses_"+Date.now()+".csv";
  //Date.now()
  var filePath = "./public/download/expense/csv/" + fileName;
  const ws = fs.createWriteStream(filePath);

  expenseModel.getExpenses(function(err, result){
    if(result == null){
      console.log("The server did not respond");
      res.redirect("../../error");
    }
    console.log(res.statusCode);
    if(res.statusCode != 200){
      console.log(err);
    }
    console.log(result);
    json = JSON.parse(result);
    result_status = json.content[0].info[0].status;
    result_data = json.content[0].expenses[0];

    let expenseListPromise = new Promise(function(resolve, reject){
      fastcsv
        .write(result_data, { headers: true })
        .on("finish", function() {
          console.log("Write to zapi_expenses.csv successfully!");
          res.download(filePath);
        })
        .pipe(ws);
        resolve();
    });
    expenseListPromise.then(function(data){
      console.log(filePath);
    }).then(function(data){
      console.log("Download successful!");
    });
  });
}

module.exports = {
  validateExpense,
  getExpenses,
  getNonRecurringExpenses,
  getRecurringExpenses,
  createExpense,
  updateExpense,
  editExpense,
  deleteExpense,
  selectExpenseImportFile,
  importExpenseFile,
  selectExpenseExportFile,
  exportExpenseFile
}
