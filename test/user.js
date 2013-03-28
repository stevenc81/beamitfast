var should = require('should'),
    request = require('request');

describe('User', function() {
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
                    body.should.be.equal(1);

                    done();
                }
            );
        });
    });
});