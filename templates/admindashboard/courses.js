const baseURL = "http://127.0.0.1:8000/api/"
const token = localStorage.getItem("access_token");
const grid = document.getElementById("courseGrid");


// ================= OPEN / CLOSE MODAL =================

function openCourseModal() {
    document.getElementById("addCourseModal").style.display = "flex";
}

function closeAddCourseModal() {
    document.getElementById("addCourseModal").style.display = "none";
}


// ================= CREATE COURSE =================

async function createCourse() {

    const data = {
        title: document.getElementById("courseTitle").value,
        description: document.getElementById("courseDescription").value,
        price: document.getElementById("coursePrice").value,
        duration: document.getElementById("courseDuration").value,
        total_slots: document.getElementById("courseSlots").value
    };

    const res = await fetch(`${baseURL}courses/course/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    alert(result.message);

    if(result.success){
        closeAddCourseModal();
        loadCourses();
    }
}


// ================= LOAD ALL COURSES =================

async function loadCourses(){

    const res = await fetch(`${baseURL}courses/courses/all/`, {
        headers:{
            "Authorization":"Bearer " + token
        }
    });

    const result = await res.json();

    grid.innerHTML = "";

    result.courses.forEach(course => {

        grid.innerHTML += `
        <div class="course-card">

            <h3>${course.title}</h3>

            <p>${course.description}</p>

             <p><b>Teacher:</b> ${course.teacher ? course.teacher : "Not Assigned"}</p>

            <p>Price: ₹${course.price}</p>

            <p>Duration: ${course.duration_in_days} Days</p>

            <p>Total Slots: ${course.total_slots}</p>

            <p>Remaining Slots: ${course.remaining_slots}</p>

           <div class="course-actions">
        <button onclick="openEditModal(${course.id},
        '${course.title}',
        '${course.description}',
        ${course.price},
        ${course.duration_in_days},
        ${course.total_slots})">
        Edit
        </button>

        <button onclick="deleteCourse(${course.id})">
        Delete
        </button>

        <button onclick="openAssignModal(${course.id})">Assign</button>
    </div>

</div>
`;
    });

}

document.addEventListener("DOMContentLoaded", loadCourses);


// ================= DELETE COURSE =================

async function deleteCourse(id){

    if(!confirm("Delete this course?")) return;

    const res = await fetch(`${baseURL}courses/course/${id}/delete/`, {
        method:"DELETE",
        headers:{
            "Authorization":"Bearer " + token
        }
    });

    const result = await res.json();

    alert(result.message);

    loadCourses();
}



function openEditModal(id, price, slots, status){

document.getElementById("editCourseModal").style.display = "block";

document.getElementById("editCourseId").value = id;
document.getElementById("editPrice").value = price;
document.getElementById("editSlots").value = slots;
document.getElementById("editStatus").value = status;

}

function closeEditModal(){
    document.getElementById("editCourseModal").style.display = "none";
}


function updateCourse(){

const id = document.getElementById("editCourseId").value;

const data = {
price:parseInt( document.getElementById("editPrice").value),
total_slots:parseInt(document.getElementById("editSlots").value),
status: document.getElementById("editStatus").value
};

fetch(`http://127.0.0.1:8000/api/courses/course/${id}/update/`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + token
},
body:JSON.stringify(data)
})
.then(res=>res.json())
.then(data=>{
alert(data.message);
closeEditModal();
location.reload();
})

}




function openAssignModal(courseId){

    document.getElementById("assignTeacherModal").style.display = "flex";

    document.getElementById("assignCourseId").value = courseId;

    loadTeachers();
}

function closeAssignModal(){
    document.getElementById("assignTeacherModal").style.display = "none";
}





async function loadTeachers(){

const res = await fetch(`${baseURL}courses/teachers/all/`,{
headers:{
"Authorization":"Bearer " + token
}
});

const result = await res.json();

const dropdown = document.getElementById("teacherDropdown");

dropdown.innerHTML = "<option>Select Teacher</option>";

result.teachers.forEach(teacher => {

dropdown.innerHTML += `
<option value="${teacher.id}">
${teacher.name}
</option>
`;

});

}



async function assignTeacherToCourse(){

    const courseId = document.getElementById("assignCourseId").value;
    const teacherId = document.getElementById("teacherDropdown").value;

    if(!teacherId){
        alert("Please select a teacher");
        return;
    }

    const res = await fetch(`${baseURL}courses/course/${courseId}/assign-teacher/`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        },

        body:JSON.stringify({
            teacher_id: parseInt(teacherId)
        })

    });

    const result = await res.json();

    console.log(result);

    alert(result.message);

    closeAssignModal();

    loadCourses();
}





