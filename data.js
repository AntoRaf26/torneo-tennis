// Dati iniziali per la prima apertura. Dopo verranno sovrascritti da localStorage.

let matchesToday = JSON.parse(localStorage.getItem("matches")) || [];

let players = JSON.parse(localStorage.getItem("players")) || [];
