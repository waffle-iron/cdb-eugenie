"use strict";
// server.js
var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
// modules =================================================
var app = express();
app.use(morgan('combined'));
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// configuration ===========================================
// config files
var db = require('./config/db');
// set our port
var port = process.env.PORT || 8080;
// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);
// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/'));
// routes ==================================================
var dancer = require("./api/dancer");
dancer.dancers(app);
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);
// frontend routes =========================================================
// route to handle all angular requests
app.get('*', function (req, res) {
    res.sendfile('index.html'); // load our public/index.html file
});
// shoutout to the user                     
console.log('Server running at ' + port);
// expose app           
exports = module.exports = app;
//# sourceMappingURL=server.js.map