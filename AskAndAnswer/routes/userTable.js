/**
 * Created by Darth Wang on 5/26/2017.
 */
var express = require('express');
var dataHandler = require('./dataHandler');
var router = express.Router();

/* GET ut listing. */
router.get('/', function(req, res, next) {
    res.render('userTable',{requestedData:dataHandler.data});
});

module.exports = router;
