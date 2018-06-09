var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Пользователи',
        name_user :" Константин Щерба",
        status:"Администратор"


    });
});

module.exports = router;
