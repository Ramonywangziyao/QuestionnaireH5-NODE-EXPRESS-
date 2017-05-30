/**
 * Created by Darth Wang on 5/25/2017.
 */

var typeAnsArr = Array(9).fill(0)
var quesTypes = localStorage.getItem("quesTypes").split(',')
var ansArr = localStorage.getItem("answerSequence").split(',')

function typeAnsGenerator(){
    var counter = 0
    quesTypes.forEach(function(ele){
        if(ansArr[counter++]=="true"){
            var index = parseInt(ele)-1
            typeAnsArr[index]+=1
        }
    })
    setTimeout(()=>{
        localStorage.setItem("typeAns",typeAnsArr)
        window.location = '/report'
    },1000)
}

typeAnsGenerator()
