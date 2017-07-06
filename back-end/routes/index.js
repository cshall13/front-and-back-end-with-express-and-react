// BACK-END EXPRESS SERVER

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'x',
    password: 'x',
    database: 'toDo'
})

connection.connect();

// set up a route to handle React's first request
router.get('/getTasks', function(req, res, next) {
    // this is a database query
    connection.query('SELECT * FROM tasks', (error,results)=>{
        if (error) throw error;
        res.json(results);
    })
});

router.get('/getTask/:id', (req,res)=>{
    connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`,(error,results)=>{
        if(results.length === 0){
            res.json({msg:"noResult"})
        }else{
            res.json(results[0])
        }
    })
});

router.post('/deleteTask', (req,res)=>{
    connection.query('DELETE FROM tasks WHERE id = '+req.body.taskId,(error,results)=>{
        if(error) throw error;
        res.json({
            msg: "success"
        })
    })
})

router.post('/addTask', (req,res)=>{
    var newTask = req.body.taskName;
    var newTaskDate = req.body.taskDate;
    connection.query('INSERT INTO tasks (taskName, taskDate) VALUES (?, ?)', [newTask, newTaskDate], (error,results)=> {
        if (error) throw error;
        connection.query('SELECT * FROM tasks', (error2, results2) => {
            if (error2) throw error2;
            res.json(results2);
        })
    })
})

// set up a route to handle React's first request
router.get('/getStudents', function(req, res, next) {
    // this is a database query
    connection.query('SELECT * FROM students', (error,results)=>{
        if (error) throw error;
        res.json(results);
    })
  //   res.json(
  //     {
  //         students: [
  //             'marissa',
  //             'merilee',
  //             'chris',
  //             'stephen',
  //             'chad',
  //             'shane'
  //         ]
  //     }
  // )
});

// addStudent route. Expects a name in the body, will add that name to the students
// table, then respond with all students in that table
router.post('/addStudent', (req,res)=>{
    var studentToAdd = req.body.name;
    connection.query('INSERT INTO students (name) VALUES (?)', [studentToAdd], (error,results)=> {
        if (error) throw error;
        connection.query('SELECT * FROM students', (error2, results2) => {
            if (error2) throw error2;
            res.json(results2);
        })
    })
})
module.exports = router;
