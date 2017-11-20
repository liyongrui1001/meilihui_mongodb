var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;

router.get('/', function(req, res, next) {
    res.render("login", {});
});
router.post('/submit', function(req, res, next) {
    //兜库
    mongoCt.connect('mongodb://127.0.0.1:27017/meilihui', (err, db) => {

        let user = db.collection('user');
        user.find({ username: req.body.username }).toArray((err, result) => {
            //console.log(result);
            if (!err) {
                if (result.length > 0) {
                    if (result[0].password == req.body.password) {
                        req.session["user_id"] = result[0].id;
                        //console.log(req.session["user_id"], result[0].id);
                        res.send({ "err": 0, "msg": "登陆成功" });
                    } else {
                        res.send({ "err": 1, "msg": "密码有误" });
                    }
                } else {
                    res.send({ "err": 1, "msg": "用户名不存在" });
                }
            }
        });

    });

})
module.exports = router;