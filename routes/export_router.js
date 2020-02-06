// business.get("/export", function(req, res){
//   res.render("business_export", { page: "businesses" });
// });
//
// business.post("/export", function(req, res){
//   var fileFormat = req.body.fileFormat;
//   var fileName = "my_businesses_"+Date.now()+".csv";
//   //Date.now()
//   var filePath = "./public/download/business/csv/" + fileName;
//   const ws = fs.createWriteStream(filePath);
//
//   url_d = base_url+"/businesses.php/zapi-v1/user/2/";
//   let options = {
//     url: url_d,
//     method: 'GET'
//   }
//   request.post(options, function(err, response, body){
//     if(response == null){
//       console.log("The server did not respond");
//       res.redirect("../../error");
//     }
//     console.log(response.statusCode);
//     if(response.statusCode != 200){
//       console.log(err);
//     }
//     console.log(body);
//     json = JSON.parse(body);
//     response_status = json.content[0].info[0].status;
//     response_data = json.content[0].businesses[0];
//
//     let businessListPromise = new Promise(function(resolve, reject){
//       fastcsv
//         .write(response_data, { headers: true })
//         .on("finish", function() {
//           console.log("Write to zapi_businesses.csv successfully!");
//           res.download(filePath);
//         })
//         .pipe(ws);
//         resolve();
//     });
//     businessListPromise.then(function(data){
//       console.log(filePath);
//     }).then(function(data){
//       console.log("Download successful!");
//     });
//   });
// });
