var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var createAccount = require('./routes/createAccount');
var login = require('./routes/login');
var requestCheckOut = require('./routes/requestCheckOut');
var getRequested = require('./routes/getRequested');
var cancelRequest = require('./routes/cancelRequest');
var fetchBook = require('./routes/fetchBook');
var search = require('./routes/search');
var getCheckedOut = require('./routes/getCheckedOut');
var usernameExists = require('./routes/usernameExists');
var getRandomBook = require('./routes/getRandomBook');
var searchUsers = require('./routes/searchUsers');
var getUserDetails = require('./routes/getUserDetails');
var getRequestList = require('./routes/getRequestList');
var finalizeCheckOut = require('./routes/finalizeCheckOut');
var bookAvailable = require('./routes/bookAvailable');
var returnBook = require('./routes/returnBook');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/createAccount', createAccount);
app.use('/login', login);
app.use('/requestCheckOut', requestCheckOut);
app.use('/getRequested', getRequested);
app.use('/cancelRequest', cancelRequest);
app.use('/fetchBook', fetchBook);
app.use('/search', search);
app.use('/getCheckedOut', getCheckedOut);
app.use('/usernameExists', usernameExists);
app.use('/getRandomBook', getRandomBook);
app.use('/searchUsers', searchUsers);
app.use('/getUserDetails', getUserDetails);
app.use('/getRequestList', getRequestList);
app.use('/finalizeCheckOut', finalizeCheckOut);
app.use('/bookAvailable', bookAvailable);
app.use('/returnBook', returnBook);

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
