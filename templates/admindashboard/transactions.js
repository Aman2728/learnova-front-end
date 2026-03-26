const transactions = [
  { id: "#TXN1023", user: "Aman Pathak", course: "Web Development", amount: "₹4,999", method: "UPI", status: "Paid", date: "12 Jun 2026" },
  { id: "#TXN1024", user: "Riya Sharma", course: "Data Science", amount: "₹6,499", method: "Card", status: "Pending", date: "13 Jun 2026" },
  { id: "#TXN1025", user: "Rahul Verma", course: "UI/UX Design", amount: "₹3,999", method: "Net Banking", status: "Failed", date: "13 Jun 2026" }
  
];

const tbody = document.getElementById("transactionTableBody");

function renderTransactions(filter = "All") {
  tbody.innerHTML = "";

  transactions
    .filter(txn => filter === "All" || txn.status === filter)
    .forEach(txn => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${txn.id}</td>
        <td>${txn.user}</td>
        <td>${txn.course}</td>
        <td>${txn.amount}</td>
        <td>${txn.method}</td>
        <td class="status-${txn.status.toLowerCase()}">${txn.status}</td>
        <td>${txn.date}</td>
        <td><button class="view-btn">View</button></td>
      `;

      tbody.appendChild(row);
    });
}

renderTransactions();

// FILTER BUTTONS
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderTransactions(btn.textContent);
  });
});
