module.exports = function(router) {
    var Score = require('../models/score');
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.route('/scores')
        .post(function(req, res) {
            console.log(req.method, req.url);
            var score = new Score();
            score.Badge_tips = req.body.Badge_tips;
            score.Badge_approves = req.body.Badge_approves;
            score.totalScore = req.body.totalScore;

            score.save(function(response, err) {
                if (err)
                    res.send(err);
                res.json(response);
            });
        });
    // .get(function(req, res) {
    //     console.log(req.method, req.url);
    //     Score.find(function(err, scores) {
    //         if (err)
    //             res.send(err);
    //         console.log(scores);
    //         res.json(scores);
    //     });
    // });

    router.route('/more')
        .get(function(req, res) {
            Score.find({}).sort({ totalScore: 'desc' }).exec(function(err, docs) {
                if (err)
                    console.log(err);
                res.json(docs);
            });
        });

    router.route('/score?:_id')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Score.find({
                _id: req.query._id
            }, function(err, score) {
                if (err)
                    res.send(err);
                res.json(score);
            });
        })
        .put(function(req, res) {
            console.log(req.method, req.url);
            Score.findOne({
                _id: req.query._id
            }, function(err, score) {
                if (err)
                    res.send(err);
                score.Badge_tips = req.body.Badge_tips;
                score.Badge_approves = req.body.Badge_approves;
                score.totalScore = req.body.totalScore;
                score.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'score Updated' });
                });
            });
        })
        .delete(function(req, res) {
            console.log(req.method, req.url);
            Score.remove({
                _id: req.query._id
            }, function(err, score) {
                if (err)
                    res.send(err);
                res.json({ message: 'score Deleted!' });
            });
        });
}
