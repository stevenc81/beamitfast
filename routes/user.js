var flow = require('flow'),
    mysql = require('mysql');

// Since this depends on restful api so using email on url is going to cause issues.
// We will use it when username is avaiable
exports.view = function(req, res, next) {
    var email = req.params.email;
    var conn = mysql.createConnection(config.db);

    flow.exec(
        function() {
            conn.connect();
            var queryString = 'SELECT * FROM Users WHERE Email = ' + 
                                mysql.escape(email);
            conn.query(queryString, this);
        }, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            conn.end();

            if (rows.length == 0) {
                return next(new util.APIError(errorcode.NO_SUCH_USER));
            }

            var user = rows[0];
            res.send(user);
        }
    );
};

exports.list = function(req, res, next) {
    var conn = mysql.createConnection(config.db);

    flow.exec(
        function() {
            conn.connect();

            var queryString = 'SELECT * FROM Users';
            conn.query(queryString, this);
        }, function(err, rows, fields) {
            if (err) {
                throw err;
            }
            conn.end();

            var rv = {users: []};
            rv.users = rows;
            res.send(rv);
        }
    );
}