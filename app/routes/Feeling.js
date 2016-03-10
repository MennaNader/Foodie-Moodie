module.exports = function(router) {

    var Feeling = require('../models/feeling');

    router.route('/Feelings')
        .post(function(req, res) {
            var feeling = new Feeling();
            feeling.user_ID = req.body.user_ID;

            feeling.save(function() {
                if (err)
                    res.send(err);

                res.json({ message: 'Feeling created!' });
            });
        })
        .get(function(req, res) {
            Feeling.find(function(err, feelings) {
                if (err)
                    res.send(err);
                res.json(feelings);
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
