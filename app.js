var express = require('express')

var bodyParser = require('body-parser')
var app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/user', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('user');
        closure(db);
    })
}
 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.post('/api/users', function (req, res) {
    connection (  db => {
       db.collection('user').insert(req.body,(err,result) =>{
         res.send(result);

       })
    })

})

app.get('/api/users', function (req, res) {
    connection (  db => {
       db.collection('user').find().toArray().then (result =>{
         res.send(result);

       })
    })

})
app.get('/api/users/:id', function (req, res) {
    connection (  db => {
       db.collection('user').findOne({_id:ObjectID(req.params.id)},(err,result)=> {
         res.send(result);

       })
    })

})

app.get('/api/todos/:id', function (req, res) {
    connection (  db => {
       db.collection('user').findOne({_id:ObjectID(req.params.id)},(err,result)=> {
         res.send(result.todos);

       })
    })

})


app.post('/api/todos/:id', function (req, res) {
    connection (  db => {
       db.collection('user').insert(req.body,(err,result) =>{
         res.send(result.todos);

       })
    })

})
 
app.get('/api/users/todos/:id', (req, res) => {

    connection( db=>{
      db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        res.send(result.todos);
      
    })
  })
  })
  app.post('/api/user/todos/:id',(req,res)=>{
    let qry = {_id:ObjectID(req.params.id)};
    connection(db=>{
        db.collection('user').update(qry,{$push:{todos:req.body}}).then(result=>{
           
            res.send(result);
        })
    })
  })
  app.get('/api/users/todos/:id/:iTodo',(req,res)=>{
      let qry = {_id:ObjectID(req.params.id)};
      connection(db=>{
          db.collection('users').findOne(qry).then(result=>{
             
            
              res.send(result.todos[req.params.iTodo]);
          })
      })
  })
app.listen(3000)