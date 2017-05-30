/**
 * Created by Darth Wang on 5/24/2017.
 */

var startButton = document.getElementById("start")
var nameInput = document.getElementById("nameInput")
//var cookie = document.cookie

startButton.addEventListener("click", function(){
    var name = nameInput.value
    if(name!=""){
        localStorage.setItem("username",name)
        window.location.href = "/quest"
    }else{
        nameInput.placeholder = "请输入姓名！"
    }
});

