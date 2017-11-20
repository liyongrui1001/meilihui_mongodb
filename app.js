var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let cookieSession = require("cookie-session");

var index = require('./routes/index');
var account = require('./routes/account');
var list = require('./routes/list');
var login = require('./routes/login');
var page = require('./routes/page');
var pay = require('./routes/pay');
var payment = require('./routes/payment');
var shopcar = require('./routes/shopcar');
var sign = require('./routes/sign');
var shouye = require('./routes/shouye');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//判断用户唯一性
app.use(cookieParser());
app.use(cookieSession({
    name: "node_id",
    keys: ["aa", "bb", "cc"],
    maxAge: 1000 * 60
}));

app.use('/', index);
app.use('/shouye', shouye);
app.use('/login', login);
app.use('/sign', sign);
app.use('/pay', pay);
app.use('/list', list);
app.use('/page', page);
app.use('/payment', payment);
app.use('/shopcar', shopcar);
app.use('/sign', sign);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;