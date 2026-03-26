const API = "http://127.0.0.1:8000/api/assignments/create/";
const COURSE_API = "http://127.0.0.1:8000/api/courses/courses/teacher/";
const GET_ASSIGNMENTS_API = "http://127.0.0.1:8000/api/assignments/teacher/";

// ✅ GET USER
const userObj = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("access_token");

// ✅ OPEN MODAL
function openAssignmentModal(){
    document.getElementById("assignmentModal").style.display = "flex";
}

// ✅ CLOSE MODAL
function closeAssignmentModal(){
    document.getElementById("assignmentModal").style.display = "none";
}

// ✅ LOAD TEACHER COURSES
function loadTeacherCourses(){

    console.log("Loading courses...");

    fetch(COURSE_API,{
        method:"GET",
        headers:{
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {

        let dropdown = document.getElementById("course");
        dropdown.innerHTML = '<option value="">Select Course</option>';

        data.courses.forEach(course => {

            let option = document.createElement("option");
            option.value = course.id;
            option.text = course.title;

            dropdown.appendChild(option);
        });

    })
    .catch(err => console.log("Course Load Error:", err));
}


// ✅ CREATE ASSIGNMENT (WITH FILE + LINK)
function createAssignment(){

    let courseElement = document.getElementById("course");

    if(!courseElement.value){
        alert("Please select course");
        return;
    }

    let formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("language", document.getElementById("language").value);
    formData.append("due_date", document.getElementById("dueDate").value);
    formData.append("course_id", courseElement.value);
    formData.append("teacher_id", userObj.id);

    // ✅ LINK
    formData.append("link", document.getElementById("link").value);

    // ✅ FILE
    let fileInput = document.getElementById("file");
    if(fileInput.files.length > 0){
        formData.append("file", fileInput.files[0]);
    }

    fetch(API,{
        method:"POST",
        headers:{
            "Authorization":"Bearer " + token
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        alert(data.message || data.error);

        closeAssignmentModal();

        // ✅ reload assignments after create
        loadAssignments();

    })
    .catch(err => console.log("ERROR:", err));
}


// ✅ LOAD TEACHER ASSIGNMENTS
function loadAssignments(){

    fetch(GET_ASSIGNMENTS_API + "?teacher_id=" + userObj.id,{
        method:"GET",
        headers:{
            "Authorization":"Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {

        let container = document.getElementById("assignmentList");
        container.innerHTML = "";

        data.assignments.forEach(a => {

            let card = document.createElement("div");
            card.classList.add("assignment-card");

            card.innerHTML = `
                <h3>${a.title}</h3>
                <p><b>Language:</b> ${a.language}</p>
                <p><b>Due Date:</b> ${a.due_date}</p>

                ${a.link ? `<p><a href="${a.link}" target="_blank">🔗 Open Link</a></p>` : ""}

                ${a.file ? `<p><a href="http://127.0.0.1:8000${a.file}" target="_blank">📄 Download File</a></p>` : ""}

                <button onclick="viewSubmissions(${a.id})">View Submissions</button>
            `;

            container.appendChild(card);
        });

    })
    .catch(err => console.log("Assignment Load Error:", err));
}


// ✅ VIEW STUDENT SUBMISSIONS (NEW)
function viewSubmissions(assignmentId){

    // ✅ CLOSE CREATE MODAL FIRST
    document.getElementById("assignmentModal").style.display = "none";

    fetch(`http://127.0.0.1:8000/api/assignments/submissions/?assignment_id=${assignmentId}`)
    .then(res => res.json())
    .then(data => {

        let html = "";

        data.submissions.forEach(s => {
            html += `
                <div class="submission-card">
                    <p><b>Student:</b> ${s.student}</p>
                    <p>
                        <a href="http://127.0.0.1:8000${s.file}" target="_blank">
                            📄 Download File
                        </a>
                    </p>
                </div>
            `;
        });

        document.getElementById("submissionList").innerHTML = html;
        document.getElementById("submissionModal").style.display = "flex";
    });
}

// ✅ CLOSE SUBMISSION MODAL
function closeSubmissionModal(){
    document.getElementById("submissionModal").style.display = "none";
}

// ✅ LOAD ON PAGE START
window.onload = function(){
    loadTeacherCourses();
    loadAssignments();
    document.getElementById("assignmentModal").style.display = "none";
    document.getElementById("submissionModal").style.display = "none";
}
