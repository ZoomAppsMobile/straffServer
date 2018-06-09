var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/pages/users');
var usersRouter = require('./routes/api/users');
var registerUser = require('./routes/api/registerUser');
var addReviewsUser = require('./routes/api/addReviewsUser');
var getUserInfo = require('./routes/api/userInfo');
var addFile = require('./routes/api/addFine');
var addReviewsFine = require('./routes/api/addReviewsFine');
var getFine = require('./routes/api/getFine');
var blockUsers = require('./routes/api/blockUsers');
var city = require('./routes/pages/city');
var country = require('./routes/pages/country');
var baseFine = require('./routes/pages/baseFine');
var addCityascasc = require('./routes/api/addCity');
var addCountry = require('./routes/api/addCountry');
var getListCity = require('./routes/api/getListCity');
var getListCountries = require('./routes/api/getListCountry');
var deleteCity = require('./routes/api/deleteCity');
var deleteCountry = require('./routes/api/deleteCountry');
var addLikes = require('./routes/api/likes');
var addStatysFine = require('./routes/api/addStatysFine');
var updateCity = require('./routes/api/updateCity');
var updateCountry = require('./routes/api/updateCountry');


//pages
var admin = require('./routes/pages/admin');
var users = require('./routes/pages/users');
var MongoClient = require('mongodb').MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
MongoClient.connect('mongodb://finesapp:finesapp123FjkepLLwS9384@ds161346.mlab.com:61346/finesapp', function (err, db) {
    if (err) {
        throw err;
    }


    app.use(function (req, res, next) {
        req.db = db.db("finesapp");
        next();
    });

    app.use('/', indexRouter);
//app.use('/users', usersRouter);
    app.use('/api/registerUser', registerUser);
    app.use('/api/addReviewsUser', addReviewsUser);
    app.use('/api/userInfo', getUserInfo);
    app.use('/api/addFile', addFile);
    app.use('/api/addReviewsFine', addReviewsFine);
    app.use('/api/getFine', getFine);
    app.use('/api/blockUsers', blockUsers);
    app.use('/api/addCity', addCityascasc);
    app.use('/api/addCountry', addCountry);
    app.use('/api/getListCity', getListCity);
    app.use('/api/getListCountries', getListCountries);
    app.use('/api/deleteCity', deleteCity);
    app.use('/api/deleteCountry', deleteCountry);
    app.use('/api/addLikes', addLikes);
    app.use('/api/addStatysFine', addStatysFine);
    app.use('/api/updateCity', updateCity)
    app.use('/api/updateCountry', updateCountry);


//pages
    app.use('/admin', admin);
    app.use('/users', users);
    app.use('/city', city);
    app.use('/country', country);
    app.use('/baseFine', baseFine);


// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });


// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

});
module.exports = app;
