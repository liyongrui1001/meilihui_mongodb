var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;



router.get('/', function(req, res) {
    res.render("index", {});

});