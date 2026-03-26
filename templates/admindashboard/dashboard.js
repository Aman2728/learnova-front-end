// Gender Chart
new Chart(document.getElementById("genderChart"), {
  type: "doughnut",
  data: {
    labels: ["Male", "Female"],
    datasets: [{
      data: [720, 525],
      backgroundColor: ["#059669", "#10b981"]
    }]
  }
});

// Sales Chart
new Chart(document.getElementById("salesChart"), {
  type: "bar",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Revenue",
      data: [1200, 1900, 1500, 2200, 2800, 3200],
      backgroundColor: "#059669"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});
