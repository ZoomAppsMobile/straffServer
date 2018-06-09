var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/**
 * @api {delete} /api/deleteCity Удаление городов
 * @apiName Удаление города
 * @apiGroup City and Country
 * @apiParam {String} city_id Индитификатор города
 * @apiSampleRequest  /api/deleteCity
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 code: 200,
 data: {
  message: "Вы успешно удалили город"
    }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите индитификатор города,Данного города не существует в списке,

 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 code: 400,
 data: {
   message: message
      }
 */


router.delete('/', function (req, res) {
    var db = req.db;
    var city_id = req.body.city_id

    if(city_id == null){
        res.json({
            code: 200,
            data: {
                message: "Укажите индитификатор города"
            }
        })
    }else{
        db.collection("city").findOne({ city_id: ObjectId(city_id) },function(err, result) {
            if (err) {
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            } else {
                if(result == null){
                    res.json({
                        code: 400,
                        data: {
                            message: "Данного города не существует в списке"
                        }
                    })
                }else{
                    db.collection("city").deleteOne({_id:ObjectId(city_id)}, function(err, obj) {
                        if (err){
                            res.json({
                                code: 400,
                                data: {
                                    message: "Ошибка соеденения с базой данных"
                                }
                            })
                        }else{
                            res.json({
                                code: 200,
                                data: {
                                    message: "Вы успешно удалили город"
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