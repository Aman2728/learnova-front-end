function loadTeacherProfile(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/profile/",{
headers:{
"Authorization":"Bearer "+token
}
})
.then(res=>res.json())
.then(data=>{

if(data.success){

let name = data.name;
let email = data.email;

let headerName = document.getElementById("profileHeaderName");
let cardName = document.getElementById("profileName");
let fullName = document.getElementById("profileFullName");
let emailField = document.getElementById("profileEmail");

if(headerName) headerName.innerText = name;
if(cardName) cardName.innerText = name;
if(fullName) fullName.innerText = name;
if(emailField) emailField.innerText = email;

}

})
.catch(error=>{
console.log("Profile error:", error);
});

}

loadTeacherProfile();