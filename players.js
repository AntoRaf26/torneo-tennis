let players = JSON.parse(localStorage.getItem("players")) || [];
let chart;

function renderPlayers() {
  const container = document.getElementById("players-list");
  container.innerHTML = "";

  players.sort((a, b) => (b.games || 0) - (a.games || 0));

  players.forEach(player => {
    const div = document.createElement("div");
    div.className = "match-card";
    div.innerHTML = `
      <h3>${player.name}</h3>
      <p>Game vinti: <strong>${player.games || 0}</strong></p>
    `;
    container.appendChild(div);
  });

  localStorage.setItem("players", JSON.stringify(players));
  renderChart();
}

function renderChart() {
  const ctx = document.getElementById("chart-classifica").getContext("2d");
  const labels = players.map(p => p.name);
  const data = players.map(p => p.games || 0);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Game Vinti",
        data: data,
        backgroundColor: "#0074e4"
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", renderPlayers);
