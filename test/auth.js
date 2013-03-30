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
                    body.should.be.equal('test_email');

                    done();
                }
            );
        });
    });

    describe('#signin()', function() {
        it('should signin the given user successfully', function(done) {
            request(
                {
                    method: 'POST',
                    url: 'http://localhost:8084/signin',
                    json: true,
                    body: {
                        email: 'test_email',
                        password: 'test_password'
                    }
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    res.statusCode.should.be.equal(200);
                    body.should.be.equal('test_email');

                    done();
                }
            );
        });
    });

    describe('#signout()', function() {
        it('should signout the given user successfully', function(done) {
            request(
                {
                    method: 'GET',
                    url: 'http://localhost:8084/signout',
                    json: true,
                    body: {}
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    res.statusCode.should.be.equal(200);
                    body.should.be.equal('success');

                    done();
                }
            );
        });
    });
});