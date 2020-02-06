
//
// business.get("/import", function(req, res){
//   res.render("business_import", { page: "businesses" });
// });
//
// business.post("/import", csv_upload.single('file'), function(req, res){
//   var csv_file = req.file;
//   console.log(csv_file);
//   let stream = fs.createReadStream(csv_file.path);
//   let csvData = [];
//   let csvStream = fastcsv
//     .parse()
//     .on("data", function(data){
//       csvData.push(data);
//     })
//     .on("end", function(){
//       // Remove the first line: header
//       csvData.shift();
//
//       //console.log(csvData);
//
//       let strCSVData = csvData.join('|');
//
//       url_d = base_url+"/import_business.php/zapi-v1/user/2/business/"+strCSVData+"/format/array";
//       let options = {
//         url: url_d,
//         method: 'POST'
//       }
//       request.post(options, function(err, response, body){
//         console.log("PHP: "+body);
//         if(body == null || undefined){
//
//         }
//         res.redirect("/business");
//       });
//     });
//     stream.pipe(csvStream);
// });
