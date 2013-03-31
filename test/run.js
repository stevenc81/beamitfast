var should = require('should'),
    request = require('request');

describe('Run', function() {
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
    
    describe('#request()', function() {
        it('should request a run successfully', function(done) {
            request(
                {
                    method: 'POST',
                    url: 'http://localhost:8084/runs',
                    json: true,
                    body: {
                        receiver_id: '1',
                        pickup_loc: 'test_pickup_loc',
                        dropoff_loc: 'test_dropoff_loc',
                        proposed_price: 100,
                        time_limit: 'test_time_limit',
                        package_weight: 'test_package_weight',
                        package_d1: 'test_package_d1',
                        package_d2: 'test_package_d2',
                        package_d3: 'test_package_d3'
                    }
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

    describe('#request()', function() {
        it('should request a run successfully', function(done) {
            request(
                {
                    method: 'POST',
                    url: 'http://localhost:8084/runs',
                    json: true,
                    body: {
                        receiver_id: '1',
                        pickup_loc: 'test_pickup_loc',
                        dropoff_loc: 'test_dropoff_loc',
                        proposed_price: 100,
                        time_limit: 'test_time_limit',
                        package_weight: 'test_package_weight',
                        package_d1: 'test_package_d1',
                        package_d2: 'test_package_d2',
                        package_d3: 'test_package_d3'
                    }
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

    describe('#list()', function() {
        it('should list all outstanding runs', function(done) {
            request(
                {
                    method: 'GET',
                    url: 'http://localhost:8084/runs',
                    json: true,
                    body: {}
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    res.statusCode.should.be.equal(200);
                    body.runs.length.should.be.equal(2);
                    body.runs[0].DropOffLoc.should.be.equal('test_dropoff_loc');

                    done();
                }
            );
        });
    });

    describe('#delete()', function() {
        it('should delete a run with specified id', function(done) {
            request(
                {
                    method: 'DELETE',
                    url: 'http://localhost:8084/runs/1',
                    json: true,
                    body: {}
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    res.statusCode.should.be.equal(200);
                    body.should.have.property('deleted');

                    done();
                }
            );
        });
    });

    describe('#archive()', function() {
        it('should end a run and archive with specified id', function(done) {
            request(
                {
                    method: 'POST',
                    url: 'http://localhost:8084/runs/2/archive',
                    json: true,
                    body: {
                        pickup_time: '2012-12-12',
                        dropoff_time: '2012-12-12',
                        actual_price: 200
                    }
                }, function(err, res, body) {
                    if (err) {
                        done(err);
                    }

                    console.log(body);
                    res.statusCode.should.be.equal(200);
                    body.should.have.property('deleted');

                    done();
                }
            );
        });
    });
});