let players = JSON.parse(localStorage.getItem(players))  [];
players.sort((a, b) = (b.games  0) - (a.games  0));
let top4 = players.slice(0, 4);

function createMatchUI(playerA, playerB, containerId, callback) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    h3${playerA.name} vs ${playerB.name}h3
    input type=number id=${containerId}-a placeholder=${playerA.name} min=0 
    input type=number id=${containerId}-b placeholder=${playerB.name} min=0 
    button onclick=${callback}()Conferma vincitorebutton
    p id=${containerId}-winner style=margin-top0.5rem;p
  `;
}

let semifinalWinners = [];

function confermaSemifinale1() {
  const scoreA = parseInt(document.getElementById(semifinale1-a).value);
  const scoreB = parseInt(document.getElementById(semifinale1-b).value);
  const winner = scoreA  scoreB  top4[0]  top4[3];
  semifinalWinners[0] = winner;
  document.getElementById(semifinale1-winner).textContent = `Vincitore ${winner.name}`;
  checkFinale();
}

function confermaSemifinale2() {
  const scoreA = parseInt(document.getElementById(semifinale2-a).value);
  const scoreB = parseInt(document.getElementById(semifinale2-b).value);
  const winner = scoreA  scoreB  top4[1]  top4[2];
  semifinalWinners[1] = winner;
  document.getElementById(semifinale2-winner).textContent = `Vincitore ${winner.name}`;
  checkFinale();
}

function checkFinale() {
  if (semifinalWinners.length === 2 && semifinalWinners[0] && semifinalWinners[1]) {
    createMatchUI(semifinalWinners[0], semifinalWinners[1], finale, confermaFinale);
  }
}

function confermaFinale() {
  const scoreA = parseInt(document.getElementById(finale-a).value);
  const scoreB = parseInt(document.getElementById(finale-b).value);
  const winner = scoreA  scoreB  semifinalWinners[0]  semifinalWinners[1];
  document.getElementById(vincitore).innerHTML = `h2🏆 Vincitore del torneo ${winner.name} 🏆h2`;
}

document.addEventListener(DOMContentLoaded, () = {
  if (top4.length  4) {
    document.getElementById(semifinali).innerHTML = pServono almeno 4 giocatori per le fasi finali.p;
    return;
  }

  createMatchUI(top4[0], top4[3], semifinale1, confermaSemifinale1);
  createMatchUI(top4[1], top4[2], semifinale2, confermaSemifinale2);
});
