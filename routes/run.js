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

exports.validateEndRun = function(req, res, next) {
    flow.exec(
        function() {
            var pickupTime = req.body.pickup_time;
            var dropoffTime = req.body.dropoff_time;
            var actualPrice = req.body.actual_price;

            if (!pickupTime ||
                !dropoffTime ||
                !actualPrice) {

                return next(new util.APIErr(errcode.MISING_PARAMS, 'missing important paras'));
            }

            next();
        }
    );
};

exports.archive = function(req, res, next) {
    var conn = mysql.createConnection(config.db);

    flow.exec(
        function() {
            conn.connect();

            var runId = req.params.id;
            var queryString = 'SELECT * FROM RunRequests WHERE ID = ' + 
                                mysql.escape(req.params.id);

            conn.query(queryString, this);
        }, function(err, rows, fields) {
            if (err) {
                throw err;
            }

            if (rows.legnth === 0) {
                return next(new util.APIErr(errcode.NO_SUCH_RUN, 'cant archive the specified run cuz it doesnt exist in DB'));
            }

            var run = rows[0];

            var queryString = 'INSERT INTO RunTrans SET ?';
            var runRow = {SenderId: run.SenderId,
                ReceiverId: run.ReceiverId,
                // only the sender can end a trip and archive it. The session belongs to him.
                RunnerId: req.session.user.id,
                PickupLoc: run.PickupLoc,
                DropoffLoc: run.DropOffLoc,
                PickupTime: req.body.pickup_time,
                DropoffTime: req.body.dropoff_time,
                ProposedPrice: run.ProposedPrice,
                ActualPrice: req.body.actual_price,
                TimeLimit: run.TimeLimit,
                PackageWeight: run.PackageWeight,
                PackageD1: run.PackageD1,
                PackageD2: run.PackageD2,
                PackageD3: run.PackageD3};

            conn.query(queryString, runRow, this);
        }, function(err, result) {
            if (err) {
                throw err;
            }
            conn.end();

            next();
        }
    );
};

exports.delete = function(req, res, next) {
    var conn = mysql.createConnection(config.db);
    var runid = req.params.id;

    flow.exec(
        function() {
            conn.connect();

            var queryString = 'DELETE FROM RunRequests WHERE ID = ' + 
                                mysql.escape(runid);

            conn.query(queryString, this);
        }, function(err, result) {
            if (err) {
                throw err;
            }
            conn.end();

            res.send(JSON.stringify({deleted: runid}));
        }
    );
};