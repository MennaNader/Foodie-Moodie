module.exports = function(router, config) {


    var User = require('../models/user');
    var jwt = require('jsonwebtoken');

    router.route('/authenticate')
        .put(function(req, res) {
            console.log(req.method, req.url);
            User.findOne({
                email: req.body.email,
            }, function(err, user) {
                if (err)
                    res.send(err);
                if (!user) {
                    res.json({ message: 'Authentication Failed!' });
                } else if (user) {
                    if (user.password != req.body.password) {
                        res.json({ message: 'Authentication Failed!' });
                    } else {
                        var token = jwt.sign(user, config.secret, {
                            expiresIn: 50000
                        });
                        console.log("success");
                        res.json({
                            message: 'token: ',
                            token: token,
                            _id: user._id

                        });
                    }
                }
            });
        });

    // router.use(function(req, res, next) {
    //     // do logging
    //     console.log('Something is happening.');
    //     next(); // make sure we go to the next routes and don't stop here
    // });

    router.route('/users')
        .post(function(req, res) {
            console.log(req.method, req.url);
            console.log(req.body);
            var user = new User();
            user.f_name = req.body.f_name;
            user.l_name = req.body.l_name;
            user.password = req.body.password;
            user.email = req.body.email;
            user.age = req.body.age;
            user.score = req.body.score;
            user.favourite_type = req.body.favourite_type;

            user.save(function(err, response) {
                if (err)
                    res.send(err);
                res.json(response);
            });
        });
    // .get(function(req, res) {
    //     console.log(req.method, req.url);
    //     User.find(function(err, users) {
    //         if (err)
    //             res.send(err);
    //         res.json(users);
    //     });
    // });

    router.route('/userbyname')
        .get(function(req, res) {
            console.log(req.method, req.url);
            User.find({
                f_name: req.query.f_name,
                l_name: req.query.l_name
            }, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        });

    // router.use(function(req, res, next) {
    //     console.log(req.method, req.url);
    //     var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //     if (token) {
    //         jwt.verify(token, config.secret, function(err, decoded) {
    //             if (err) {
    //                 return res.send(err);
    //             }
    //             req.decoded = decoded;
    //             next();
    //         });
    //     } else {
    //         return res.status(403).send({
    //             message: 'No token provided.'
    //         });
    //     }
    // });

    router.route('/userDisease?:_id')
        .put(function(req, res) {
            console.log(req.method, req.url);
            User.findOne({
                    _id: req.query._id
                },
                function(err, user) {
                    if (err)
                        res.send(err);
                    var d = {};
                    d.name = req.body.name;
                    user.update({ $push: { "disease": d } }, function(err) {
                        if (err) return res.send("contact addMsg error: " + err);
                    });
                });
        });


    router.route('/users?:_id')
        .get(function(req, res) {
            console.log(req.method, req.url);
            User.find({
                _id: req.query._id
            }, function(err, user) {
                if (err)
                    res.send(err);
                console.log(user);
                res.json(user);
            });
        })
        .put(function(req, res) {
            console.log(req.method, req.url);
            User.findOne({
                _id: req.query._id
            }, function(err, user) {
                if (err)
                    res.send(err);
                user.f_name = req.body.f_name;
                user.l_name = req.body.l_name;
                user.password = req.body.password;
                user.age = req.body.age;
                user.score = req.body.score;
                user.favourite_type = req.body.favourite_type;
                user.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'User Updated' });
                });
            });
        })
        .delete(function(req, res) {
            console.log(req.method, req.url);
            User.remove({
                _id: req.query._id
            }, function(err, user) {
                if (err)
                    res.send(err);
                res.json({ message: 'User Deleted!' });
            });
        });
};
