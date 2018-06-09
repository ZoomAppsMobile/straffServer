var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var db = req.db;
    db.collection("users").find({}).toArray(function (err, result) {
        if (err) {
            res.json({
                code: 400,
                data: {
                    message: "Ошибка соеденения с базой данных"
                }
            })
        }else{

            res.render('users', {title: 'Пользователи', user_name: "Константин", i: result.length, user_info:result });
        }

    });



});

module.exports = router;
