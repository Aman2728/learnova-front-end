const token = localStorage.getItem("access_token");

const TEACHER_API = "http://localhost:8000/api/attendance/teachers/";
const STUDENT_API = "http://localhost:8000/api/attendance/students/";

if (!token) {
window.location.href = "/login.html";
}


/***************************************
FETCH TEACHER ATTENDANCE
***************************************/
async function fetchTeacherAttendance(){

try{

const res = await fetch(TEACHER_API,{
headers:{
"Authorization":`Bearer ${token}`
}
});

const data = await res.json();

const table = document.getElementById("attendanceTable");

table.innerHTML="";

data.attendance.forEach(a=>{

table.innerHTML += `
<tr>
<td>${a.teacher_id}</td>
<td>${a.teacher_name}</td>
<td>${a.date}</td>
<td>${a.time}</td>
<td class="${a.status==="present" ? "status-present":"status-absent"}">
${a.status}
</td>
</tr>
`;

});

}catch(err){
console.log(err);
}

}


/***************************************
FETCH STUDENT ATTENDANCE
***************************************/
async function fetchStudentAttendance(){

try{

const res = await fetch(STUDENT_API,{
headers:{
"Authorization":`Bearer ${token}`
}
});

const data = await res.json();

const table = document.getElementById("studentAttendanceTable");

table.innerHTML="";

data.attendance.forEach(a=>{

table.innerHTML += `
<tr>
<td>${a.student_id}</td>
<td>${a.student_name}</td>
<td>${a.date}</td>
<td>${a.time}</td>
<td class="${a.status==="present" ? "status-present":"status-absent"}">
${a.status}
</td>
</tr>
`;

});

}catch(err){
console.log(err);
}

}


document.addEventListener("DOMContentLoaded",()=>{
fetchTeacherAttendance();
fetchStudentAttendance();
});