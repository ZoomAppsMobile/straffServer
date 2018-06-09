var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/**
 * @api {get} /api/getFine Получение всех объявлений
 * @apiName Получение всех объявлений
 * @apiGroup Booking
 @apiDescription  Получаем список всех обявлений(штрафов).<br> <code>create_time: этот параметр передаем время в timestamp</code><br>
 <code>reviews: Список коментариев</code><br>
 <code>likes: Список лайков</code><br>
 * @apiSampleRequest  /api/getFine
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "code": 200,
    "data": {
        "fine": [
            {
                "_id": "5af986547dea70067cf428ac",
                "name_user": "ascascascasc",
                "middle_user": "ascascascascsacasc",
                "description_file": "assvasvasvasv",
                "image_file": [
                    {
                        "fieldname": "photos",
                        "originalname": "HB app comments.jpg",
                        "encoding": "7bit",
                        "mimetype": "image/jpeg",
                        "destination": "public/files/",
                        "filename": "photos-1526302292113.jpg",
                        "path": "public\\files\\photos-1526302292113.jpg",
                        "size": 504255
                    }
                ],
                "status": false,
                "create_time": 1526302292275,
                "reviews": [],
                "likes": []
            }
        ]
    }
}
 *
 * @apiError message Ошибка соеденения с базой данных

 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 code: 400,
 data: {
   message: message
      }
 */


router.get('/', function (req, res) {
    var db = req.db;

    db.collection('fine').aggregate([
        {
            $lookup:
                {
                    from: 'reviewsFine',
                    localField: '_id',
                    foreignField: 'fine_id',
                    as: 'reviews'
                }
        }, {
            $lookup:
                {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'fine_id',
                    as: 'likes'
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
            res.json({
                code: 200,
                data: {
                    fine: result
                }
            })
        }
    });


});
module.exports = router;