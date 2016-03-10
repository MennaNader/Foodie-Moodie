module.exports = function(router, config) {


    var User = require('../models/user');
    var jwt    = require('jsonwebtoken');

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
                        var token = jwt.sign(user, config.secret , {
                            expiresIn: 50000
                        });
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
            var user = new User();
            user.f_name = req.body.f_name;
            user.l_name = req.body.l_name;
            user.password = req.body.password;
            user.email = req.body.email;
            user.age = req.body.age;

            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User created!' });
            });
        })
        .get(function(req, res) {
            console.log(req.method, req.url);
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });

    router.use(function(req, res, next) {
        console.log(req.method, req.url);
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.send(err);
                }
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(403).send({
                message: 'No token provided.'
            });
        }
    });


    router.route('/users?:_id')
        .get(function(req, res) {
            User.findById(req.query._id, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        })
        .put(function(req, res) {
            User.findById(req.query._id, function(err, user) {
                if (err)
                    res.send(err);
                user.f_name = req.body.f_name;
                user.l_name = req.body.l_name;
                user.password = req.body.password;
                user.age = req.body.age;

                user.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'User Updated' });
                });
            });
        })
        .delete(function(req, res) {
            User.remove({
                _id: req.query._id
            }, function(err, user) {
                if (err)
                    res.send(err);
                res.json({ message: 'User Deleted!' });
            });
        });
};
