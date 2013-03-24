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
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing email'));
            }

            if (!password) {
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing password'));
            }

            if (!firstname) {
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing first name'));
            }

            if (!lastname) {
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing last name'));
            }

            if (!city) {
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing city'));
            }

            next();
        }
    );
};

exports.detectEmailDupe = function(req, res, next) {
    var conn = mysql.createConnection(config.db);
    flow.exec(
        function() {
            conn.connect();

            var queryString = 'SELECT Email FROM Users WHERE Email = ' + 
                                mysql.escape(req.body.email);

            conn.query(queryString, this);
        }, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            conn.end();

            if (rows.length > 0) {
                return next(new util.APIErr(errcode.EMAIL_INUSE, 'email duplicated'));
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
            var hashedPassword = bcrypt.hashSync(req.body.password, salt);

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
            conn.end();

            req.session.user = req.body.email;
            res.send('success');
        }
    );
};

exports.validateSignin = function(req, res, next) {
    flow.exec(
        function() {
            var email = req.body.email;
            var password = req.body.password;

            if (!email) {
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing email'));
            }

            if (!password) {
                return next(new util.APIErr(errcode.MISSING_PARAMS, 'missing password'));
            }

            next();
        }
    );
};

exports.signin = function(req, res, next) {
    var conn = mysql.createConnection(config.db);
    flow.exec(
        function() {

            conn.connect();

            var queryString = 'SELECT * FROM Users WHERE Email = ' + 
                                mysql.escape(req.body.email);

            conn.query(queryString, this);
        }, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            conn.end();

            if (rows.length == 0) {
                return next(new util.APIErr(errcode.EMAIL_NOT_EXIST, 'no signup user with this email')); 
            }

            var user = rows[0];
            if (bcrypt.compareSync(req.body.password, user.Password)) {
                req.session.user = user.Email;
                res.send('success');
            } else {
                return next(new util.APIErr(errcode.PASSWORD_INCORRECT));
            }
        }
    );
}