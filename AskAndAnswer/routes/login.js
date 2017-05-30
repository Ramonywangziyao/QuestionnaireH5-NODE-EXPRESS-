/**
 * Created by Darth Wang on 5/26/2017.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;
