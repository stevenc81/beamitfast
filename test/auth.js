var should = require('should'),
    request = require('request');

describe('Auth', function() {
    describe('#signup()', function() {
        it('should signup the given user successfully', function(done) {
            request(
                {
                    method: 'POST',
                    url: 'http://localhost:8084/signup',
                    json: true,
                    body: {
                        email: 'test_email',
                        password: 'test_password',
                        firstname: 'test_firstname',
                        lastname: 'test_lastname',
                        city: 'test_city'
                    }
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    res.statusCode.should.be.equal(200);

                    done();
                }
            );
        });
    });
});