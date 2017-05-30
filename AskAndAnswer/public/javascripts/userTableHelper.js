/**
 * Created by Darth Wang on 5/27/2017.
 */
var table = document.getElementById("table")
var logoutButton = document.getElementById("logout")
var usersArr = requestData.data

initAllUsers()


function initAllUsers(){
    usersArr.forEach((ele)=>{
        var row = table.insertRow(0);
        var cell = row.insertCell(0);
        cell.addEventListener("click", function(){
            var ansArr = [ele.type1ans,ele.type2ans,ele.type3ans,ele.type4ans,ele.type5ans,ele.type6ans,ele.type7ans,ele.type8ans,ele.type9ans]
            localStorage.setItem("typeAns",ansArr)
            localStorage.setItem("username",ele.name)
            window.location = '/report'
        });
        cell.style.cursor = "pointer"
        cell.innerHTML = ele.name;
        row.style.borderBottom = "1px solid black"
        row.style.height = "30px"
    })
}

logoutButton.addEventListener("click", function(){
    window.location = '/login'
});