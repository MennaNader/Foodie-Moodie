var mongoose = require('mongoose');
var schema = mongoose.Schema;

var moodSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Mood', moodSchema);
