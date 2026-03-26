function loadTeacherCourses(){

let token = localStorage.getItem("access_token");

console.log("TOKEN:", token);

fetch("http://127.0.0.1:8000/api/courses/courses/teacher/",{
method:"GET",
headers:{
"Authorization":"Bearer "+token,
"Content-Type":"application/json"
}
})
.then(res=>res.json())
.then(data=>{

console.log("API RESPONSE:", data);

let container = document.getElementById("coursesContainer");

container.innerHTML="";

if(!data.success){
container.innerHTML = "<p>No courses found</p>";
return;
}

let totalCourses = data.courses.length;
let totalStudents = 0;

data.courses.forEach(course=>{

totalStudents += course.students;


let studentNames = "";

course.students_list.forEach(student=>{
    studentNames += `<li>${student.name}</li>`;
});



container.innerHTML += `

<div class="course-box">

<div class="course-header">
<h3>${course.title}</h3>
<span class="badge">Active</span>
</div>

<div class="course-stats">
<div>Students: <strong>${course.students}</strong></div>
<div>Lessons: <strong>-</strong></div>
<div>Assignments: <strong>-</strong></div>
<div>Attendance: <strong>-</strong></div>
</div>

<div class="progress">
<div class="progress-bar" style="width:70%">70% Completed</div>
</div>

<div class="course-footer">
<span>⭐ Avg Marks: -</span>
<span>📅 Last Updated: Today</span>
</div>


<div>
<b>Enrolled Students:</b>
<ul>
${studentNames}
</ul>
</div>

<button onclick="openAssignStudentModal(${course.id})" class="assign-btn">
Assign Student
</button>

</div>

`;

});

document.getElementById("totalCourses").innerText = totalCourses;
document.getElementById("totalStudents").innerText = totalStudents;

})
.catch(error=>{
console.log("ERROR:",error);
});

}

loadTeacherCourses();






function openAssignStudentModal(courseId){

document.getElementById("assignStudentModal").style.display = "flex";

document.getElementById("assignCourseId").value = courseId;

loadStudents();

}

function closeAssignStudentModal(){

document.getElementById("assignStudentModal").style.display = "none";

}





function loadStudents(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/courses/students/all/",{
headers:{
"Authorization":"Bearer "+token
}
})
.then(res=>res.json())
.then(data=>{

let dropdown = document.getElementById("studentDropdown");

dropdown.innerHTML = "<option>Select Student</option>";

data.students.forEach(student=>{

dropdown.innerHTML += `
<option value="${student.id}">
${student.name}
</option>
`;

});

})
.catch(error=>{
console.log("Error loading students:", error);
});

}







function assignStudent(){

let courseId = document.getElementById("assignCourseId").value;
let studentId = document.getElementById("studentDropdown").value;
let token = localStorage.getItem("access_token");

fetch(`http://127.0.0.1:8000/api/courses/course/${courseId}/assign-student/`,{

method:"PUT",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token
},

body:JSON.stringify({
student_id: studentId
})

})
.then(res=>res.json())
.then(data=>{

alert(data.message);

closeAssignStudentModal();

loadTeacherCourses();

});

}