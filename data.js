
if (!localStorage.getItem("players")) {
  localStorage.setItem("players", JSON.stringify([
    { name: "Federico", games: 0 },
    { name: "Luca", games: 0 }
  ]));
}

if (!localStorage.getItem("matches")) {
  localStorage.setItem("matches", JSON.stringify([]));
}
