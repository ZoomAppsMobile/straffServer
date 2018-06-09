var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


    res.render('country', { title: 'Страны', country_name: "Казахстан", x :10});
});

module.exports = router;
