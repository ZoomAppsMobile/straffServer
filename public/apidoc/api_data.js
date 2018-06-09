define({ "api": [
  {
    "type": "post",
    "url": "/api/addFile",
    "title": "Создание штрафов",
    "name": "________________",
    "group": "Booking",
    "sampleRequest": [
      {
        "url": "/api/addFile"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Индитификатор пользователя который создает объявление</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description_file",
            "description": "<p>Описание нарушения</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "photos",
            "description": "<p>Фото наружение минимальное количество 1, максимальное 3</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   code: 200,\n   data: {\n     message: \"Вы успешно опубликовали нарушение\"\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите интификатор пользователя, Опишите нарушение, Данный индитификатор пользовате возможно устарел, Обязательно выбирите изображение нарушения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n   code: 400,\n   data: {\n     message: message\n        }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/addFine.js",
    "groupTitle": "Booking"
  },
  {
    "type": "post",
    "url": "/api/addStatysFine",
    "title": "Статус нарушения",
    "name": "_________________",
    "group": "Booking",
    "sampleRequest": [
      {
        "url": "/api/addStatysFine"
      }
    ],
    "description": "<p>Данный метод предоставляется для того что бы уведомить пользователей что данное нарушение на стадии рассмотрения или уже оштрафован</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fine_id",
            "description": "<p>Индитификатор объявления/нарушения</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "fine_statys",
            "description": "<p>true/false</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\ncode: 200,\ndata: {\n  message: \"Статус успешно изменен\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Укажите индитификатор оъявления, Укажите статус оъясления, Статус должен быть true/false,Ошибка соеденения с базой данных</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\ncode: 400,\n data: {\n  message: message\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/addStatysFine.js",
    "groupTitle": "Booking"
  },
  {
    "type": "post",
    "url": "/api/addLikes",
    "title": "Лайки для объявлений",
    "name": "___________________",
    "description": "<p>Если API вернул статус <code>true</code> значит вы поставили лайк если <code>false</code> значит убрали лайк</p>",
    "group": "Booking",
    "sampleRequest": [
      {
        "url": "/api/addLikes"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Индитификатор пользователя который ставит лайк</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fine_id",
            "description": "<p>Индитификатор объявления которому ставится лайк</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 200,\n    \"data\": {\n        \"message\": true/false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите интификатор пользователя,Укажите интификатор обявления, Данного пользователя не существует,Данного оъявления не существует</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/likes.js",
    "groupTitle": "Booking"
  },
  {
    "type": "get",
    "url": "/api/getFine",
    "title": "Получение всех объявлений",
    "name": "_________________________",
    "group": "Booking",
    "description": "<p>Получаем список всех обявлений(штрафов).<br> <code>create_time: этот параметр передаем время в timestamp</code><br> <code>reviews: Список коментариев</code><br> <code>likes: Список лайков</code><br></p>",
    "sampleRequest": [
      {
        "url": "/api/getFine"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"code\": 200,\n    \"data\": {\n        \"fine\": [\n            {\n                \"_id\": \"5af986547dea70067cf428ac\",\n                \"name_user\": \"ascascascasc\",\n                \"middle_user\": \"ascascascascsacasc\",\n                \"description_file\": \"assvasvasvasv\",\n                \"image_file\": [\n                    {\n                        \"fieldname\": \"photos\",\n                        \"originalname\": \"HB app comments.jpg\",\n                        \"encoding\": \"7bit\",\n                        \"mimetype\": \"image/jpeg\",\n                        \"destination\": \"public/files/\",\n                        \"filename\": \"photos-1526302292113.jpg\",\n                        \"path\": \"public\\\\files\\\\photos-1526302292113.jpg\",\n                        \"size\": 504255\n                    }\n                ],\n                \"status\": false,\n                \"create_time\": 1526302292275,\n                \"reviews\": [],\n                \"likes\": []\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\ncode: 400,\ndata: {\n  message: message\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/getFine.js",
    "groupTitle": "Booking"
  },
  {
    "type": "delete",
    "url": "/api/deleteCountry",
    "title": "Удаление стран",
    "name": "______________",
    "group": "City_and_Country",
    "description": "<p><code>ВНИМАНИЕ!!!</code> Если вы удаляете страну то и все годора принадлежащие данной стране тоже удаляються</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_id",
            "description": "<p>Индитификатор страны</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/deleteCountry"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\ncode: 200,\ndata: {\n message: \"Вы успешно удалили страну\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите индитификатор города,Данной страны не существует в списке,</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\ncode: 400,\ndata: {\n  message: message\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/deleteCountry.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "delete",
    "url": "/api/deleteCity",
    "title": "Удаление городов",
    "name": "_______________",
    "group": "City_and_Country",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_id",
            "description": "<p>Индитификатор города</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/deleteCity"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\ncode: 200,\ndata: {\n message: \"Вы успешно удалили город\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите индитификатор города,Данного города не существует в списке,</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\ncode: 400,\ndata: {\n  message: message\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/deleteCity.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "post",
    "url": "/api/addCountry",
    "title": "Добавление стран",
    "name": "________________",
    "group": "City_and_Country",
    "sampleRequest": [
      {
        "url": "/api/addCountry"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_name",
            "description": "<p>Название страны</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n code: 200,\n data: {\n   message: \"Вы успешно добавили страну\"\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\ncode: 400,\ndata: {\n       message: \"Ошибка соеденения с базой данных\"\n          }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/addCountry.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "get",
    "url": "/api/getListCity",
    "title": "Получение городов",
    "name": "_________________",
    "group": "City_and_Country",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_id",
            "description": "<p>Индитификатор страны по которуму получаем список городов привязанных к донной стране</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/getListCity"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 200,\n    \"data\": {\n        \"cities\": [\n            {\n                \"_id\": \"5af93e86854e2e268410751f\",\n                \"city_name\": \"актубе\",\n                \"country_id\": \"5af93e59854e2e268410751c\"\n            },\n            {\n                \"_id\": \"5af93e92854e2e2684107520\",\n                \"city_name\": \"алматы\",\n                \"country_id\": \"5af93e59854e2e268410751c\"\n            },\n            {\n                \"_id\": \"5af93e9b854e2e2684107521\",\n                \"city_name\": \"тараз\",\n                \"country_id\": \"5af93e59854e2e268410751c\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите интификатор страны</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/getListCity.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "post",
    "url": "/api/addCity",
    "title": "Добавление городов",
    "name": "__________________",
    "group": "City_and_Country",
    "sampleRequest": [
      {
        "url": "/api/addCountry"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_name",
            "description": "<p>Название города</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_id",
            "description": "<p>Индитификатор страны</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\ncode: 200,\ndata: {\n  message: \"Вы успешно добавили город\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n code: 400,\n data: {\n    message: \"Ошибка соеденения с базой данных\"\n       }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/addCity.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "get",
    "url": "/api/updateCity",
    "title": "Обновление городов[updateCity]",
    "name": "___________________updateCity_",
    "group": "City_and_Country",
    "sampleRequest": [
      {
        "url": "/api/updateCity"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_name_current",
            "description": "<p>Старое название города</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_name_new",
            "description": "<p>Новое название города</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": \"Вы успешно изменили город\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных<br> Укажите текущее название города<br> Укажите название нового города<br> Данного города нет в списке<br> Данного города нет в списке<br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 200,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/updateCity.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "get",
    "url": "/api/updateCountry",
    "title": "Обновление стран[updateCountry]",
    "name": "_________________updateCountry_",
    "group": "City_and_Country",
    "sampleRequest": [
      {
        "url": "/api/updateCountry"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_name_current",
            "description": "<p>Текущее название страны</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_name_new",
            "description": "<p>Новое название страны</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 200,\n    \"data\": {\n        \"message\": \"Вы успешно изменили страну\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных<br> Укажите текущее название страны<br> Укажите название нового страны<br> Данного страны нет в списке<br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/updateCountry.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "get",
    "url": "/api/getListCountries",
    "title": "Получение стран[getListCountries]",
    "name": "________________getListCountries_",
    "group": "City_and_Country",
    "sampleRequest": [
      {
        "url": "/api/getListCountries"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 200,\n    \"data\": {\n        \"countries\": [\n            {\n                \"_id\": \"5af93e59854e2e268410751c\",\n                \"country_name\": \"казахстан\"\n            },\n            {\n                \"_id\": \"5af93e63854e2e268410751e\",\n                \"country_name\": \"америка\"\n            },\n            {\n                \"_id\": \"5afa67a7409b790bec8f473d\",\n                \"country_name\": \"россия\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/getListCountry.js",
    "groupTitle": "City_and_Country"
  },
  {
    "type": "post",
    "url": "/api/addReviewsFine",
    "title": "Отзывы о нарушении",
    "name": "__________________",
    "group": "Reviews",
    "sampleRequest": [
      {
        "url": "/api/addReviewsFine"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Индитификатор пользователя который создает объявление</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text_reviews",
            "description": "<p>Текст отзыва</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\ncode: 200,\ndata: {\n        message: \"Ваш отзыв успешно опубликован\"\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите индитификатор объявления,Данный индитификатор объявления возможно устарел</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\ncode: 400,\ndata: {\n        message: message\n           }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/addReviewsFine.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "post",
    "url": "/api/addReviewsUser",
    "title": "Отзывы о пользователе",
    "name": "_____________________",
    "group": "Reviews",
    "sampleRequest": [
      {
        "url": "/api/addReviewsUser"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Индитификатор пользователя который создает объявление</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text_reviews",
            "description": "<p>Текст отзыва</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  code: 200,\n  data: {\n     message: \"Ваш отзыв успешно опубликован\"\n     }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите индитификатор объявления,Текст отзыва должен быть не менее 12 символов, Данный индитификатор пользователя возможно устарел</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n  code: 400,\n  data: {\n     message: message\n       }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/addReviewsUser.js",
    "groupTitle": "Reviews"
  },
  {
    "type": "post",
    "url": "/api/blockUsers",
    "title": "Блокировка пользователей",
    "name": "________________________",
    "group": "User",
    "sampleRequest": [
      {
        "url": "/api/blockUsers"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Индитификатор пользователя которого хотите заблокировать</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "value_block",
            "description": "<p>Тип блокировки <code>true</code> заблокировать <code>false</code> разблокировать</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\ncode: 200,\ndata: {\n message: \"Успешно!\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных, Укажите индитификатор пользователя,Данный индитификатор пользователя возможно устарел,</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\ncode: 400,\ndata: {\n  message: message\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/blockUsers.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/registerUser",
    "title": "Регистрация пользователей",
    "name": "_________________________",
    "group": "User",
    "sampleRequest": [
      {
        "url": "/api/registerUser"
      }
    ],
    "description": "<p>После успешной регистрации <code>уходит sms-сообщение на указанный номер телефона</code> после чего данный код нужно отправить на <code>/api/sendConfirmantionCode</code> и после чего статус <code>activateAccount</code> изменится на true</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_user",
            "description": "<p>Номер телефона пользователя<br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name_user",
            "description": "<p>Имя пользователя<br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname_user",
            "description": "<p>Фамилия пользователя<br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "middle_user",
            "description": "<p>Отчество пользователя<br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_user",
            "description": "<p>Город пользователя<br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country_user",
            "description": "<p>Страна пользователя<br></p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": \"Вы успешно зарегистрировались вам отправлен код в виде смс для потверждения аккаунта\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных,Укажите валидный  номер телфона<br> Укажите имя пользователя,Укажите отчество пользователя<br> Укажите Вашу страну<br> Укажите Ваш город<br> Ошибка при отправке sms<br> Данный пользователь уже зарегистрирован</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/registerUser.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/userInfo",
    "title": "Информация о пользователеee",
    "name": "_________________________ee",
    "group": "User",
    "sampleRequest": [
      {
        "url": "/api/userInfo"
      }
    ],
    "description": "<p>Данный метод даем полную информацию о пользователе по его индитификатору</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Индитификатор пользователя</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"code\": 200,\n    \"data\": {\n        \"user\": [\n            {\n                \"_id\": \"5af589c2ce55b8027c927c72\",\n                \"phone_user\": \"87054503916\",\n                \"name_user\": \"ascascascasc\",\n                \"surname_user\": \"ascascsacasc\",\n                \"middle_user\": \"ascascascascsacasc\",\n                \"city_user\": \"Алматы\",\n                \"country_user\": \"Казахстан\",\n                \"block_user\": true,\n                \"rating_user\": 0,\n                \"create_time\": 1526041026485,\n                \"avatar_user\": null,\n                \"activateAccount\": false,\n                \"date_registeration\": 1526041026485,\n                \"reviews\": []\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>Ошибка соеденения с базой данных,Укажите индитификатор пользователя<br> Данного пользователя не существует<br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 404 Not Found\n{\n    \"code\": 400,\n    \"data\": {\n        \"message\": message\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/userInfo.js",
    "groupTitle": "User"
  }
] });
