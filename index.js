require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
const multer = require('multer');
const cloudinary = require('cloudinary');

var app = express();
var upload = multer({dest: './uploads'});


app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('myFile'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    console.log(result);
    var imgUrl = cloudinary.url(result.public_id);
    res.render('index', {url: imgUrl});
  })
});

app.listen(3000);
