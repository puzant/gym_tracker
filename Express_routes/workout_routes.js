var express = require("express");
var workoutR = express.Router();
var workout = require('../workout_schema/mongoose_schema.js');


workoutR.route('/')
.get(function(req, res){
    workout.find(function(err, workout){
        if(err){
            res.status(500).send(err);
        } else {
            res.send(workout)
        }
    })
})

.post(function(req, res){
    var newWorkout = new workout(req.body);
    // newWorkout.user = req.user;
    newWorkout.save();
    res.send(newWorkout);

});

//=====================================================

//workoutR.route('/') 
// .get(function(req, res) {
//    workout.find({user: req.user._id}, function(err, workouts) {
//        if (err) return res.status(500).send(err);
//        return res.send(workouts);
//    });
//})
//
//
//    .post(function (req, res) {
//        var workout = new Workout(req.body);
//
//        // Addition: include the user property to this new Todo item
//        workout.user = req.user;
//        workout.save(function (err, newWorkout) {
//            if (err) return res.status(500).send(err);
//            return res.status(201).send(newWorkout);
//        });
//    });
//
//workoutR.route('/workoutid')
//.get(function(req, res) {
//    Workout.findOne({_id: req.params.workoutid, user: req.user._id}, function(err, workouts) {
//        if(err) return res.status(500).send(err);
//        if(!workouts) return res.status(404).send('no workout was found');
//    });
//})
//
//   .put(function (req, res) {
//        // Addition: Change to FindOneAndUpdate and include the search criteria for users
//        Todo.findOneAndUpdate({_id: req.params.workoutid, user: req.user._id}, req.body, {new: true}, function (err, workouts) {
//            if (err) return res.status(500).send(err);
//            return res.send(workouts);
//        });
//    })
//    .delete(function (req, res) {
//        // Addition: Change to FindOneAndRemove and include the search criteria for users
//        Todo.findOneAndRemove({_id: req.params.todoid, user: req.user._id}, function (err, workouts) {
//            if (err) return res.status(500).send(err);
//            return res.send(workouts);
//        });
//    });


//=====================================================

workoutR.route('/:id')
.delete(function(req, res){
  workout.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.status(500).send(err)
    } res.send({
      message: "item deleted succesfully"
    })
  })
})

.put(function(req, res){
    workout.findByIdAndUpdate(req.params.id,req.body,{new:true}, function(err, workout){
        if(err) {
            res.status(500).send(err)
        } else {
                res.send(workout);
        }
    })
});

module.exports = workoutR;
