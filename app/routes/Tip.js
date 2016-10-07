module.exports = function(router) {
    var Tip = require('../models/tips');

    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });
    router.route('/tips')
        .post(function(req, res) {
            console.log(req.method, req.url);
            console.log(req.body);
            console.log(req.query);
            var tip = new Tip();
            tip.data = req.body.data;
            tip.mood = req.body.mood;
            tip.food = req.body.food;
            tip.user = req.body.use;
            // tip.approvals = req.body.approvals;
            console.log(req.body.mood);
            console.log(req.body.use);
            console.log(req.body.food);
            console.log(req.body.data)

            tip.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tip created!' });
            });
        })
        .get(function(req, res) {
            console.log(req.method, req.url);
            Tip.find(function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });

    router.route('/tipmood?:mood')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Tip.find({
                mood: req.query.mood
            }, function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });

    router.route('/approvaltip?:_id')
        .put(function(req, res) {
            console.log("object");
            console.log(req.method, req.url);
            Tip.findById(req.query._id, function(err, tip) {
                if (err)
                    res.send(err);
                console.log(tip.disapprovals.constructor);
                if (tip.disapprovals.includes(req.body.userid)) {
                    tip.disapprovals.pull(req.body.userid);
                }
                if (!tip.approvals.includes(req.body.userid)) {
                    tip.approvals.push(req.body.userid);
                }
                tip.save(function(err) {
                    if (err)
                        console.log(err);
                    res.json({ message: 'approval added' });
                });
            });
        });
    router.route('/disapprovaltip?:_id')
        .put(function(req, res) {
            console.log(req.method, req.url);
            Tip.findById(req.query._id, function(err, tip) {
                if (err)
                    res.send(err);
                console.log(tip.approvals);
                if (tip.approvals.includes(req.body.userid)) {
                    tip.approvals.pull(req.body.userid);
                }
                if (!tip.disapprovals.includes(req.body.userid)) {
                    tip.disapprovals.push(req.body.userid);
                }
                tip.save(function(err) {
                    if (err)
                        console.log(err);
                    res.json({ message: 'disapproval added' });
                });
            });
        });

    router.route('/tipfood?:food')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Tip.find({
                food: req.query.food
            }, function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });
    router.route('/tip?:_id')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Tip.findById(req.query._id, function(err, tip) {
                if (err)
                    res.send(err);
                res.json(tip);
            });
        })
        .put(function(req, res) {
            console.log(req.method, req.url);
            Tip.findById(req.query._id, function(err, tip) {
                if (err)
                    res.send(err);
                tip.data = req.body.data;
                tip.user = req.body.user;
                tip.mood = req.body.mood;
                tip.food = req.body.food;

                tip.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Tip Updated' });
                });
            });
        })
        .delete(function(req, res) {
            console.log(req.method, req.url);
            Tip.remove({
                _id: req.query._id
            }, function(err, tip) {
                if (err)
                    res.send(err);
                res.json({ message: 'Tip Deleted!' });
            });
        });
};
