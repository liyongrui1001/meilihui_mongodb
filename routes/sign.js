var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;



router.get('/', function(req, res, next) {
    res.render("sign", {});

});
router.post('/submit', function(req, res, next) {
    //兜库
    mongoCt.connect('mongodb://127.0.0.1:27017/meilihui', (err, db) => {

        let user = db.collection('user');
        user.find({ username: req.body.username }).toArray((err, result) => {
            //console.log(result);
            if (!err) {
                if (result.length > 0) {
                    res.send({ "err": 1, "msg": "用户名已存在" });
                } else {
                    let data = { id: Math.random(), username: req.body.username, password: req.body.password };
                    user.insertOne(data, (err, result) => {
                        if (!err) {
                            res.send({ "err": 0, "msg": "注册成功" });
                        }
                    });
                }
            }
        });

    });

});
module.exports = router;