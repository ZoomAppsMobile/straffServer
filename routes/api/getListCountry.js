var express = require("express");
var router = express.Router();

/**
 * @api {get} /api/getListCountries Получение стран[getListCountries]
 * @apiName Получение стран[getListCountries]
 * @apiGroup City and Country
 * @apiSampleRequest  /api/getListCountries
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 200,
     "data": {
         "countries": [
             {
                 "_id": "5af93e59854e2e268410751c",
                 "country_name": "казахстан"
             },
             {
                 "_id": "5af93e63854e2e268410751e",
                 "country_name": "америка"
             },
             {
                 "_id": "5afa67a7409b790bec8f473d",
                 "country_name": "россия"
             }
         ]
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных

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
    db.collection("country").find({}).toArray(function(err, result) {
        if (err) {
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
                    countries:result
                }
            })
        }

    });

});



module.exports = router;