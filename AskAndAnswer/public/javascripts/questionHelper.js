/**
 * Created by Darth Wang on 5/24/2017.
 */

var falseButton = document.getElementById("false")
var trueButton = document.getElementById("true")
var progressText = document.getElementById("progressText")
var progress = document.getElementById("progress")
var lastButton = document.getElementById("last")
var questionTitle = document.getElementById("question-text")
var buttons = document.getElementsByTagName("button")
var counter = 0
var end = false
var ansArray = Array()
var quesObj = JSON.parse(questions)
var types = Array()

progress.style.width = "0%"
Array.prototype.forEach.call(buttons,function(button){
    button.addEventListener("click",function(){
        questionTitle.style.animation = "leftleft 1s forwards"
        setTimeout(()=>{
            questionTitle.style.animation = "left 1s forwards"
        },500)
    })
})

falseButton.addEventListener("click", function(){
    setTimeout(()=>{
        updateAnswers(false,counter)
        switchQuestions(true)
    },500)
});

trueButton.addEventListener("click", function(){
    setTimeout(()=>{
        updateAnswers(true,counter)
        switchQuestions(true)
    },500)
});

lastButton.addEventListener("click", function(){
    setTimeout(()=>{
        switchQuestions(false)
    },500)
});

// called when switching questions. forward or backward
var switchQuestions = (forward)=>{
    //end of questions
    if(types.length==0){
        loadTypes(quesObj)
    }

    if(end){
        //store current answers to cache
        localStorage.setItem("answerSequence",ansArray)
        localStorage.setItem("quesTypes",types)
        //jump to generate report
        window.location = '/trans'
        return
    }
    //backward
    if(!forward){
        counter = counter-1<0?0:counter-1
    }

    //update UI and data
    updateProgress(counter,quesObj.length,forward)
    questionTitle.innerHTML = quesObj[counter].questionText
    end = counter==quesObj.length-1? true : false
}

//update answer array
var updateAnswers = (ans,index)=>{
    //out of array range. unanswered
    if(index>=ansArray.length){
        ansArray.push(ans)
    }
    else{
        ansArray[index] = ans
    }
    counter++
}

//update progress bar
var updateProgress = (cur,max,forward)=>{
    if(cur<max) {
        progressText.innerHTML = cur + 1 + "/" + max + "题"
        var curWidth = progress.style.width
        curWidth = parseFloat(curWidth.substring(0,curWidth.length-1))
        var target = 100 * (cur + 1) / max
        var id = setInterval(frame,0)
        function frame(){
            if(forward){
                if(curWidth>=target){
                    clearInterval(id)
                }
                curWidth+=0.05
                progress.style.width = curWidth + "%"
            }else{
                if(curWidth<=target){
                    clearInterval(id)
                }
                curWidth-=0.05
                progress.style.width = curWidth + "%"
            }
        }
    }
}

//load types
var loadTypes = (obj)=>{
    obj.forEach(function(ele){
        types.push(ele.questionType)
    })
}