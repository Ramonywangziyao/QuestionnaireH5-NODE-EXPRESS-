/**
 * Created by Darth Wang on 5/26/2017.
 */
var express = require('express');
var router = express.Router();
var url = require('url')
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/askandanswer');
var responseData = new UsersJSONResponse()
/* GET data page. */
router.get('/', function(req, res, next) {
    var query = url.parse(req.url).query
    var userJSON
    if (query) {
        try {
            userJSON = JSON.parse(decodeURIComponent(query))
            var len = Object.keys(userJSON).length
            if (len == 10) {
                insertToDatabase(userJSON)
            } else if (len == 2) {
                if (userJSON.admin == "gomad2016" && userJSON.password == "Vh7BuGke") {
                    respondDatabaseAll().then(() => {
                        res.status(200).send({
                            success: true
                        })
                    })
                } else {
                    res.status(200).send({
                        success: false
                    })
                }

            }
        } catch (e) {
            console.log("error")
        }
    }
})

let insertToDatabase = (data) => {
    var collection = db.get("user")
    //collection.find({ name: data.name},function(err,user){
    //if(user.length>0){
    //    console.log("exist")
    //}else{
    collection.insert(data, function(err, doc) {
        if (err) {
            console.log(err)
        }
    })
    //  }
    //})
}

let respondDatabaseAll = () => {
    return new Promise(function(resolve, reject) {
        var collection = db.get("user")
        var cursor = collection.find()
        var allusers = []
        responseData.data = allusers
        cursor.each(function(item) {
            allusers.push(item)
        })

        setTimeout(() => {
            if (allusers.length > 0) {
                resolve("pulled")
            }
        }, 1000)
    })
}

function UsersJSONResponse() {
    return {
        "data": []
    }
}

module.exports = router;
module.exports.data = responseData;
