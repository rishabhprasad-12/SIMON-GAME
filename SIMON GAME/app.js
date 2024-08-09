let gameSeq = [];
let userSeq = [];

let colors = ["red", "blue", "yellow", "green"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

// game starts only one time
document.addEventListener("keypress", function () {
    if(started == false) {
        console.log("game is started");
        started = true;
    }

    levelUp();
});

function levelUp() {
    userSeq = [];
    level++;

    h3.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = colors[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function gameFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash (btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp(), 1000);
        }
    } else {
        h3.innerHTML = `Game Over!<br> Your score was <b>${level}</b>`;
        document.querySelector("body").style.background = "red";
        setTimeout(function() {
            document.querySelector("body").style.background = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}