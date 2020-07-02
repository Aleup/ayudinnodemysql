var express = require('express')
var router = express.Router()
var id = Math.floor(Math.random() * 1000000) + 1;

var urlAyudin = {
	url:"luchito.com", 
	tag:"procastinacion",
	rank:"1"
	};

router.get('/', function (req, res) {
  res.send('oli homepage')
})
// define the about route
router.get('/about', function (req, res) {
  res.status(200);
  res.send(urlAyudin)
})
router.get('/:type/:value', function (req, res) {
 res.send( 'Buenos Dias ' + req.params.type + ' ' + req.params.value)
})
router.get('/error', function (req, res) {
  res.status(400);
  res.json({message: "Bad Request", value:req.params.type});
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

module.exports = router