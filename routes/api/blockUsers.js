var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var patt = new RegExp("true/fasle");



/**
 * @api {post} /api/blockUsers Блокировка пользователей
 * @apiName Блокировка пользователей
 * @apiGroup User
 * @apiSampleRequest  /api/blockUsers
 *
 * @apiHeader {String} _id Индитификатор пользователя которого хотите заблокировать
 * @apiParam {Boolean} value_block Тип блокировки <code>true</code> заблокировать <code>false</code> разблокировать

 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 code: 200,
 data: {
  message: "Успешно!"
    }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите индитификатор пользователя,Данный индитификатор пользователя возможно устарел,
 *
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
    var value_block = req.body.value_block;



    if (_id == null) {
        res.json({
            code: 400,
            data: {
                message: "Укажите индитификатор пользователя"
            }
        })
        console.log("Укажите нндитификатор пользователя")
    }else if(value_block == null){
        res.json({
            code: 400,
            data: {
                message: "Укажите тип блокировки true/false"
            }
        })
        console.log("Укажите нндитификатор пользователя")
    } else {
        if (value_block === "true") {
            value_block = true
        } else {
            value_block = false
        }

        db.collection("users").findOne({_id: ObjectId(_id)}, function (err, result) {
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
                            message: "Данный индитификатор пользователя возможно устарел"
                        }
                    })
                } else {
                    var myquery = {_id: ObjectId(_id)};
                    var newvalues = {$set: {block_user: value_block}};
                    db.collection("users").updateOne(myquery, newvalues, function (err, result) {
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
                                    message: "Успешно!"
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