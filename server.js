var express =require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/');
var db = mongoose.connection;
db.once('open', function() {
  console.log('DB connected!');
});
db.on('error', function(err){
  console.log('DB ERROR', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Controll-Allow-Headers', 'content-type, x-access-token'); //1
  next();
});

// API

app.use('/api/auth', require('./api/auth')); //2
app.use('/api/users', require('./api/users')); //2

// server
var port = 3000;
app.listen(port, function(){
  console.log('listening on port'+ port);
});
