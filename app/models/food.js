var mongoose = require('mongoose');
var schema = mongoose.Schema,ObjectId = schema.ObjectId;

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
    ty: {
        type: String,
        required: true
    },
    cal: {
        type: Number,
        required: true
    },
    feeling: {
        type: ObjectId,
        ref: 'Feeling',
        required: true
    },
    pictures: {
        type: String,
        match: /^http:\/\//i
    }
});

module.exports = mongoose.model('Food', foodSchema);