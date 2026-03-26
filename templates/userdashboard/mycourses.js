console.log("Student My Courses page loaded");

function loadStudentCourses(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/courses/courses/student/",{
method:"GET",
headers:{
"Authorization":"Bearer "+token,
"Content-Type":"application/json"
}
})
.then(res=>res.json())
.then(data=>{

console.log("Student Courses:", data);

let container = document.getElementById("courseList");

container.innerHTML = "";

if(!data.success){
container.innerHTML = "<p>No courses found</p>";
return;
}

data.courses.forEach(course=>{

container.innerHTML += `

<div class="course-item">

<img src="images/default-course.jpg">

<div class="course-info">
<h3>${course.title}</h3>
<p>${course.teacher}</p>

<div class="progress">
<span style="width:60%"></span>
</div>

</div>

<button class="continue-btn">Continue</button>

</div>

`;

});

})
.catch(error=>{
console.log("Error:", error);
});

}

loadStudentCourses();