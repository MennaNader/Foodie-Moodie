var mongoose = require('mongoose');
var schema = mongoose.Schema;

var foodSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cat: {
        type: String,
        required: true
    },
    ty:{
        type: Boolean,
        required: true
    },
    cal: {
        type: Number,
        required: true
    },
    feeling: [{
        type: Number,
        ref: 'Feeling',
        required: true
    }],
    pictures: [{ type: String, match: /^http:\/\//i }]
});

module.exports = mongoose.model('Food', foodSchema);
