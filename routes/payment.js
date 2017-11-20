var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express 脚手架(cli)abc123' });
    res.render("payment", {});
    //兜库
    // mongoCt.connect('mongodb://127.0.0.1:27017/meilihui',(err,db)=>{

    //   let blog = db.collection('blog');
    //   blog.find({}).skip(parseInt(req.query.start)).limit(parseInt(req.query.count)).toArray((err,result)=>{
    //     // console.log(result);
    //     res.send(result);//反数据给前端
    //   });

    // });

});



module.exports = router;