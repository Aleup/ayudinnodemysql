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


router.post('/mysql-insert', function (req, res) {
  console.log('user: '+req.body.user+ 'and text: ' + req.body.text);
  const mensaje = { msj_text: req.body.text, user: req.body.user, record_date: new Date() };
  var id;

  global.pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('INSERT INTO mensaje SET ?', mensaje, (err, queryres) => {
      connection.release();
      if(err) {
        res.status(400);
        res.send('mysql-insert: error: '+ err);
      }
      console.log('Last insert ID:', queryres.insertId);
      res.send('mysql-insert: success with id: ' + queryres.insertId);
    });
  });
})

router.get('/mysql-select', function (req, res) {
  
  global.pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM mensaje', (err, queryres) => {
      connection.release()
      if(err) {
        res.status(400);
        res.send('mysql-select: error: '+ err);
      }
      console.log('Data received from Db:' + queryres);
      res.send(queryres); 
    });

  });
})

router.delete('/mysql-delete/:id', function (req, res) {
  console.log('Deleting rows with id: ' + req.params.id);

  global.pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);

    connection.query('DELETE FROM mensaje WHERE id = ?', req.params.id, (err, queryres) => {
      connection.release();
      if(err) {
        res.status(400);
        res.send('mysql-delete: error: '+ err);
      }
      console.log(queryres);
      console.log('Deleted ' + queryres.affectedRows + ' row(s)');
      res.send('Deleted ' + queryres.affectedRows + ' row(s)');
    });
  });
})

router.put('/mysql-update/:id', function (req, res) {
  console.log('user: '+req.body.user+ ' and text: ' + req.body.text + ' and id: ' + req.body.id);

  global.pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);

    connection.query('UPDATE mensaje SET msj_text = ?, user = ?, record_date = ? WHERE id = ?', 
      [req.body.text, req.body.user, new Date(), req.params.id], (err, queryres) => {
        connection.release();
        if(err) {
          res.status(400);
          res.send('mysql-update: error: '+ err);
        }
        console.log(queryres);
        console.log(`Changed ${queryres.changedRows} row(s)`);
        res.send('Changed ' + queryres.changedRows + ' row(s)');
    });
  });
})

module.exports = router