  var mongoose = require('mongoose');
  var schema = mongoose.Schema;

  var scoreSchema = new schema({
          Badge_tips: {
              type: Number,
              default: 0
          },
          Badge_approves: {
              type: Number,
              default: 0
          },
          totalScore: {
              type: Number,
              default: 0
          }
  });
  module.exports = mongoose.model('Score', scoreSchema);
