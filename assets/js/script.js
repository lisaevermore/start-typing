const input = document.querySelector("input");
const log = document.getElementById("user-input");

input.addEventListener("keydown", logKey);
const player_texts = []

function logKey(e) {
//   log.textContent += ` ${e.code}`;
  player_texts.push(e.key)
}

console.log(player_texts)