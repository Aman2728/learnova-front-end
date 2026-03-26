function loadUserName(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/profile/",{
headers:{
"Authorization":"Bearer "+token
}
})
.then(res=>res.json())
.then(data=>{

if(data.success){

let welcome = document.getElementById("welcomeText");

if(welcome){
welcome.innerText = "Hello " + data.name;
}

}

})
.catch(err=>{
console.log("User fetch error:", err);
});

}

loadUserName();