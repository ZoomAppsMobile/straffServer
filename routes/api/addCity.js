var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
/**
 * @api {post} /api/addCity Добавление городов
 * @apiName Добавление городов
 * @apiGroup City and Country
 * @apiSampleRequest  /api/addCountry

 *
 * @apiParam {String} city_name Название города
 * @apiParam {String} country_id  Индитификатор страны
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    code: 200,
    data: {
      message: "Вы успешно добавили город"
    }
 *
 * @apiError message Ошибка соеденения с базой данных
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
     code: 400,
     data: {
        message: "Ошибка соеденения с базой данных"
           }
 */
router.post('/', function (req, res) {
    var db = req.db;
    var city_name = req.body.city_name;
    var country_id = req.body.country_id;

    if (city_name == null || city_name.length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите название города"
            }
        })
    } else if (country_id == null || country_id.length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите какой стране пренадлежит город"
            }
        })
    } else {

        db.collection("country").findOne({_id: ObjectId(country_id)}, function(err, result) {
            if (err) {
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            }else {
                if (result == null) {
                    res.json({
                        code: 400,
                        data: {
                            message: "Данной страны не существует"
                        }
                    })
                } else {
                    db.collection("city").findOne({city_name: city_name.toLowerCase()}, function (err, result) {
                        if (err) {
                            res.json({
                                code: 400,
                                data: {
                                    message: "Ошибка соеденения с базой данных"
                                }
                            })
                        } else {
                            if (result != null) {
                                res.json({
                                    code: 400,
                                    data: {
                                        message: "Данный город уже существует"
                                    }
                                })
                            } else {
                                db.collection("city").insertOne({
                                    city_name: city_name.toLowerCase(),
                                    country_id: ObjectId(country_id)
                                }, function (err) {
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
                                                message: "Вы успешно добавили город"
                                            }
                                        })
                                    }

                                })
                            }
                        }

                    })
                }
            }

        });






    }


});
module.exports = router;