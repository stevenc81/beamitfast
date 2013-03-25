
/**
 * Module dependencies.
 */
global.config = require('./config');
global.util = require('./util/util');
global.errcode = require('./util/errorcode');

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    auth = require('./routes/auth'),
    run = require('./routes/run'),
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

    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.cookieParser());
    app.use(express.session(
        {
        // key: config.session.key,
        secret: config.session.secret,
        cookie: {path: '/'}
        }
        ));
    app.use(app.router);
});

app.configure('development', function(){
    // app.use(express.errorHandler());

    // Use custom error handler
    app.use(util.APIErrorHandler);
});

app.get('/', routes.index);

// user auth
app.post('/signup', auth.validateSignup, auth.detectEmailDupe, auth.signup);
app.post('/signin', auth.validateSignin, auth.signin);

// user op
app.get('/users', user.list);
app.get('/users/:uid', user.view);

// run create
app.post('/runs/request', run.requireSignin, run.validateRequest, run.request);
app.get('/runs', run.list);

app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
