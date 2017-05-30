/**
 * Created by Darth Wang on 5/23/2017.
 */

var lineReader
var typeLineReader
var questionList = []
module.exports = questionList

//load question file
let loadFile = function(){
    return new Promise(function(resolve,reject){
        lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('./questions.txt')
        })
        resolve("file loaded")
    })
}

let loadType = function(){
    return new Promise(function(resolve,reject){
        typeLineReader = require('readline').createInterface({
            input: require('fs').createReadStream('./types.txt')
        })
        resolve("file loaded")
    })
}

//initialize question array
let initQuestionArr = function(){
    return new Promise(function(resolve,reject){
        lineReader.on('line',function (line) {
            var questionInstance = new Question()
            questionInstance.questionText = line
            questionList.push(questionInstance)
        })

        setTimeout(() => {
            if(questionList.length>0){
                resolve("questions inited")
            }
        },50)
    })
}

let initQuestTypes = function(){
    return new Promise(function(resolve,reject){
        var counter = 0
        typeLineReader.on('line',function (line) {
            if(questionList[counter]!=undefined){
                questionList[counter++].questionType = line
            } else {
                console.log("end")
                return
            }
        })
        setTimeout(() => {
                resolve("questions types inited")
        },10)
    })
}

function Question(){
    return {
        questionText:"",
        questionType:""
    }
}

//pip promises
loadFile().then(loadType()).then(initQuestionArr()).then(initQuestTypes()).then(function(){
    console.log("Questions loaded")
})








