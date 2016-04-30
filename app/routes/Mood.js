module.exports = function(router) {

    var Mood = require('../models/mood');

        router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.route('/mood')
        .post(function(req, res) {
            console.log(req.method, req.url);
            var mood = new mood();
            mood.name = req.body.name;

            mood.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'mood created!' });
            });
        })
        .get(function(req, res) {
            console.log(req.method, req.url);
            Mood.find(function(err, moods) {
                if (err)
                    res.send(err);
                res.json(moods);
            });
        });
    router.route('/moodname?:name')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Mood.find({
                name: req.query.name
            },function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });


    router.route('/moods?:_id')
        .get(function(req, res) {
            Mood.findById(req.query._id, function(err, mood) {
                if (err)
                    res.send(err);
                res.json(mood);
            });
        })
        .put(function(req, res) {
            Mood.findById(req.query._id, function(err, mood) {
                if (err)
                    res.send(err);

                mood.name = req.body.name;

                mood.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'mood Updated' });
                });
            });
        })
        .delete(function(req, res) {
            Mood.remove({
                _id: req.query._id
            }, function(err, mood) {
                if (err)
                    res.send(err);
                res.json({ message: 'mood Deleted!' });
            });
        });
}
