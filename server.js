/**
 * server.js
 * Main code for web application backend
 */

var express = require("express");
var http = require("http");
var app = express();

var mongoose = require('mongoose');

var sms = require('./helpers/twilio_sms.js');

// Necessary to allow environment to set PORT
app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000));

// Render views
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("pages/index");
    var options = {
    	host : "www.api.umd.io",
    	path : "v0/courses?semester=201702"
    };
    var get = http.get(options, function(res) {
    	console.log(res);
    });
});

app.get('/messages', function(req, res) {
    res.render('pages/messages');
})

app.get('/about', function(req, res) {
    res.render('pages/about');
});

// API
app.post('/receive_sms', sms.receive);

// Page not found error
app.get('/404', function(req, res, next){
    // Trigger a 404
    next();
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('pages/404', {url: req.url});
    return;
});

app.listen(app.get('port'), function() {
    console.log("Live at Port " + app.get('port'));
});
