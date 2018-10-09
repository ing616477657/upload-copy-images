var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const multer =require("multer");
const  upload = multer({
    dest: "upload/"
}) ;
const single = upload.single("myfiles");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "copyDom.html" );
})
app.post("/file" ,single,function(req,res){
        // res.send(req.file);
        // console.log(req.file);
        res.json({
          code:200,
          data:req.file
        })
});
app.post('/post', urlencodedParser, function (req, res) {
   console.log(res);
   res.json({
    code:200,
    data:req.body
   });
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})