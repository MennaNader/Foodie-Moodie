module.exports = function(router) {
    var Food = require('../models/food');
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.route('/foods')
        .post(function(req, res) {
            console.log(req.method, req.url);
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
            console.log(req.method, req.url);
            Food.find(function(err, foods) {
                if (err)
                    res.send(err);
                res.json(foods);
            });
        });
    router.route('/foodname?:name')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Food.find({
                name: req.query.name
            },function(err, tips) {
                if (err)
                    res.send(err);
                res.json(tips);
            });
        });

        router.route('/healthyfood')
            .get(function(req, res) {
                    console.log(req.method, req.url);
                    Food.find({
                            ty: 'true'
                        }, function(err, food) {
                            if (err)
                                res.send(err);
                            res.json(tips);
                        }
                    );
                });

                router.route('/nothealthyfood')
                .get(function(req, res) {
                        console.log(req.method, req.url);
                        Food.find({
                                ty: 'false'
                            }, function(err, food) {
                                if (err)
                                    res.send(err);
                                res.json(tips);
                            }
                        );
                    });

    router.route('/food?:_id')
        .get(function(req, res) {
            console.log(req.method, req.url);
            Food.findById(req.query._id, function(err, food) {
                if (err)
                    res.send(err);
                res.json(food);
            });
        })
        .put(function(req, res) {
            console.log(req.method, req.url);
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
            console.log(req.method, req.url);
            Food.remove({
                _id:req.query._id
            }, function(err, food) {
                if (err)
                    res.send(err);
                res.json({ message: 'Food Deleted!' });
            });
        });
}
