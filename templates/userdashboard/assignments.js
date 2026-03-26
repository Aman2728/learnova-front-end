console.log("Assignments page loaded")

const user = JSON.parse(localStorage.getItem("user"));

const API = `http://127.0.0.1:8000/api/assignments/student/?student_id=${user.id}`;

const SUBMIT_API = "http://127.0.0.1:8000/api/assignments/submit/";

let student_id = user.id;

let assignments = [];


/* LOAD ASSIGNMENTS */

fetch(API)
.then(res=>res.json())
.then(data=>{

    console.log("Assignments:", data);

    assignments = data.assignments;   // ✅ FIX

    renderAssignments();
    updateSummary();
})


function renderAssignments(){

    let container = document.getElementById("assignmentContainer");
    container.innerHTML="";

    assignments.forEach(a=>{

        container.innerHTML +=`

        <div class="assignment-card">
            <h3>${a.title}</h3>
            <p><b>Course:</b> ${a.course}</p>
            <p><b>Teacher:</b> ${a.teacher}</p>

            ${a.link ? `<p><a href="${a.link}" target="_blank">🔗 Link</a></p>` : ""}

            ${a.file ? `<p><a href="http://127.0.0.1:8000${a.file}" target="_blank">📄 File</a></p>` : ""}

            ${
                a.submitted
                ? `<span class="submitted">Submitted ✅</span>`
                : `
                    <input type="file" id="file${a.id}">
                    <button onclick="submitAssignment(${a.id})">Upload</button>
                    <span id="status${a.id}" class="pending">Pending</span>
                `
            }
        </div>

        `;

    });
}


// 4. submit function (ADD HERE)
function submitAssignment(id){

    let fileInput = document.getElementById("file"+id);
    let file = fileInput.files[0];

    if(!file){
        alert("Please select file");
        return;
    }

    let formData = new FormData();

    formData.append("assignment_id", id);
    formData.append("student_id", student_id);
    formData.append("file", file);

    fetch(SUBMIT_API,{
        method:"POST",
        body:formData
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message || data.error);

        let status = document.getElementById("status"+id);

        status.innerText = "Submitted";
        status.className = "submitted";

        updateSummary();
    })
    .catch(err => console.log(err));
}



function updateSummary(){

    let total = assignments.length;

    // ✅ THIS LINE HERE
    let submitted = assignments.filter(a => a.submitted).length;

    let pending = total - submitted;

    let percent = total ? Math.round((submitted / total) * 100) : 0;

    document.getElementById("totalAssignments").innerText = total;
    document.getElementById("submittedCount").innerText = submitted;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("progressPercent").innerText = percent + "%";
    document.getElementById("progressCircle").innerText = percent + "%";
}
