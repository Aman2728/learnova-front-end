/***************************************
 * CONFIG
 ***************************************/
const table = document.getElementById("studentTable");
const token = localStorage.getItem("access_token");

const LIST_API = "http://localhost:8000/api/users/role/student/";
const DELETE_API = "http://localhost:8000/api/users/admin";
const UPDATE_API = "http://localhost:8000/api/users/admin";
const CREATE_API = "http://localhost:8000/api/users/admin/create/";

if (!token) {
  window.location.href = "../login.html";
}

/***************************************
 * FETCH STUDENTS
 ***************************************/
async function fetchStudents() {
  try {
    const res = await fetch(LIST_API, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load students");

    renderStudents(data.data);
  } catch (err) {
    alert(err.message);
  }
}

/***************************************
 * RENDER TABLE
 ***************************************/
function renderStudents(students) {
  table.innerHTML = "";

  students.forEach(student => {
    table.innerHTML += `
      <tr>
        <td><input type="checkbox"></td>

        <td class="student-name">
          <div class="student-info">
            <img src="https://i.pravatar.cc/40?u=${student.id}">
            ${student.username}
          </div>
        </td>

        <td>#${student.id}</td>
        <td>${student.email}</td>
        <td>—</td>
        <td>${new Date(student.created_at).toLocaleDateString()}</td>
        <td class="student-mobile">${student.mobile}</td>

        <td>
          <button class="edit" data-id="${student.id}">✏️</button>
          <button class="delete" data-id="${student.id}">🗑️</button>
        </td>
      </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", fetchStudents);

/***************************************
 * SEARCH
 ***************************************/
document.getElementById("searchInput").addEventListener("keyup", function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll("#studentTable tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
  });
});

/***************************************
 * DELETE STUDENT
 ***************************************/
document.addEventListener("click", async e => {
  if (!e.target.classList.contains("delete")) return;

  const id = e.target.dataset.id;
  if (!confirm("Delete this student?")) return;

  try {
    const res = await fetch(`${DELETE_API}/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Delete failed");

    alert("Student deleted successfully");
    fetchStudents();
  } catch (err) {
    alert(err.message);
  }
});

/***************************************
 * EDIT MODAL
 ***************************************/
let selectedStudentId = null;

document.addEventListener("click", e => {
  if (!e.target.classList.contains("edit")) return;

  selectedStudentId = e.target.dataset.id;
  const row = e.target.closest("tr");

  editUsername.value = row.querySelector(".student-name").innerText.trim();
  editMobile.value = row.querySelector(".student-mobile").innerText.trim();
  editPassword.value = "";

  document.getElementById("editModal").style.display = "flex";
});

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

/***************************************
 * UPDATE STUDENT
 ***************************************/
async function updateStudent() {
  const body = {
    username: editUsername.value,
    mobile: editMobile.value
  };

  if (editPassword.value) body.password = editPassword.value;

  try {
    const res = await fetch(
      `${UPDATE_API}/${selectedStudentId}/update/`,
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

    alert("Student updated successfully");
    closeEditModal();
    fetchStudents();
  } catch (err) {
    alert(err.message);
  }
}

/***************************************
 * ADD MODAL
 ***************************************/
function openAddModal() {
  addUsername.value = "";
  addEmail.value = "";
  addMobile.value = "";
  addPassword.value = "";

  document.getElementById("addModal").style.display = "flex";
}

function closeAddModal() {
  document.getElementById("addModal").style.display = "none";
}

/***************************************
 * CREATE STUDENT
 ***************************************/
async function addStudent() {
  const body = {
    username: addUsername.value,
    email: addEmail.value,
    mobile: addMobile.value,
    password: addPassword.value,
    role:role.value
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

    alert("Student created successfully");
    closeAddModal();
    fetchStudents();
  } catch (err) {
    alert(err.message);
  }
}
