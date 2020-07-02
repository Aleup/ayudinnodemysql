var express = require('express');

var app = express();


console.log("Se levanto");

var datitos = require('./datitos');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/prueba',datitos);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

