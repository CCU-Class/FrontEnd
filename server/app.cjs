var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var cors = require('cors');

var indexRouter = require('./routes/index.cjs');
var aboutRouter = require('./routes/about.cjs');
var searchCourseRouter = require('./routes/searchCourse.cjs');
var sitemapRouter = require('./routes/sitemap.cjs');
var robotsRouter = require('./routes/robots.cjs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

// http request 放這裡
// app.use('/', indexRouter);
// app.use('/about', aboutRouter);
app.use("/searchCourse", searchCourseRouter);
// app.use("/sitemap.xml", sitemapRouter)
// app.use("/robots.txt", robotsRouter)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

var history = require('connect-history-api-fallback');
app.use(express.static(path.join(__dirname, '../dist')));
app.use(history());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {message: err.message});
});

module.exports = app;
