var mongoose = require('mongoose');
var schema = mongoose.Schema;

var feelingSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Feeling', feelingSchema);
