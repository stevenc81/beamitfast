var should = require('should'),
    request = require('request');

describe('Run', function() {
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
                        proposed_price: 'test_proposed_price',
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
});

describe('Run', function() {
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
                    body.runs.length.should.be.equal(1);
                    body.runs[0].DropOffLoc.should.be.equal('test_dropoff_loc');

                    done();
                }
            );
        });
    });
});