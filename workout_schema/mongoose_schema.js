var mongoose = require('mongoose');
var schema = mongoose.Schema;

var workoutSchema = new schema ({
    ExcersiseName: {
        type: String,
        required: true
    },
    NoReps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
//     user: {
//         type: schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     }
});

module.exports = mongoose.model("workout", workoutSchema);
