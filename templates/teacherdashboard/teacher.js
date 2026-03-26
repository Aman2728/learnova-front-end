function loadTeacherName(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/profile/",{
headers:{
"Authorization":"Bearer "+token
}
})
.then(res=>res.json())
.then(data=>{

if(data.success){

let nameElement = document.getElementById("teacherName");

if(nameElement){
nameElement.innerText = "Welcome, " + data.name;
}

}

})
.catch(error=>{
console.log("Error loading teacher name:", error);
});

}

loadTeacherName();