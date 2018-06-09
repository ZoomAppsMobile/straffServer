var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/**
 * @api {post} /api/addReviewsFine Отзывы о нарушении
 * @apiName Отзывы о нарушении
 * @apiGroup Reviews
 * @apiSampleRequest  /api/addReviewsFine
 *
 * @apiHeader {String} _id Индитификатор пользователя который создает объявление
 * @apiParam {String} text_reviews Текст отзыва

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 code: 200,
 data: {
         message: "Ваш отзыв успешно опубликован"
         }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите индитификатор объявления,Данный индитификатор объявления возможно устарел
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 code: 400,
 data: {
         message: message
            }
 */

router.post('/', function (req, res) {
    var db = req.db;
    var _id = req.header("_id");
    var textReviews = req.body.text_reviews;
    // var name_user = req.body.name_user;
    // var middle_user = req.middle_user;

    if (_id == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите индитификатор объявления"
            }
        })

    } else if (textReviews == null || textReviews.toString().length <= 12) {
        res.json({
            code: 400,
            data: {
                message: "Текст отзыва должен быть не менее 12 символов"
            }
        })
    } else {

        db.collection("fine").findOne({_id: ObjectId(_id)}, function (err, result) {
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
                            message: "Данный индитификатор объявления возможно устарел"
                        }
                    })
                } else {

                    var objReviewsFine = {
                        name_user: result.name_user,
                        middle_user: result.middle_user,
                        text_reviews: textReviews,
                        create_time:Date.now(),
                        fine_id: ObjectId(_id)

                    }
                    db.collection("reviewsFine").insertOne(objReviewsFine, function (err) {
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
                                    message: "Ваш отзыв успешно опубликован"
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