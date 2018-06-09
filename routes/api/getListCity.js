var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/**
 * @api {get} /api/getListCity Получение городов
 * @apiName Получение городов
 * @apiGroup City and Country
 * @apiParam {String} country_id Индитификатор страны по которуму получаем список городов привязанных к донной стране
 * @apiSampleRequest  /api/getListCity
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 200,
     "data": {
         "cities": [
             {
                 "_id": "5af93e86854e2e268410751f",
                 "city_name": "актубе",
                 "country_id": "5af93e59854e2e268410751c"
             },
             {
                 "_id": "5af93e92854e2e2684107520",
                 "city_name": "алматы",
                 "country_id": "5af93e59854e2e268410751c"
             },
             {
                 "_id": "5af93e9b854e2e2684107521",
                 "city_name": "тараз",
                 "country_id": "5af93e59854e2e268410751c"
             }
         ]
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите интификатор страны

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
    var country_id = req.query.country_id;


    if(country_id == null){
        res.json({
            code: 400,
            data: {
                message: "Укажите интификатор страны"
            }
        })
    }else{
        db.collection("city").find({ country_id: ObjectId(country_id) }).toArray(function(err, result) {
            if (err){
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            }else{

                if(result.length == 0){
                    res.json({
                        code: 200,
                        data: {
                            message: "Города в данной стране нет"
                        }
                    })
                }else{
                    res.json({
                        code: 200,
                        data: {
                            cities: result
                        }
                    })
                }


            }

        });
    }


});

module.exports = router;