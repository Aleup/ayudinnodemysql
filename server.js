var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.json());
app.use(express.urlencoded()); 

console.log("Se levanto");

var datitos = require('./datitos');

var pool = mysql.createPool ({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'be32dc6bb669c2',
  password: '9ceccd13',
  database: 'heroku_ca5316af2198711'
});

global.pool = pool;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use('/',datitos);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port);

