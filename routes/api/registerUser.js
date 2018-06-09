var express = require("express");
var router = express.Router()
var multer = require('multer');
const https = require('https');
var regex = new RegExp('/^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$/');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatars/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
});
var upload = multer({storage: storage});
/**
 * @api {post} /api/registerUser Регистрация пользователей
 * @apiName Регистрация пользователей
 * @apiGroup User
 * @apiSampleRequest  /api/registerUser
 @apiDescription После успешной регистрации <code>уходит sms-сообщение на указанный номер телефона</code> после чего данный код нужно отправить
 на <code>/api/sendConfirmantionCode</code> и после чего статус <code>activateAccount</code> изменится на true
 * @apiParam {String} phone_user Номер телефона пользователя<br>
 * @apiParam {String} name_user Имя пользователя<br>
 * @apiParam {String} surname_user Фамилия пользователя<br>
 * @apiParam {String} middle_user Отчество пользователя<br>
 * @apiParam {String} city_user Город пользователя<br>
 * @apiParam {String} country_user Страна пользователя<br>
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
     "code": 400,
     "data": {
         "message": "Вы успешно зарегистрировались вам отправлен код в виде смс для потверждения аккаунта"
     }
 }
 *
 * @apiError message Ошибка соеденения с базой данных,Укажите валидный  номер телфона<br>
 * Укажите имя пользователя,Укажите отчество пользователя<br>
 Укажите Вашу страну<br>
 Укажите Ваш город<br>
 Ошибка при отправке sms<br>
 Данный пользователь уже зарегистрирован
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

router.post('/', upload.single('avatar'), function (req, res) {
    var db = req.db;
    var name_user = req.body.name_user;
    var surname_user = req.body.surname_user;
    var middle_user = req.body.middle_user;
    var phone_user = req.body.phone_user;
    var city_user = req.body.city_user;
    var country_user = req.body.country_user;
    // !(phone_user === regex)
    if (phone_user == null || phone_user.toString().length < 11) {
        res.json({
            code: 400,
            data: {
                message: "Укажите валидный  номер телфона"
            }
        })
    }
    else if (name_user == null || name_user.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите имя пользователя"
            }
        })
    } else if (surname_user == null || surname_user.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите фамилию пользователя"
            }
        })
    } else if (middle_user == null || middle_user.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите отчество пользователя"
            }
        })

    } else if (country_user == null || country_user.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите Вашу страну"
            }
        })
    } else if (city_user == null || city_user.toString().length < 3) {
        res.json({
            code: 400,
            data: {
                message: "Укажите Ваш город"
            }
        })
    } else {
        var objUsers = {
            phone_user: phone_user,
            name_user: name_user,
            surname_user: surname_user,
            middle_user: middle_user,
            city_user: city_user,
            country_user: country_user,
            block_user: false,
            rating_user: 0,
            create_time: Date.now(),
            avatar_user: req.file,
            activateAccount: false,
            date_registeration: Date.now(),
        };


        db.collection("users").findOne({phone_user: phone_user}, function (err, result) {
            if (err) {
                res.json({
                    code: 400,
                    data: {
                        message: "Ошибка соеденения с базой данных"
                    }
                })
            } else {
                if (result == null) {
                    db.collection('users').insertOne(objUsers, function (err) {
                        if (err) {
                            res.json({
                                code: 400,
                                data: {
                                    message: "Ошибка соеденения с базой данных"
                                }
                            })
                        } else {
                            var codeConfirmation = Math.floor(Math.random() * 90000) + 10000

                            var objConfirmantion = {
                                phone_user: phone_user,
                                confirmation_code: codeConfirmation
                            }
                            db.collection("confirmantionCodes").insertOne(objConfirmantion, function (err) {
                                if (err) {
                                    res.json({
                                        code: 400,
                                        data: {
                                            message: "Ошибка соеденения с базой данных"
                                        }
                                    })
                                } else {
                                    // https.get('https://smsc.kz/sys/send.php?login=fineApps&psw=UBW983279PWOEPwooedk382&phones=' + phone_user + '&mes=' + codeConfirmation, (resp) => {
                                    //     resp.on('end', () => {
                                    //
                                    //
                                    //     });
                                    //
                                    // }).on("error", (err) => {
                                    //     res.json({
                                    //         code: 400,
                                    //         data: {
                                    //             message: "Ошибка при отправке sms"
                                    //         }
                                    //     })
                                    // });

                                    res.json({
                                        code: 200,
                                        data: {
                                            message: "Вы успешно зарегистрировались вам отправлен код в виде смс для потверждения аккаунта"
                                        }
                                    })
                                }

                            })


                        }
                    })
                } else {
                    res.json({
                        code: 400,
                        data: {
                            message: "Данный пользователь уже зарегистрирован"
                        }
                    })


                }
            }
        });


    }
    // function phonenumber(text) {
    //     var phoneno = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    //     if((text.value.match(phoneno))){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }


});

module.exports = router;