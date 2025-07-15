let gameSeq = [];
let userSeq = [];
let colors = ["red", "blue", "yellow", "green"];
let started = false;
let level = 0;
let score = 0;

const levelText = document.getElementById("levelText");
const scoreText = document.getElementById("scoreText");
const startBtn = document.getElementById("startBtn");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function showModal(content, showClose = true) {
  modalBody.innerHTML = content;
  closeModal.style.display = showClose ? "block" : "none";
  modal.style.display = "flex";
}

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) modal.style.display = "none";
};

function showGuidelines() {
  showModal(
    `
    <h2>How to Play</h2>
    <ol style="text-align:left;">
      <li>Watch the sequence of lights.</li>
      <li>Repeat the sequence by clicking the colored buttons.</li>
      <li>Each round, the sequence gets longer.</li>
      <li>If you make a mistake, the game ends. Try to beat your high score!</li>
    </ol>
    <button id="modalStartBtn">Start Game</button>
  `,
    false
  );
  setTimeout(() => {
    document.getElementById("modalStartBtn").onclick = () => {
      modal.style.display = "none";
      startGame();
    };
  }, 100);
}

function showGameOver() {
  showModal(
    `
    <h2>Game Over!</h2>
    <p>Your score was <b>${score}</b></p>
    <button id="modalRestartBtn">Restart</button>
  `,
    false
  );
  setTimeout(() => {
    document.getElementById("modalRestartBtn").onclick = () => {
      modal.style.display = "none";
      startGame();
    };
  }, 100);
}

function startGame() {
  started = true;
  gameSeq = [];
  userSeq = [];
  level = 0;
  score = 0;
  levelText.innerText = `Level 1`;
  scoreText.innerText = `Score: 0`;
  startBtn.style.display = "none";
  levelUp();
}

function levelUp() {
  userSeq = [];
  level++;
  score = level - 1;
  levelText.innerText = `Level ${level}`;
  scoreText.innerText = `Score: ${score}`;
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = colors[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  setTimeout(() => gameFlash(randomBtn), 500);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 500);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    started = false;
    startBtn.style.display = "inline";
    showGameOver();
  }
}

function btnPress() {
  if (!started) return;
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

startBtn.onclick = showGuidelines;

// Show guidelines modal on page load
window.onload = function () {
  showGuidelines();
};
