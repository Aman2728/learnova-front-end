/***************************************
 * CONFIG
 ***************************************/
const grid = document.getElementById("teacherGrid");
const token = localStorage.getItem("access_token");

const LIST_API = "http://localhost:8000/api/users/role/teacher/";
const DELETE_API = "http://localhost:8000/api/users/admin";
const UPDATE_API = "http://localhost:8000/api/users/admin";
const CREATE_API = "http://localhost:8000/api/users/admin/create/";

if (!token) {
  window.location.href = "/login.html";
}

/***************************************
 * FETCH TEACHERS
 ***************************************/
async function fetchTeachers() {
  try {
    const res = await fetch(LIST_API, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load teachers");

    renderTeachers(data.data);
  } catch (err) {
    alert(err.message);
  }
}




/***************************************
 * RENDER GRID
 ***************************************/
function renderTeachers(teachers) {
  grid.innerHTML = "";

  teachers.forEach(teacher => {
    grid.innerHTML += `
      <div class="teacher-card">
        <img src="https://i.pravatar.cc/100?u=${teacher.id}" class="teacher-avatar">

        <h3>${teacher.username}</h3>
        <p>${teacher.email}</p>
        <p>${teacher.mobile}</p>

        <div class="teacher-actions">
          <button class="edit-btn" data-id="${teacher.id}">Edit</button>
          <button class="delete-btn" data-id="${teacher.id}">Delete</button>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {

  fetchTeachers();
  fetchAttendance();

});

/***************************************
 * DELETE TEACHER
 ***************************************/
document.addEventListener("click", async e => {
  if (!e.target.classList.contains("delete-btn")) return;

  const id = e.target.dataset.id;
  if (!confirm("Delete this teacher?")) return;

  try {
    const res = await fetch(`${DELETE_API}/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Delete failed");

    alert("Teacher deleted successfully");
    fetchTeachers();
  } catch (err) {
    alert(err.message);
  }
});

/***************************************
 * ADD TEACHER MODAL
 ***************************************/
function openAddTeacherModal() {
  document.getElementById("addTeacherModal").style.display = "flex";
}

function closeAddTeacherModal() {
  document.getElementById("addTeacherModal").style.display = "none";
}

/***************************************
 * CREATE TEACHER
 ***************************************/
async function addTeacher() {
  const body = {
    username: addTeacherUsername.value,
    email: addTeacherEmail.value,
    mobile: addTeacherMobile.value,
    password: addTeacherPassword.value,
    role: "teacher"
  };

  try {
    const res = await fetch(CREATE_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Create failed");

    alert("Teacher created successfully");
    closeAddTeacherModal();
    fetchTeachers();
  } catch (err) {
    alert(err.message);
  }
}





/***************************************
 * EDIT TEACHER
 ***************************************/
let selectedTeacherId = null;

document.addEventListener("click", e => {
  if (!e.target.classList.contains("edit-btn")) return;

  selectedTeacherId = e.target.dataset.id;

  const card = e.target.closest(".teacher-card");

  editTeacherUsername.value = card.querySelector("h3").innerText.trim();
  editTeacherMobile.value = card.querySelectorAll("p")[1].innerText.trim();
  editTeacherPassword.value = "";

  document.getElementById("editTeacherModal").style.display = "flex";
});

function closeEditTeacherModal() {
  document.getElementById("editTeacherModal").style.display = "none";
}

/***************************************
 * UPDATE TEACHER
 ***************************************/
async function updateTeacher() {
  const body = {
    username: editTeacherUsername.value,
    mobile: editTeacherMobile.value
  };

  if (editTeacherPassword.value) body.password = editTeacherPassword.value;

  try {
    const res = await fetch(
      `${UPDATE_API}/${selectedTeacherId}/update/`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");

    alert("Teacher updated successfully");
    closeEditTeacherModal();
    fetchTeachers();
  } catch (err) {
    alert(err.message);
  }
}