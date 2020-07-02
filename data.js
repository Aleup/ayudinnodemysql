var express = require('express');
var router = express.Router();
var id = Math.floor(Math.random() * 1000000) + 1;

router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.post('/', function (req, res) {
  res.send('Got a POST request')
})

router.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

router.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})