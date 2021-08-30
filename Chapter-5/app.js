var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var gameRouter = require('./routes/game');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  console.log(req)
  if(req.path == '/'){
    next()
  } else if (req.path === '/game') {
   if(req.query.isLogin == 'true') {
     next()
     console.log(req.query.isLogin)
   } else {
      res.redirect('/')
   }
  } else if (req.path === '/users') {
    if (req.headers.authorization == 'Bearer aksbdkbsjkbdakjdas'){
      next()
    } else {
      res.json ({
        'message' : 'access denied'
      })
    }
  } else {
    next(createError(404));
  }
});

app.use('/', homeRouter);
app.use('/game', gameRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
