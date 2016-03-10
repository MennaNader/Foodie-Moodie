var mongoose = require('mongoose');
var schema = mongoose.Schema;

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
    age: Number
});

module.exports = mongoose.model('User', userSchema);
