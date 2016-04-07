var express = require('express');
var mongoose = require('mongoose');
var app = express();

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/hackOverflow';

mongoose.connect(dbURI);

 mongoose.connection.on('connected', function () {
   console.log('Mongoose connected to ' + dbURI);
 });

 mongoose.connection.on('disconnected', function () {
   console.log('Mongoose disconnected');
 });

 process.on('SIGINIT', function () {
   mongoose.connection.close(function () {
     console.log('Mongoose disconnected through app termination');
     process.exit(0);
   });
 });

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;
