var express = require("express");
var router = express.Router();
/**
 * @api {get} /api/updateCountry Обновление стран[updateCountry]
 * @apiName Обновление стран[updateCountry]
 * @apiGroup City and Country
 * @apiSampleRequest  /api/updateCountry

 *
 * @apiParam {String} country_name_current Текущее название страны
 * @apiParam {String} country_name_new  Новое название страны
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 200,
     "data": {
         "message": "Вы успешно изменили страну"
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных<br>
 Укажите текущее название страны<br>
 Укажите название нового страны<br>
 Данного страны нет в списке<br>
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 {
     "code": 400,
     "data": {
         "message": message
     }
 }
 */
router.get('/', function (req, res) {
    var db = req.db;
    var country_name_current = req.query.country_name_current;
    var country_name_new= req.query.country_name_new;

    if (country_name_current == null || country_name_current.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите текущее название страны"
            }
        })
    } else if (country_name_new == null || country_name_new.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите новое название страны"
            }
        })
    }else {
        db.collection("country").findOne({country_name:country_name_current.toLowerCase()}, function (err, resultFind) {
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
                            message: "Данной страны нет в списке"
                        }
                    })
                }else{

                    var myquery = {country_name: country_name_current.toLowerCase()};
                    var newvalues = {$set: {country_name: country_name_new.toLowerCase()}};
                    db.collection("country").updateOne(myquery, newvalues, function (err, result) {
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
                                    message: "Вы успешно изменили страну"
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