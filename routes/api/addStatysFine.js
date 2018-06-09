var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/**
 * @api {post} /api/addStatysFine Статус нарушения
 * @apiName ССтатус нарушения
 * @apiGroup Booking
 * @apiSampleRequest  /api/addStatysFine
 * @apiDescription Данный метод предоставляется для того что бы уведомить пользователей что данное нарушение на стадии рассмотрения или уже оштрафован
 * @apiParam {String} fine_id Индитификатор объявления/нарушения
 * @apiParam {Boolean} fine_statys true/false
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     code: 200,
 *     data: {
 *       message: "Статус успешно изменен"
 *       }
 *
 *
 * @apiError message Укажите индитификатор оъявления, Укажите статус оъясления, Статус должен быть true/false,Ошибка соеденения с базой данных
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     code: 400,
 *      data: {
 *       message: message
 *          }
 */




router.post('/', function (req, res) {
    var db = req.db;
    var fine_id = req.body.fine_id;
    var fine_statys = req.body.fine_statys;

    if (fine_id == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите индитификатор оъявления"
            }
        })
    } else if (fine_statys == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите статус оъясления"
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
                } else if (fine_statys !== "false" && fine_statys !== "true") {
                    res.json({
                        code: 400,
                        data: {
                            message: "Статус должен быть true/false"
                        }
                    })
                } else {
                    if (fine_statys !== "true") fine_statys = false
                    else if (fine_statys !== "false") fine_statys = true
                    var myquery = {_id: ObjectId(fine_id)};
                    var newvalues = {$set: {status: fine_statys}};
                    db.collection("fine").updateOne(myquery, newvalues, function (err, result) {
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
                                    message: "Статус успешно изменен"
                                }
                            })
                        }

                    });
                }

            }

        })
    }
});

module.exports = router;