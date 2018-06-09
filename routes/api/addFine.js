var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
});
var upload = multer({storage: storage});



/**
 * @api {post} /api/addFile Создание штрафов
 * @apiName Создание штрафов
 * @apiGroup Booking
 * @apiSampleRequest  /api/addFile
 *
 * @apiHeader {String} _id Индитификатор пользователя который создает объявление
 * @apiParam {String} description_file Описание нарушения
 * @apiParam {File} photos Фото наружение минимальное количество 1, максимальное 3
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
       code: 200,
       data: {
         message: "Вы успешно опубликовали нарушение"
         }
 *
 * @apiError message Ошибка соеденения с базой данных, Укажите интификатор пользователя, Опишите нарушение,
 Данный индитификатор пользовате возможно устарел, Обязательно выбирите изображение нарушения
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
       code: 400,
       data: {
         message: message
            }
 */



router.post('/', upload.array('photos', 3), function (req, res, next) {
    var db = req.db;
    var _id = req.header("_id");
    var description_file = req.body.description_file;
    if(_id == null){
        res.json({
            code: 400,
            data: {
                message: "Укажите интификатор пользователя"
            }
        })
    }else if(description_file == null || description_file.toString().length <= 12){
        res.json({
            code: 400,
            data: {
                message: "Опишите нарушение"
            }
        })
    }else {

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
                            message: "Данный индитификатор пользовате возможно устарел"
                        }
                    })
                } else if(req.files.toString().length == 0){
                    res.json({
                        code: 400,
                        data: {
                            message: "Обязательно выбирите изображение нарушения"
                        }
                    })
                } else {
                    var objAddFine = {
                        name_user: result.name_user,
                        middle_user: result.middle_user,
                        description_file: description_file,
                        image_file:req.files,
                        status:false,
                        create_time:Date.now(),
                    };

                    db.collection("fine").insertOne(objAddFine, function (err) {
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
                                    message: "Вы успешно опубликовали нарушение"
                                }
                            })
                        }
                    })
                }
            }
        })
    }
});

module.exports = router;