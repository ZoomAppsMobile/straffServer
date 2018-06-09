var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/**
 * @api {post} /api/addLikes Лайки для объявлений
 * @apiName Лайки для объвлений
 * @apiDescription Если API вернул статус <code>true</code> значит вы поставили лайк если <code>false</code> значит убрали лайк
 * @apiGroup Booking
 * @apiSampleRequest  /api/addLikes
 *
 * @apiHeader {String} _id Индитификатор пользователя который ставит лайк
 * @apiParam {String} fine_id Индитификатор объявления которому ставится лайк
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 200,
     "data": {
         "message": true/false
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите интификатор пользователя,Укажите интификатор обявления,
 Данного пользователя не существует,Данного оъявления не существует
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



router.post('/', function (req, res) {
    var db = req.db;
    var user_id = req.header("_id");
    var fine_id = req.body.fine_id;

    if (user_id == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите интификатор пользователя"
            }
        })
    } else if (fine_id == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите интификатор обявления"
            }
        })
    } else
        {
            db.collection("users").findOne({_id: ObjectId(user_id)}, function (err, resultUser) {
                if (err) {
                    res.json({
                        code: 400,
                        data: {
                            message: "Ошибка соеденения с базой данных"
                        }
                    })
                } else {
                    if (resultUser == null) {
                        res.json({
                            code: 400,
                            data: {
                                message: "Данного пользователя не существует"
                            }
                        })
                    } else {
                        db.collection("fine").findOne({_id: ObjectId(fine_id)}, function (err, resultFine) {
                            if (err) {
                                res.json({
                                    code: 400,
                                    data: {
                                        message: "Ошибка соеденения с базой данных"
                                    }
                                })
                            } else {
                                if (resultFine == null) {
                                    res.json({
                                        code: 400,
                                        data: {
                                            message: "Данного оъявления не существует"
                                        }
                                    })
                                } else {
                                    db.collection("likes").findOne({phone_user: resultUser.phone_user}, function (err, resultFind) {
                                        if (resultFind == null) {
                                            var likesObj = {
                                                name_user: resultUser.name_user,
                                                middle_user: resultUser.middle_user,
                                                phone_user: resultUser.phone_user,
                                                fine_id: ObjectId(resultFine._id),
                                                user_id:ObjectId(resultUser._id)

                                            };
                                            db.collection("likes").insertOne(likesObj, function (err) {
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
                                                            message: true
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                            db.collection("likes").deleteOne({user_id:resultUser._id}, function (err) {
                                                if(err){
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
                                                            message: false
                                                        }
                                                    })
                                                }
                                            })






                                        }

                                    });


                                }
                            }
                        })
                    }
                }
            })
        }


});

module.exports = router;