/**
 * Created by Darth Wang on 5/25/2017.
 */
var slogan = document.getElementById("slogan")
var table = document.getElementById("table1")
var row = document.getElementById("cellTemp")
var row2 = document.getElementById("selectCellTemp")
var table2 = document.getElementById("table2")

//needed from database if cookie found
var typeAns = localStorage.getItem("typeAns").split(",")
var username = localStorage.getItem("username")

//local vars
var percentArr = []
var typeTotal = [14,12,12,12,13,11,9,12,13]
var typeList = ["完美主义者","给予者","实践者","浪漫主义者","观察者","质问者","享乐主义者","支配者","和平者"]
var maxIndex = 0;

init()
localStorage.clear()
//initialization
function init(){
    generateRows(9)
    calcPercent(typeAns)
    populateRatioTable()
    parseUser()
}

function parseUser(){
    var newUser = Userinfo(username,typeAns[0],typeAns[1],typeAns[2],typeAns[3],typeAns[4],typeAns[5],typeAns[6],typeAns[7],typeAns[8])

    $.ajax({
        type: "GET",
        url: "/data",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(newUser),
        dataType: "json",
        success: function (message) {
            if (message > 0) {
                alert("user info posted");
            }
        },
        error: function (message) {
            $("#request-process-patent").html("failed！");
        }
    });
    console.log(newUser)
}
//dynamically generate table cells
function generateRows(rowNum){
    for(var i=0;i<rowNum;i++){
        var clone = row.cloneNode(true)
        var clone2 = row2.cloneNode(true)
        table.appendChild(clone)
        table2.appendChild(clone2)
    }
    table.removeChild(table.children[0])
    table2.children[0].removeChild(table2.children[0].children[1])
}

//calculate percentages for true answer
function calcPercent(typeAns){
    var counter = 0
    //update contents
    typeAns.forEach(function(ele){
        var percent = 100*parseInt(ele)/typeTotal[counter]
        percentArr.push(percent)
        var percentDec = percent.toFixed(2)
        table.children[counter].children[1].children[0].style.width = "0%"
        table.children[counter].children[0].children[0].innerHTML = typeList[counter]
        table.children[counter].children[1].children[1].innerHTML = percentDec +"%"
        updateBar(counter)
        counter++
    })
    maxIndex = percentArr.indexOf(Math.max.apply(Math, percentArr));
    slogan.innerHTML = username + ",  "+typeList[maxIndex]
    //update style for max
    table.children[maxIndex].children[0].children[0].style.color = "#eb5e04"
    table.children[maxIndex].children[0].children[0].style.fontSize = "17px"
    //update table border
    table.children[table.children.length-1].children[1].style.borderBottom = "0"
    table.children[table.children.length-1].children[0].style.borderBottom = "0"
}

function updateBar(index){
    var barId = setInterval(barFrame,30)
    var accu = 0
    function barFrame(){
        if(accu>=percentArr[index]){
            clearInterval(barId)
        }
        accu+=0.5
        table.children[index].children[1].children[0].style.width = accu +"%"
    }
}

function populateRatioTable(){
    //update contents
    for(var i=0;i<9;i++){
        table2.children[i+1].children[0].children[0].innerHTML = typeList[i]
        table2.children[i+1].children[1].children[0].innerHTML = typeAns[i]
        table2.children[i+1].children[2].children[0].innerHTML = typeTotal[i]
        table2.children[i+1].children[3].children[0].innerHTML = Math.round(100*parseInt(typeAns[i])/typeTotal[i])+"%"
        table2.children[i+1].children[3].style.borderRight = "0"
    }
    //update styles
    for(var i = 0;i<table2.children[table2.children.length-1].children.length;i++){
        table2.children[table2.children.length-1].children[i].style.borderBottom = "0"
        table2.children[maxIndex+1].children[i].children[0].style.color = "#eb5e04"
        table2.children[maxIndex+1].children[i].children[0].style.fontSize = "17px"
    }
}

function Userinfo(n,t1,t2,t3,t4,t5,t6,t7,t8,t9){
    return {
        "name": n,
        "type1ans":t1,
        "type2ans":t2,
        "type3ans":t3,
        "type4ans":t4,
        "type5ans":t5,
        "type6ans":t6,
        "type7ans":t7,
        "type8ans":t8,
        "type9ans":t9
    }
}