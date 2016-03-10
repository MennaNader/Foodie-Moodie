var mongoose = require('mongoose');
var schema = mongoose.Schema;

var approvalSchema = new schema({
    tip_ID: {
        type: Number,
        ref: 'Tip'
    },
    user_ID1: {
        type: Number,
        ref: 'User'
    },
    user_ID2: {
        type: Number,
        ref: 'User'
    }
});

module.exports = mongoose.model('Approval', approvalSchema);
