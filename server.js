var express = require('express')
const bodyparser = require('body-parser');
var app = express()


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));




const api = require('./server/routing/api')
app.use('/api',api);





app.listen(3000)