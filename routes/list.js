var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;

router.get('/', function(req, res, next) {
    //兜库
    mongoCt.connect('mongodb://127.0.0.1:27017/meilihui', (err, db) => {

        let goodslist = db.collection('goodslist');
        goodslist.find({}).toArray((err, result) => {
            //console.log(result);
            res.render("list", {
                goods: result
            }); //反数据给前端
        });

    });

});



module.exports = router;