/**
 * Created by Darth Wang on 5/23/2017.
 */
var express = require('express');
var router = express.Router();
var quest = null

//load questions
let loadQuestions = function(){
    return new Promise(function(resolve,reject){
        quest = require('../public/javascripts/Question.js')
        setTimeout(()=>{
            if(quest.length>0){
                resolve("questions loaded")
            }
        },5)
    })
}

loadQuestions()

//render to front end
router.get('/', function(req, res, next) {
    res.render('quest',{
        question:JSON.stringify(quest)
    });
});

module.exports = router;
