/**
 * Created by Darth Wang on 5/25/2017.
 */
var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
    res.send("loaderio-51c0dca03d2df14e8f709a9e2ce2a714");
});

module.exports = router;
