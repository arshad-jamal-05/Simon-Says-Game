let gameSeq = [];
let userSeq = [];
let userHighScore = [];
let btns = ["red", "green", "yellow", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// keypress and game started
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

// computer flashes the button
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

// user flashes the button
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 300);
}

// level up
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}

// match the pattern
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over ! <b> Your level is ${level} </b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "white";
    }, 250)
    reset();
  }
}

// user press the button
function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userSeq);

  checkAns(userSeq.length - 1);
}

// click the button
let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// reset the game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
