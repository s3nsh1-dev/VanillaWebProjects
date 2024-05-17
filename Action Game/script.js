import { deathAudio, backgroundAudio } from "./extra-data.js";

let score = 0;
let cross = true;
const dino = document.querySelector(".dino");
let xCountArray = [];

// game audio
setTimeout(() => {
  // backgroundAudio.play();
}, 1000);

document.onkeydown = function (event) {
  if (event.keyCode == 32) {
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 900);
  }
  if (event.keyCode == 39) {
    const dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }
  if (event.keyCode == 37) {
    const dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};
setInterval(() => {
  if (isCollided()) {
    document.querySelector(".obstacle").classList.remove("obstacleAni");
    document.querySelector(".gameOver").innerText =
      "Game  Over - Reload to Play";
  } else if (isPassed()) {
    increasingSpeed();
    xCountArray = [];
  }
}, 100);

function isCollided() {
  const obstacle = document.querySelector(".obstacle");
  const dino = document.querySelector(".dino");
  const dinoPosX = window.getComputedStyle(dino, null).getPropertyValue("left");
  const obstaclePosX = window
    .getComputedStyle(obstacle, null)
    .getPropertyValue("left");
  const dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );
  const offsetX = Math.abs(parseInt(dinoPosX) - parseInt(obstaclePosX));
  const offsetY = Math.abs(dy - oy);
  if (offsetX < 150 && offsetY < 52) {
    obstacle.style.left = obstaclePosX;
    return true;
  } else {
    return false;
  }
}
function updateScore(newDur) {
  setTimeout(() => {
    score += 1;
    document.getElementById("scoreCount").innerText = "Your Score: " + score;
  }, newDur);
}

function isPassed() {
  const obstacle = document.querySelector(".obstacle");
  const obstaclePosX = obstacle.getBoundingClientRect();
  xCountArray.push(obstaclePosX.left);
  if (xCountArray[xCountArray.length - 1] < 0) {
    return true;
  } else {
    false;
  }
}

function increasingSpeed() {
  const obstacle = document.querySelector(".obstacle");
  let aniDur = parseFloat(
    window
      .getComputedStyle(obstacle, null)
      .getPropertyValue("animation-duration")
  );
  if (aniDur > 1) {
    let newDur = aniDur - 1;
    obstacle.style.animationDuration = newDur + "s";
  }
  updateScore(aniDur);
}
