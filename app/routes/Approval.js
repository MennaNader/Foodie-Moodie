module.exports = function(router) {
    var Approval = require('../models/approval');


    router.route('/approvals')
        .post(function(req, res) {
            var approval = new Approval();
            approval.tip = req.body.tip;
            approval.user_ID1 = req.body.user_ID1;
            approval.user_ID2 = req.body.user_ID2;

            approval.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Approval created!' });
            });
        })
        .get(function(req, res) {
            Approval.find(function(err, approvals) {
                if (err)
                    res.send(err);
                res.json(approvals);
            });
        });



    router.route('/approval?:_id')
        .get(function(req, res) {
            Approval.findById(req.query._id, function(err, approval) {
                if (err)
                    res.send(err);
                res.json(approval);
            });
        })
        .put(function(req, res) {
            Approval.findById(req.query._id, function(err, approval) {
                if (err)
                    res.send(err);
                approval.tip = req.body.tip;
                approval.user_ID1 = req.body.user_ID1;
                approval.user_ID2 = req.body.user_ID2;

                approval.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({ message: 'Approval Updated' });
                });
            });
        })
        .delete(function(req, res) {
            Approval.remove({
                _id: req.query._id
            }, function(err, approval) {
                if (err)
                    res.send(err);
                res.json({ message: 'Approval Deleted!' });
            });
        });
};
