// Animate Present Days
function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = 1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);

    let timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current;
        if (current >= end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function updatePresentDays(attendance){

let presentCount = attendance.filter(a => a.status === "present").length

animateValue("presentDays", 0, presentCount, 1000)

}

// Check-in / Absent
function markPresent(){

fetch("http://127.0.0.1:8000/api/attendance/mark/",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+localStorage.getItem("access_token")
},

body: JSON.stringify({
status:"present"
})

})
.then(res=>res.json())
.then(data=>{

const now = new Date().toLocaleTimeString()

document.getElementById("statusMessage").innerHTML =
data.message + " at " + now

})

}

function markAbsent(){

fetch("http://127.0.0.1:8000/api/attendance/mark/",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+localStorage.getItem("access_token")
},

body: JSON.stringify({
status:"absent"
})

})
.then(res=>res.json())
.then(data=>{

const now = new Date().toLocaleTimeString()

document.getElementById("statusMessage").innerHTML =
data.message + " at " + now

})

}






/**************************************
LOAD TEACHER ATTENDANCE HISTORY
**************************************/
async function loadAttendanceCalendar(){

const res = await fetch(
"http://127.0.0.1:8000/api/attendance/my/",
{
headers:{
"Authorization":"Bearer "+localStorage.getItem("access_token")
}
}
)

const data = await res.json()

if(!data.success){
console.log(data.message)
return
}

renderCalendar(data.attendance)
updatePresentDays(data.attendance)

}










function renderCalendar(attendance){

const calendar = document.getElementById("calendar")

calendar.innerHTML = ""

const daysInMonth = 28   // February example

for(let i=1;i<=daysInMonth;i++){

let dayBox = document.createElement("div")
dayBox.classList.add("day")

dayBox.innerHTML = i

calendar.appendChild(dayBox)

}

/* COLOR ATTENDANCE */

attendance.forEach(a=>{

const date = new Date(a.date)

const day = date.getDate()

const boxes = document.querySelectorAll(".day")

boxes.forEach(box=>{

if(parseInt(box.innerText) === day){

if(a.status === "present"){
box.style.background = "#2ecc71"
box.style.color="white"
}

if(a.status === "absent"){
box.style.background = "#e74c3c"
box.style.color="white"
}

}

})

})

}






function updateClock(){

const now = new Date()

document.getElementById("liveClock").innerText =
now.toLocaleTimeString()

}

setInterval(updateClock,1000)






loadAttendanceCalendar()