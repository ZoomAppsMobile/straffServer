var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/**
 * @api {get} /api/userInfo Информация о пользователеee
 * @apiName Информация о пользователеee
 * @apiGroup User
 * @apiSampleRequest  /api/userInfo
 * @apiDescription Данный метод даем полную информацию о пользователе по его индитификатору
 * @apiHeader {String} _id Индитификатор пользователя
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 200,
     "data": {
         "user": [
             {
                 "_id": "5af589c2ce55b8027c927c72",
                 "phone_user": "87054503916",
                 "name_user": "ascascascasc",
                 "surname_user": "ascascsacasc",
                 "middle_user": "ascascascascsacasc",
                 "city_user": "Алматы",
                 "country_user": "Казахстан",
                 "block_user": true,
                 "rating_user": 0,
                 "create_time": 1526041026485,
                 "avatar_user": null,
                 "activateAccount": false,
                 "date_registeration": 1526041026485,
                 "reviews": []
             }
         ]
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных,Укажите индитификатор пользователя<br>
 * Данного пользователя не существует<br>

 *
 *
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
    var _id = req.header("_id");

    if (_id == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите индитификатор пользователя"
            }
        })
    } else {
        db.collection('users').aggregate([
            {
                $match:
                    {_id: ObjectId(_id)}
            },
            {
                $lookup:
                    {
                        from: 'reviewsUser',
                        localField: '_id',
                        foreignField: 'user_id',
                        as: 'reviews'
                    }
            }


        ]).toArray(function (err, result) {
            if (err) {
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            } else {

                if (result.length == 0) {
                    res.json({
                        code: 400,
                        data: {
                            message: "Данного пользователя не существует"
                        }
                    })
                } else {
                    res.json({
                        code: 200,
                        data: {
                            user: result
                        }
                    })
                }
            }
        });
    }


});
module.exports = router;