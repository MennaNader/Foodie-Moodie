module.exports = function(router) {
    var Score = require('../models/score');

    router.route('/scores')
        .post(function(req, res) {
            var score = new Score();
            score.user_ID = req.body.user_ID;

            Score.save(function() {
                if (err)
                    res.send(err);

                res.json({ message: 'Score created!' });
            });
        })
        .get(function(req, res) {
            Score.find(function(err, Scores) {
                if (err)
                    res.send(err);
                res.json(Scores);
            });
        });



    router.route('/score?:_id')
        .get(function(req, res) {
            Score.findById(req.query._id, function(err, score) {
                if (err)
                    res.send(err);
                res.json(score);
            });
        })
        .put(function(req, res) {
            Score.findById(req.query._id, function(err, score) {
                if (err)
                    res.send(err);
                score.user_ID = req.body.user_ID;
                score.Badge_tips = req.body.Badge_tips;
                score.Badge_tips = req.body.Badge_tips;
                score.feeling = req.body.feeling;

                Score.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Score Updated' });
                });
            });
        })
        .delete(function(req, res) {
            Score.remove({
                _id: req.query._id
            }, function(err, Score) {
                if (err)
                    res.send(err);
                res.json({ message: 'Score Deleted!' });
            });
        });
}
