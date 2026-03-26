const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            profileImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});



function loadStudentProfile(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/profile/",{
headers:{
"Authorization":"Bearer "+token
}
})
.then(res=>res.json())
.then(data=>{

if(data.success){

document.getElementById("studentName").innerText = data.name;
document.getElementById("studentFullName").innerText = data.name;
document.getElementById("studentEmail").innerText = data.email;

if(data.phone){
document.getElementById("studentPhone").innerText = data.phone;
}

if(data.city){
document.getElementById("studentCity").innerText = data.city;
}

if(data.student_class){
document.getElementById("studentClass").innerText = data.student_class;
}

if(data.roll_no){
document.getElementById("studentRoll").innerText = data.roll_no;
}

}

})
.catch(error=>{
console.log("Profile error:",error);
});

}

loadStudentProfile();