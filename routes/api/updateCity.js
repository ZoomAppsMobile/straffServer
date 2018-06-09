var express = require("express");
var router = express.Router();
/**
 * @api {get} /api/updateCity Обновление городов[updateCity]
 * @apiName Обновление городов[updateCity]
 * @apiGroup City and Country
 * @apiSampleRequest  /api/updateCity

 *
 * @apiParam {String} city_name_current Старое название города
 * @apiParam {String} city_name_new  Новое название города
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 400,
     "data": {
         "message": "Вы успешно изменили город"
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных<br>
 Укажите текущее название города<br>
 Укажите название нового города<br>
 Данного города нет в списке<br>
 Данного города нет в списке<br>
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 {
     "code": 200,
     "data": {
         "message": message
     }
 }
 */
router.get('/', function (req, res) {
    var db = req.db;
    var city_name_current = req.query.city_name_current;
    var city_name_new = req.query.city_name_new;

    if (city_name_current == null || city_name_current.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите текущее название города"
            }
        })
    } if (city_name_new == null || city_name_new.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите название нового города"
            }
        })
    }else {


        db.collection("city").findOne({city_name:city_name_current.toLowerCase()}, function (err, resultFind) {
            if (err) {
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            } else {
                if (resultFind == null) {
                    res.json({
                        code: 400,
                        data: {
                            message: "Данного города нет в списке"
                        }
                    })
                }else{

                    var myquery = {city_name: city_name_current.toLowerCase()};
                    var newvalues = {$set: {city_name: city_name_new.toLowerCase()}};
                    db.collection("city").updateOne(myquery, newvalues, function (err, result) {
                        if (err) {
                            res.json({
                                code: 400,
                                data: {
                                    message: "Ошибка соеденения с базой данных"
                                }
                            })
                        } else {
                            res.json({
                                code: 200,
                                data: {
                                    message: "Вы успешно изменили город"
                                }
                            })
                        }
                    });
                }
            }

        });


    }
});

module.exports = router;