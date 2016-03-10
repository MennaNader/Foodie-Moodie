module.exports = function(router) {
    var Tip = require('../models/tips');


    router.route('/tips')
        .post(function(req, res) {
            var tip = new Tip();
            tip.data = req.body.data;
            tip.feeling = req.body.feeling;
            tip.food = req.body.food;
            tip.user = req.body.user;

            tip.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tip created!' });
            });
        })
        .get(function(req, res) {
            Tip.find(function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });



    router.route('/tip?:_id')
        .get(function(req, res) {
            Tip.findById(req.query._id, function(err, tip) {
                if (err)
                    res.send(err);
                res.json(tip);
            });
        })
        .put(function(req, res) {
            Tip.findById(req.query._id, function(err, tip) {
                if (err)
                    res.send(err);
                tip.data = req.body.data;
                tip.user = req.body.user;
                tip.feeling = req.body.feeling;
                tip.food = req.body.food;

                tip.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Tip Updated' });
                });
            });
        })
        .delete(function(req, res) {
            Tip.remove({
                _id: req.query._id
            }, function(err, tip) {
                if (err)
                    res.send(err);
                res.json({ message: 'Tip Deleted!' });
            });
        });
};
