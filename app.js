const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

//routes
const indexRouter = require('./routes/index');

//db
const TodoSchema = require('./models/todo');

const app = express();
require('dotenv').config()

//setup mongoose connection
const mongoose = require('mongoose');
//setup mongoDB Atlas connection info
//if not workable, please change the url provided on the site
const url =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.reaeelm.mongodb.net/?retryWrites=true&w=majority`
//connect
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
//get connection
const db = mongoose.connection;
//bind connection to error event
//when connect seccessfully, console.log
db.once('open', function() {
  console.log("MongoDB database connection established successfully");
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
