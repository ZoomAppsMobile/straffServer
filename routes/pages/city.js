var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('city', { title: 'Города', city_name:"Алматы", x:10});
});

module.exports = router;
