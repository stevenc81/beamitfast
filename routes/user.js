var flow = require('flow'),
    mysql = require('mysql');

/*
 * GET users listing.
 */

exports.list = function(req, res){
    res.send("respond with a resource");
};

exports.signupValidate = function(req, res, next) {

    flow.exec(
        function() {
            var email = req.body.email;
            var password = req.body.password || req.query.password;
            var firstname = req.body.firstname || req.query.firstname;
            var lastname = req.body.lastname || req.query.lastname;
            var city = req.body.city || req.query.city;

            if (!email) {
                console.log('missing email');
                return;
            }

            if (!password) {
                console.log('missing password');
                return;
            }

            if (!firstname) {
                console.log('missing first name');
                return;
            }

            if (!lastname) {
                console.log('missing last name');
                return;
            }

            if (!city) {
                console.log('missing city');
                return;
            }

            next();
        }
    );
};

exports.signup = function(req, res) {
    flow.exec(
        function() {
            var connection = mysql.createConnection(config);
            connection.connect();

            var queryString = [''];
            connection.query(queryString, this);
            connection.end();
        }, function () {

        }
    );
};