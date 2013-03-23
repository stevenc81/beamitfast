
/**
 * Module dependencies.
 */
global.config = require('./config');
global.util = require('./util/util');
global.errcode = require('./util/errorcode');

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function(){
    app.set('port', config.api.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    // app.use(express.errorHandler());

    // Use custom error handler
    app.use(util.APIErrorHandler);
});

app.get('/', routes.index);
app.post('/users/signup', user.validateSignup, user.signup);

app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
