// EXPRESS SERVER

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'x',
    password: 'x',
    database: 'todo'
})

connection.connect();

// set up a route to handle React's first request
router.get('/getStudents', function(req, res, next) {
  res.json(
      {
          students: [
              'marissa',
              'merilee',
              'chris',
              'stephen',
              'chad',
              'shane'
          ]
      }
  )
});

module.exports = router;
