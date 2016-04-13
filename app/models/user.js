var mongoose = require('mongoose');
var schema = mongoose.Schema,ObjectId = schema.ObjectId;

var userSchema = new schema({
    f_name: String,
    l_name: String,
    email: {
        type: String,
        required: true,
        match: /.+@.+\..+/,
        lowercase: true,
        unique: true
    },
    disease: {
        type: Array
    },
    password: {
        type: String,
        required: true
    },
    favourite_type: String,
    age: Number,
    timeline: [{
        type: ObjectId,
        ref: 'Tip'
    }],
    score: {
        type: ObjectId,
        ref: 'Score',
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
