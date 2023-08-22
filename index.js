//define dependecies 
var express = require("express");
var path = require("path");
var app = express();
var routes = require("./routes")
var bodyParser = require("body-parser")
var favicon = require('serve-favicon');

//set file path to views 
app.set('views', path.join(__dirname, "components"));
//set default engine, and provide ejs as extension
app.set("view engine", "ejs");

//set port for localhost
app.set("port", process.env.PORT || 3000);

//for routing using an extra file 
app.use(routes)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Set favicon of website 
app.use(favicon(path.join(__dirname, 'public', 'images/favicon/favicon.ico')))

//static files 
app.use(express.static(__dirname + '/public'));

//test listener if start works 
app.listen(app.get("port"), function() {

    console.log("Server started")

});

