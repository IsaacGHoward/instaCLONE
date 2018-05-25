
var express = require('express');
var bodyParser = require('body-parser');
var clientSessions = require('client-sessions');
var setUpPassport = require("./setuppassport");
var routes = require("./routes");
//var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/testdb");

var app = express();
setUpPassport();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use(express.static('./public/views'));

app.use(clientSessions({
  secret: 'RandOM Seed FOr "ENcryption" 135155' // CHANGE THIS!
}));

app.use(routes);

var port = process.env.PORT || 3000;
app.listen(port);
