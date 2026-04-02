const token = localStorage.getItem("access_token")

const MARK_API="http://localhost:8000/api/attendance/students/mark/"
const LIST_API="http://localhost:8000/api/attendance/students/my/"

let attendanceData=[]


/* CLOCK */

function updateClock(){
const now=new Date()
document.getElementById("liveClock").innerText=
now.toLocaleTimeString()
}

setInterval(updateClock,1000)



/* LOAD ATTENDANCE */

async function loadAttendance(){

const res=await fetch(LIST_API,{
headers:{Authorization:`Bearer ${token}`}
})

const data=await res.json()

attendanceData=data.attendance||[]

renderCalendar()

checkToday()

updatePresentDays()

}

loadAttendance()



/* RENDER CALENDAR */

// function renderCalendar(){

// const calendar=document.getElementById("calendar")

// calendar.innerHTML=""

// const now=new Date()

// const year=now.getFullYear()

// const month=now.getMonth()

// const totalDays=new Date(year,month+1,0).getDate()

// for(let day=1;day<=totalDays;day++){

// const div=document.createElement("div")

// div.classList.add("day")

// div.innerText=day


// const record=attendanceData.find(a=>{
// return new Date(a.date).getDate()===day
// })

// if(record){

// if(record.status==="present"){
// div.classList.add("present")
// }
// if(record.status==="absent"){
// div.classList.add("absent")
// }

// }

// calendar.appendChild(div)

// }

// }


/* RENDER CALENDAR */

function renderCalendar(){

const calendar=document.getElementById("calendar")

if(!calendar){
console.log("Calendar not found")
return
}

calendar.innerHTML=""

const now=new Date()

const year=now.getFullYear()
const month=now.getMonth()

const totalDays=new Date(year,month+1,0).getDate()

/* ✅ SET MONTH NAME HERE */
const monthNames=[
"January","February","March","April","May","June",
"July","August","September","October","November","December"
]

document.getElementById("monthTitle").innerText =
monthNames[month] + " " + year


for(let day=1;day<=totalDays;day++){

const div=document.createElement("div")
div.classList.add("day")
div.innerText=day

const record=attendanceData.find(a=>{
const d=new Date(a.date)
return (
d.getDate()===day &&
d.getMonth()===month &&
d.getFullYear()===year
)
})

if(record){

if(record.status==="present"){
div.classList.add("present")
}

if(record.status==="absent"){
div.classList.add("absent")
}

}

// highlight today
const today=new Date()
if(day===today.getDate() && month===today.getMonth()){
div.style.border="2px solid #0f766e"
}

calendar.appendChild(div)

}

}

/* SUMMARY */

function updatePresentDays(){

let present=attendanceData.filter(a=>a.status==="present").length

document.getElementById("presentDays").innerText=present

}



/* CHECK TODAY */

function checkToday(){

const today=new Date().toISOString().slice(0,10)

const record=attendanceData.find(a=>a.date===today)

if(record){

document.getElementById("presentBtn").disabled=true
document.getElementById("absentBtn").disabled=true

document.getElementById("statusMessage").innerText=
"Attendance already marked today at "+record.time

}

}



/* MARK ATTENDANCE */

async function markAttendance(status){

const res=await fetch(MARK_API,{
method:"POST",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({status})
})

const data=await res.json()

alert(data.message)

loadAttendance()

}