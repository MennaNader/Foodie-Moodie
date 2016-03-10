module.exports = function(router) {
    var Food = require('../models/food');


    router.route('/foods')
        .post(function(req, res) {
            var food = new Food();
            food.name = req.body.name;
            food.cat = req.body.cat;
            food.ty = req.body.ty;
            food.cal = req.body.cal;
            food.feeling = req.body.feeling;

            food.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Food created!' });
            });
        })
        .get(function(req, res) {
            Food.find(function(err, foods) {
                if (err)
                    res.send(err);
                res.json(foods);
            });
        });



    router.route('/food?:_id')
        .get(function(req, res) {
            Food.findById(req.query._id, function(err, food) {
                if (err)
                    res.send(err);
                res.json(food);
            });
        })
        .put(function(req, res) {
            Food.findById(req.query._id, function(err, food) {
                if (err)
                    res.send(err);
                food.name = req.body.name;
                food.cat = req.body.cat;
                food.ty = req.body.ty;
                food.cal = req.body.cal;
                food.feeling = req.body.feeling;

                food.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Food Updated' });
                });
            });
        })
        .delete(function(req, res) {
            Food.remove({
                _id: req.query._id
            }, function(err, food) {
                if (err)
                    res.send(err);
                res.json({ message: 'Food Deleted!' });
            });
        });
}
