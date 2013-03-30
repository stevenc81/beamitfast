
/**
 * Module dependencies.
 */
global.config = require('./config');
global.util = require('./util/util');
global.errcode = require('./util/errorcode');

var express = require('express'),
    MemcacheStore = require("connect-memcached")(express),
    sessStore = new MemcacheStore({hosts: config.memcached.server + ':' + config.memcached.port}),
    path = require('path'),
    user = require('./routes/user'),
    auth = require('./routes/auth'),
    run = require('./routes/run');

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
        key: config.session.key,
        secret: config.session.secret,
        cookie: {path: '/'},
        store: sessStore
        }
        ));
    app.use(app.router);
});

app.configure('development', function(){
    // app.use(express.errorHandler());

    // Use custom error handler
    app.use(util.APIErrorHandler);
});

// user auth
app.post('/signup', auth.validateSignup, auth.detectEmailDupe, auth.signup);
app.post('/signin', auth.validateSignin, auth.signin);
app.get('/signout', auth.signout);

// user op
app.get('/users', user.list);
app.get('/users/:uid', user.view);

// run create
app.post('/runs', run.requireSignin, run.validateRequest, run.request);
app.get('/runs', run.list);
// end an run and move it to trans history
app.delete('/runs/:id', run.requireSignin, run.end, run.archive);

app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
