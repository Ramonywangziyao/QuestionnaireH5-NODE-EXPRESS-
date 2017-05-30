/**
 * Created by Darth Wang on 5/25/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('trans');
});

module.exports = router;
