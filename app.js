/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = {
        'secret': 'foodiemoodie'
    };

// Configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

var con = function() {
    console.log("i am connected");
    // mongoose.connection.db.dropCollection("mood", function(err) {
    //     console.log(err);
    // });

    //  mongoose.connection.db.dropDatabase(function(err) {
    //     	console.log(err);
    // });

};

var mongoose = require('mongoose');
mongoose.connect('mongodb://foodie:moodie@ds049854.mongolab.com:49854/foodiemoodie');
var Schema = mongoose.Schema;
console.log(mongoose.connection.readyState);
mongoose.connection.on('connected', con);



app.set('superSecret', config.secret);

var User = require('./app/models/user');




// ROUTES FOR OUR API 
// ============================================ 
var router = express.Router();

app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'Connected' });
});


require('./app/routes/Mood')(router);
require('./app/routes/Food')(router);
require('./app/routes/Tip')(router);
require('./app/routes/Score')(router);

require('./app/routes/User')(router, config);

//REGISTER OUR ROUTES -----------




//start the server 

app.listen(port);
console.log('Start at ' + port);
