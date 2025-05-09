
let players = JSON.parse(localStorage.getItem("players")) || [];
let matchesToday = JSON.parse(localStorage.getItem("matches")) || [];

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

function renderMatches() {
  const container = document.getElementById("matches-container");
  container.innerHTML = "";

  matchesToday.forEach((match, index) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <h3>${match.player1} vs ${match.player2}</h3>
      <p><strong>Campo:</strong> ${match.campo}</p>
      <p><strong>Data:</strong> ${match.data} — <strong>Orario:</strong> ${match.ora}</p>
      <p class="score">
        🟢 ${match.score1} - ${match.score2} 🔵<br>
        <button onclick="adjustScore(${index}, 'score1', 1)">+1</button>
        <button onclick="adjustScore(${index}, 'score1', -1)">-1</button>
        <button onclick="adjustScore(${index}, 'score2', 1)">+1</button>
        <button onclick="adjustScore(${index}, 'score2', -1)">-1</button>
        <br><button onclick="removeMatch(${index})">🗑 Rimuovi partita</button>
      </p>
    `;
    container.appendChild(card);
  });

  localStorage.setItem("matches", JSON.stringify(matchesToday));
}

function adjustScore(index, playerKey, delta) {
  matchesToday[index][playerKey] = Math.max(0, matchesToday[index][playerKey] + delta);
  renderMatches();
}

function removeMatch(index) {
  if (confirm("Vuoi rimuovere questa partita?")) {
    matchesToday.splice(index, 1);
    renderMatches();
  }
}

document.getElementById("add-match-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const p1 = document.getElementById("player1").value;
  const p2 = document.getElementById("player2").value;
  const campo = document.getElementById("campo").value;
  const data = document.getElementById("data").value;
  const ora = document.getElementById("ora").value;

  if (p1 === p2) {
    alert("Scegli due giocatori diversi!");
    return;
  }

  matchesToday.push({
    player1: p1,
    player2: p2,
    campo,
    data,
    ora,
    score1: 0,
    score2: 0
  });

  renderMatches();
  this.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  renderMatches();
});
