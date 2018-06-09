var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

//*
/**
 * @api {delete} /api/deleteCountry Удаление стран
 * @apiName Удаление стран
 * @apiGroup City and Country
  @apiDescription <code>ВНИМАНИЕ!!!</code> Если вы удаляете страну то и все годора принадлежащие данной стране тоже удаляються
 * @apiParam {String} country_id Индитификатор страны
 * @apiSampleRequest  /api/deleteCountry
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 code: 200,
 data: {
  message: "Вы успешно удалили страну"
    }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите индитификатор города,Данной страны не существует в списке,

 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 code: 400,
 data: {
   message: message
      }
 */

router.delete('/', function (req, res) {
    var db = req.db;
    var country_id = req.body.country_id

    if (country_id == null) {
        res.json({
            code: 200,
            data: {
                message: "Укажите индитификатор страны"
            }
        })
    } else {
        db.collection("country").findOne({_id: ObjectId(country_id)}, function (err, result) {
            if (err) {
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            } else {
                if (result == null) {
                    res.json({
                        code: 400,
                        data: {
                            message: "Данной страны не существует в списке"
                        }
                    })
                } else {

                    db.collection("country").deleteOne({_id: ObjectId(country_id)}, function (err, obj) {
                        if (err) {
                            res.json({
                                code: 400,
                                data: {
                                    message: "Ошибка соеденения с базой данных"
                                }
                            })
                        } else {

                            db.collection("city").deleteMany({country_id: ObjectId(country_id)}, function (err, obj) {
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
                                            message: "Вы успешно удалили страну"
                                        }
                                    })
                                }


                            });


                        }
                    });
                }


            }
        });

    }


});

module.exports = router;