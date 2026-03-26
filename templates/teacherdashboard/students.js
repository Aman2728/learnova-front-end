function loadStudents(){

let token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/courses/teacher/students/",{
headers:{
"Authorization":"Bearer "+token
}
})
.then(res=>res.json())
.then(data=>{

if(data.success){

let students = data.students;
let table = document.getElementById("studentTableBody");

table.innerHTML = "";

students.forEach(student=>{

table.innerHTML += `
<tr>
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.class}</td>
<td>${student.attendance}</td>
<td>${student.grade}</td>
<td><span class="status good">Active</span></td>
</tr>
`;

});

document.getElementById("totalStudents").innerText = students.length;

}

});

}

loadStudents();