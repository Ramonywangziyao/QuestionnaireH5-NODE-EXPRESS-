/**
 * Created by Darth Wang on 5/26/2017.
 */

var adminText = document.getElementById("admin")
var passwordText = document.getElementById("pass")
var loginButton = document.getElementById("login")
var returnButton = document.getElementById("return")

loginButton.addEventListener("click", function(){
    var admin = adminText.value
    var pass = passwordText.value
    var adminInstance = new adminJSON(admin,pass)
    requestDatabase(adminInstance)
});

returnButton.addEventListener("click", function(){
    window.location = '/'
});

function adminJSON(a,p){
    return {
        "admin":a,
        "password":p
    }
}

function requestDatabase(ins){
    $.ajax({
        type: "GET",
        url: "/data",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ins),
        dataType: "json",
        success: function (message) {
            console.log(message.success)
            if (message.success==true) {
                console.log("jumping")
                window.location = '/userTable'
            }else{
                alert("你不是管理员。886")
                adminText.value = ""
                passwordText.value = ""
            }
        },
        error: function (message) {
            $("#request-process-patent").html("failed！");
        }
    });
}