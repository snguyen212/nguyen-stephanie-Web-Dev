var express = require('express');
var app = express();
var multer = require('multer');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var assignment = require('./assignment/app.js');
var project = require('./project/app.js');



//var db = mongoose.connect(connectionString);

//app.use(multer());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allows you to configure session so taht it's encrypted
//secret is session enviroment variable  and need to install this?

//app.use(session({secret: "secretkey", resave :true, saveUninitialized :true}));
app.use(session({
    //secret: process.env.SESSION_SECRET,
    secret: 'secretkey',
    resave :true,
    saveUninitialized :true
}));

app.use(passport.initialize());
app.use(passport.session());


// require ("./test/app.js")(app);

project(app);   
assignment(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
