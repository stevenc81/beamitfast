var should = require('should'),
    request = require('request');

describe('User', function() {
    before(function(done) {
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
                
                done();
            }
        );
    });

    after(function(done) {
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

                done();
            }
        );
    });

    describe('#:id()', function() {
        it('should list the particular user detail', function(done) {
            request(
                {
                    method: 'GET',
                    url: 'http://localhost:8084/users/1',
                    json: true,
                    body: {}
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    res.statusCode.should.be.equal(200);
                    body.ID.should.be.equal(1);
                    body.Email.should.be.equal('test_email');

                    done();
                }
            );
        });
    });
});