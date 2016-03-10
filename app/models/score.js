var mongoose = require('mongoose');
var schema = mongoose.Schema;

var scoreSchema = new schema({
    user_ID: {
        type: Number,
        ref: 'User',
        unique: true
    },
    Badge_tips: Number,
    Badge_approves: Number,
    totalScore: Number
});

module.exports = mongoose.model('Score', scoreSchema);
