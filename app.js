let players = JSON.parse(localStorage.getItem("players")) || [];
let matchesToday = JSON.parse(localStorage.getItem("matches")) || [];
let isAdmin = false;

function checkAdmin() {
  const storedRole = localStorage.getItem("role");
  if (storedRole === "admin") {
    isAdmin = true;
  } else {
    const answer = confirm("Sei un admin?");
    if (answer) {
      const pass = prompt("Inserisci password admin:");
      if (pass === "admin123") {
        isAdmin = true;
        localStorage.setItem("role", "admin");
      } else {
        alert("Password errata. Accesso in sola lettura.");
        localStorage.setItem("role", "viewer");
      }
    } else {
      localStorage.setItem("role", "viewer");
    }
  }
}

function renderMatches() {
  const container = document.getElementById("matches-container");
  container.innerHTML = "";

  matchesToday.forEach((match, index) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <h3>${match.player1} vs ${match.player2}</h3>
      <p><strong>Campo:</strong> ${match.campo}</p>
      <p><strong>Orario:</strong> ${match.ora}</p>
      <p class="score">
        🟢 ${match.score1} - ${match.score2} 🔵<br>
        ${
          isAdmin
            ? `
        <button onclick="adjustScore(${index}, 'score1', 1)">+1</button>
        <button onclick="adjustScore(${index}, 'score1', -1)">-1</button>
        <button onclick="adjustScore(${index}, 'score2', 1)">+1</button>
        <button onclick="adjustScore(${index}, 'score2', -1)">-1</button>
        `
            : `<em>Visualizzazione sola lettura</em>`
        }
      </p>
    `;
    container.appendChild(card);
  });

  localStorage.setItem("matches", JSON.stringify(matchesToday));
}

function adjustScore(index, playerKey, delta) {
  matchesToday[index][playerKey] = Math.max(0, matchesToday[index][playerKey] + delta);
  renderMatches();
  updatePlayerGames(); // Auto-calcolo dei game vinti
}

function updatePlayerGames() {
  // Reset
  players.forEach(player => player.games = 0);

  // Somma dei game
  matchesToday.forEach(match => {
    const p1 = players.find(p => p.name === match.player1);
    const p2 = players.find(p => p.name === match.player2);
    if (p1) p1.games += match.score1;
    if (p2) p2.games += match.score2;
  });

  localStorage.setItem("players", JSON.stringify(players));
}

function populateDropdowns() {
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  player1.innerHTML = "";
  player2.innerHTML = "";

  players.forEach(p => {
    const opt1 = document.createElement("option");
    opt1.value = opt1.textContent = p.name;
    player1.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = opt2.textContent = p.name;
    player2.appendChild(opt2);
  });
}

document.getElementById("add-match-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const p1 = document.getElementById("player1").value;
  const p2 = document.getElementById("player2").value;
  const campo = document.getElementById("campo").value;
  const ora = document.getElementById("ora").value;

  if (p1 === p2) {
    alert("Scegli due giocatori diversi!");
    return;
  }

  matchesToday.push({
    player1: p1,
    player2: p2,
    campo,
    ora,
    score1: 0,
    score2: 0
  });

  renderMatches();
  updatePlayerGames();
  this.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  checkAdmin();
  if (!isAdmin) {
    document.getElementById("add-match-form").style.display = "none";
  }
  populateDropdowns();
  renderMatches();
  updatePlayerGames(); // Calcolo iniziale
});
