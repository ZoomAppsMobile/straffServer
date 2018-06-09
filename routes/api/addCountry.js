var express = require("express");
var router = express.Router();
/**
 * @api {post} /api/addCountry Добавление стран
 * @apiName Добавление стран
 * @apiGroup City and Country
   @apiSampleRequest  /api/addCountry
 *
 * @apiParam {String} country_name Название страны
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
     code: 200,
     data: {
       message: "Вы успешно добавили страну"
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
        var country_name = req.body.country_name;
        if (country_name == null || country_name.length < 3) {
            res.json({
                code: 400,
                data: {
                    message: "Укажите название страны"
                }
            })
        } else {

            db.collection("country").findOne({country_name: country_name.toLowerCase()}, function (err, result) {
                if (err) {
                    res.json({
                        code: 400,
                        data: {
                            message: "Ошибка соеденения с базой данных"
                        }
                    })
                } else {
                    if (result == null) {
                        db.collection("country").insertOne({country_name:country_name.toString().toLowerCase()}, function (err) {
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
                                        message: "Вы успешно добавили страну"
                                    }
                                })
                            }

                        })
                    }else{
                        res.json({
                            code: 200,
                            data: {
                                message: "Данная страна уже имееться в списке"
                            }
                        })
                    }
                }
            })




        }
    }
);
module.exports = router;