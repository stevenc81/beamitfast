var flow = require('flow'),
    mysql = require('mysql');

exports.requireSignin = function(req, res, next) {
    if (req.session.user.id) {
        next();
    } else {
        return next(new util.APIErr(errcode.USER_NOT_SIGNEDIN));
    }
};

exports.validateRequest = function(req, res, next) {
    flow.exec(
        function() {
            var receiver = req.body.receiver_id;
            var pickupLoc = req.body.pickup_loc;
            var dropoffLoc = req.body.dropoff_loc;
            var proposedPrice = req.body.proposed_price;
            var timeLimit = req.body.time_limit;
            var packageWeight = req.body.package_weight;
            var packageD1 = req.body.package_d1;
            var packageD2 = req.body.package_d2;
            var packageD3 = req.body.package_d3;

            if (!receiver ||
                !pickupLoc ||
                !dropoffLoc ||
                !proposedPrice ||
                !timeLimit ||
                !packageWeight ||
                !packageD1 ||
                !packageD2 ||
                !packageD3) {

                return next(new util.APIErr(errcode.MISING_PARAMS, 'missing important paras'));
            }

            next();
        }
    );
};

exports.request = function(req, res, next) {
    var conn = mysql.createConnection(config.db);

    flow.exec(
        function() {
            conn.connect();

            var queryString = 'INSERT INTO RunRequests SET ?';
            var run = {SenderId: req.session.user.id,
                ReceiverId: req.body.receiver_id,
                PickupLoc: req.body.pickup_loc,
                DropoffLoc: req.body.dropoff_loc,
                ProposedPrice: req.body.proposed_price,
                TimeLimit: req.body.time_limit,
                PackageWeight: req.body.package_weight,
                PackageD1: req.body.package_d1,
                PackageD2: req.body.package_d2,
                PackageD3: req.body.package_d3};

            conn.query(queryString, run, this);
        }, function(err, result) {
            if (err) {
                throw err;
            }
            conn.end();

            res.send('success');
        }
    );
};

exports.list = function(req, res, next) {
    var conn = mysql.createConnection(config.db);

    flow.exec(
        function() {
            conn.connect();

            var queryString = 'SELECT * FROM RunRequests';
            conn.query(queryString, this);
        }, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            conn.end();

            var rv = {runs: []};
            rv.runs = rows;
            res.send(rv);
        }
    );
};