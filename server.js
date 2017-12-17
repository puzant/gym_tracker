var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var morgan = require('morgan');
var config = require('./config');
var expressJwt = require('express-jwt');

var app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

app.use('/api/workout', require('./Express_routes/workout_routes.js'));
app.use('/auth', require('./Express_routes/authRoutes'));
app.use('/api', expressJwt({secret:config.secret}));

mongoose.connect(config.database);

mongoose.connect('mongodb://localhost/workout_schema', function(){
    console.log('connected to the database');
})

app.listen(7000, function(){
    console.log("server is alive on port 7000");
})