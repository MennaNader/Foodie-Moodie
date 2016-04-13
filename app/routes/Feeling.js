module.exports = function(router) {

    var Feeling = require('../models/feeling');

        router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.route('/feeling')
        .post(function(req, res) {
            console.log(req.method, req.url);
            var feeling = new Feeling();
            feeling.name = req.body.name;

            feeling.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Feeling created!' });
            });
        })
        .get(function(req, res) {
            console.log(req.method, req.url);
            Feeling.find(function(err, feelings) {
                if (err)
                    res.send(err);
                res.json(feelings);
            });
        });
    router.route('/feelingname?:name')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Feeling.find({
                name: req.query.name
            },function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });


    router.route('/feeling?:_id')
        .get(function(req, res) {
            Feeling.findById(req.query._id, function(err, feeling) {
                if (err)
                    res.send(err);
                res.json(feeling);
            });
        })
        .put(function(req, res) {
            Feeling.findById(req.query._id, function(err, feeling) {
                if (err)
                    res.send(err);

                feeling.name = req.body.name;

                feeling.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Feeling Updated' });
                });
            });
        })
        .delete(function(req, res) {
            Feeling.remove({
                _id: req.query._id
            }, function(err, feeling) {
                if (err)
                    res.send(err);
                res.json({ message: 'Feeling Deleted!' });
            });
        });
}
