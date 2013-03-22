var flow = require('flow'),
    mysql = require('mysql');

exports.signupValidate = function(req, res, next) {

    flow.exec(
        function() {
            var email = req.body.email;
            var password = req.body.password;
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var city = req.body.city;

            if (!email) {
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing email');
            }

            if (!password) {
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing password');
            }

            if (!firstname) {
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing first name');
            }

            if (!lastname) {
                console.log('missing last name');
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing last name');
            }

            if (!city) {
                console.log('missing city');
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing city');
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