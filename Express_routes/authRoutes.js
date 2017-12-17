var express = require("express");
var authRoutes = express.Router();
var User = require('../workout_schema/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');

authRoutes.get('/setup', function(req, res){
    var nick = new User({
        username: 'nick', 
        email: 'nick@gmail.com',
        password: '1234'
    });
    nick.save(function(err) {
         console.log('user created successfully');
        res.json({success:true});
    });
})

authRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});



authRoutes.post('/signup', function(req, res){
    User.findOne({username: req.body.username},function(err, existingUser){
        if(err) return ers.status(500).send(err);
        if(existingUser) return res.send({success:false, message: "this username is already taken"});
        
        var newUser = new User(req.body);
        newUser.save(function(err, userObj){
            if(err) return res.status(500).send(err);
             return res.send({user:userObj, message: "Successfully created a new user"});
        });
    });
});

authRoutes.post('/login', function(req, res){
    User.findOne({username: req.body.username.toLowerCase()}, function(err, user){
        if(err) return res.status(500).send(err);
        
        if(!user || user.password !== req.body.password) {
            return res.status(403).send({success:false, message:"emmail or password is incorrect"})
        }
        
        var token = jwt.sign(user.toObject(), config.secret, {expiresIn: "24h"});
        return res.send({token:token, user: user.toObject(), success:true, message: "here's your token"})
        
    });
});
module.exports = authRoutes;