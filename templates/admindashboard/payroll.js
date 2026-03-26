const feesData = [
  {
    course: "Science Stream (9–10)",
    subjects: "Physics, Chemistry, Biology",
    totalStudents: 150,
    paid: 120,
    pending: 30,
    totalFee: 180000,
    collected: 144000
  },
  {
    course: "Commerce Stream (11–12)",
    subjects: "Accountancy, Business, Economics",
    totalStudents: 90,
    paid: 65,
    pending: 25,
    totalFee: 135000,
    collected: 97500
  },
  {
    course: "Computer Science",
    subjects: "Python, Web Dev, Data Structures",
    totalStudents: 110,
    paid: 110,
    pending: 0,
    totalFee: 165000,
    collected: 165000
  },
  {
    course: "Mathematics Foundation",
    subjects: "Algebra, Geometry, Trigonometry",
    totalStudents: 80,
    paid: 50,
    pending: 30,
    totalFee: 96000,
    collected: 60000
  },
  {
    course: "English & Communication",
    subjects: "Grammar, Writing, Speaking",
    totalStudents: 70,
    paid: 70,
    pending: 0,
    totalFee: 70000,
    collected: 70000
  }
];

const table = document.getElementById("feeTable");

let totalFee = 0;
let collectedFee = 0;

feesData.forEach(item => {
  const pendingAmount = item.totalFee - item.collected;
  totalFee += item.totalFee;
  collectedFee += item.collected;

  let status = "pending";
  if (item.pending === 0) status = "completed";
  else if (item.paid > 0) status = "partial";

  table.innerHTML += `
    <tr>
      <td>${item.course}</td>
      <td>${item.subjects}</td>
      <td>${item.totalStudents}</td>
      <td class="paid">${item.paid}</td>
      <td class="pending">${item.pending}</td>
      <td>₹${item.totalFee.toLocaleString()}</td>
      <td>₹${item.collected.toLocaleString()}</td>
      <td>₹${pendingAmount.toLocaleString()}</td>
      <td><span class="status ${status}">${status}</span></td>
    </tr>
  `;
});

/* KPI VALUES */
document.getElementById("totalFee").innerText = `₹${totalFee.toLocaleString()}`;
document.getElementById("collectedFee").innerText = `₹${collectedFee.toLocaleString()}`;
document.getElementById("pendingFee").innerText =
  `₹${(totalFee - collectedFee).toLocaleString()}`;
