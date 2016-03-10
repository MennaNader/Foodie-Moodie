var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tipSchema = new schema({
    data: String,
    feeling_ID: {
    	type:  Number,
    	ref: 'Feeling'
    },
    food_ID: {
    	type: Number,
    	ref: 'Food'
    },
    user_ID: {
        type: Number,
        ref: 'User'
    }
});

module.exports = mongoose.model('Tip', tipSchema);
