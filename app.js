const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(logger('dev'));

// Since Express v4.16.0 it already includes a parser middleware (based on body-parser),
// so no need to add the dependency: `const bodyParser = require('body-parser');`.

// `require('body-parser')` may be needed in cases where additional functionality is required,
// like `bodyParser.raw([options])` or `bodyParser.text([options])`.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
