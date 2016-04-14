var mongoose = require('mongoose');
var schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

var tipSchema = new schema({
    data: String,
    feeling: {
        type: ObjectId,
        ref: 'Feeling',
        required: true
    },
    food: {
        type: ObjectId,
        ref: 'Food',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    approvals: [{
        user_ID1: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    disapprovals: [{
        user_ID1: {
            type: ObjectId,
            ref: 'User',
            unique: true
        }
    }]
});

module.exports = mongoose.model('Tip', tipSchema);
