
let players = JSON.parse(localStorage.getItem("players")) || [];
let matchesToday = JSON.parse(localStorage.getItem("matches")) || [];
let chart;

function countMatchesPerPlayer() {
  players.forEach(p => {
    p.matchesPlayed = matchesToday.filter(
      m => m.player1 === p.name || m.player2 === p.name
    ).length;
  });
}

function renderPlayers() {
  const container = document.getElementById("players-list");
  container.innerHTML = "";

  countMatchesPerPlayer();

  players.sort((a, b) => (b.games || 0) - (a.games || 0));

  players.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "match-card";
    div.innerHTML = `
      <h3>${player.name}</h3>
      <p>Game vinti: ${player.games || 0}</p>
      <p>Partite giocate: ${player.matchesPlayed || 0}</p>
      <div>
        <button onclick="incrementGame(${index})">+1 game</button>
        <button onclick="decrementGame(${index})">-1 game</button>
        <button onclick="removePlayer(${index})">❌ Rimuovi</button>
      </div>
    `;
    container.appendChild(div);
  });

  localStorage.setItem("players", JSON.stringify(players));
  renderChart();
}

function incrementGame(index) {
  players[index].games = (players[index].games || 0) + 1;
  renderPlayers();
}

function decrementGame(index) {
  if (players[index].games > 0) {
    players[index].games -= 1;
    renderPlayers();
  }
}

function removePlayer(index) {
  if (confirm(`Vuoi rimuovere ${players[index].name}?`)) {
    players.splice(index, 1);
    renderPlayers();
  }
}

document.getElementById("add-player-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("new-player-name").value.trim();
  if (!name) return;
  players.push({ name, games: 0 });
  document.getElementById("new-player-name").value = "";
  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
});

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

document.addEventListener("DOMContentLoaded", () => {
  renderPlayers();
});
