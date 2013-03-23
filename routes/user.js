var flow = require('flow'),
    mysql = require('mysql'),
    bcrypt = require('bcrypt');

exports.validateSignup = function(req, res, next) {
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
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing last name');
            }

            if (!city) {
                throw new util.APIErr(errcode.MISSING_PARAMS, 'missing city');
            }

            next();
        }
    );
};

exports.signup = function(req, res, next) {
    var conn = mysql.createConnection(config.db);
    flow.exec(
        function() {
            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync( req.body.password, salt);

            conn.connect();

            var queryString = 'INSERT INTO Users SET ?';
            var post = {Email: req.body.email,
                Password: hashedPassword,
                FirstName: req.body.firstname,
                LastName: req.body.lastname,
                City: req.body.city};

            conn.query(queryString, post, this);
        }, function (err, result) {
            if (err) {
                throw err;
            }

            console.log(result.insertId);

            conn.end();
        }
    );
};