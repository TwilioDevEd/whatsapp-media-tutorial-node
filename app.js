const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const { promisify } = require('util');
const fileDownload = require('file-download');
const indexRouter = require('./routes/index');

const download = promisify(fileDownload);
const app = express();

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// inject utility functions
app.use((req, res, next) => {
  req.download = download;
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
