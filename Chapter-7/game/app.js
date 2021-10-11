var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var  flash = require('express-flash')
const passport = require('./lib/passport')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersLogin = require('./routes/login');
var usersGamerRouter = require('./routes/usersGamer');

var app = express();
app.use(session({
  secret: 'Buat ini jadi rahasia',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/login', usersLogin);
app.use('/users', usersRouter);
app.use('/users-gamer', usersGamerRouter);

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
