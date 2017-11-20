var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;



router.get('/', function(req, res, next) {


    //兜库
    mongoCt.connect('mongodb://127.0.0.1:27017/meilihui', (err, db) => {

        let indexlist = db.collection('indexlist');
        indexlist.find().toArray((err, result) => {

            //console.log(result);
            res.indexlist = result;
            next();

        });
    });
});
router.get('/', function(req, res, next) {

    // if (!req.session["user_id"]) {
    //     res.render("index", {});
    // } else {
    //兜库
    mongoCt.connect('mongodb://127.0.0.1:27017/meilihui', (err, db) => {

        let user = db.collection('user');
        let user_id = req.session["user_id"];
        user.find({ id: user_id }).toArray((err, result) => {
            //console.log(req.session["user_id"]);
            //console.log(user_id);
            //console.log(err);
            console.log(result);
            console.log(res.indexlist);
            res.send({
                user: result[0],
                indexlist: res.indexlist
            })

        });

    });
    //}
});




module.exports = router;

// let express = require("express");

// module.exports = function(db) {
//     let router = express.Router();
//     router.get("/", (req, res) => {
//         if (!req.session["user_id"]) {
//             res.render("index.ejs", {});
//         } else {
//             let sql = `SELECT * FROM user WHERE id="${req.session['user_id']}"`;
//             db.query(sql, (err, data) => {
//                 console.log(data);
//                 if (data.length > 0) {
//                     res.render("index.ejs", {
//                         user: data[0]
//                     });
//                 }
//             })
//         }


//     });



//     return router;
// }