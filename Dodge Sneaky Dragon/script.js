import { deathAudio, backgroundAudio } from "./extra-data.js";

// game audio
// backgroundAudio.play();
let score = 0;
const userAvatar = document.querySelector(".userAvatar");
const showTitle = document.getElementById("title");
const showGameOver = document.getElementById("gameOver");
let xCountArray = [];

document.onkeydown = function (event) {
  if (event.keyCode == 32) {
    userAvatar.classList.add("animateDino");
    setTimeout(() => {
      userAvatar.classList.remove("animateDino");
    }, 900);
  }
  if (event.keyCode == 39) {
    const userAvatarX = parseInt(
      window.getComputedStyle(userAvatar, null).getPropertyValue("left")
    );
    userAvatar.style.left = userAvatarX + 112 + "px";
  }
  if (event.keyCode == 37) {
    const userAvatarX = parseInt(
      window.getComputedStyle(userAvatar, null).getPropertyValue("left")
    );
    userAvatar.style.left = userAvatarX - 112 + "px";
  }
};

const gameLogic = setInterval(() => {
  if (isCollided()) {
    // deathAudio.play();
    document.querySelector(".obstacle").classList.remove("obstacleAni");
    showTitle.style.display = "none";
    showGameOver.style.display = "block";
    // backgroundAudio.pause();
    clearInterval(gameLogic);
  } else if (isPassed()) {
    increasingSpeed();
    xCountArray = [];
  }
}, 100);

function isCollided() {
  const obstacle = document.querySelector(".obstacle");
  const userAvatar = document.querySelector(".userAvatar");
  const userAvatarPosX = window
    .getComputedStyle(userAvatar, null)
    .getPropertyValue("left");
  const obstaclePosX = window
    .getComputedStyle(obstacle, null)
    .getPropertyValue("left");
  const dy = parseInt(
    window.getComputedStyle(userAvatar, null).getPropertyValue("top")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );
  const offsetX = Math.abs(parseInt(userAvatarPosX) - parseInt(obstaclePosX));
  const offsetY = Math.abs(dy - oy);
  if (offsetX < 150 && offsetY < 52) {
    obstacle.style.left = obstaclePosX;
    return true;
  } else {
    return false;
  }
}

function updateScore(newDuration) {
  setTimeout(() => {
    score += 1;
    document.getElementById("rankScore").value = score;
  }, newDuration);
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
  let animationDuration = parseFloat(
    window
      .getComputedStyle(obstacle, null)
      .getPropertyValue("animation-duration")
  );
  if (animationDuration > 1) {
    let newDuration = animationDuration - 1;
    obstacle.style.animationDuration = newDuration + "s";
  }
  updateScore(animationDuration);
}

document.getElementById("btn").addEventListener("click", () => {
  const username = document.getElementById("userName").value;
  const rScore = document.getElementById("rankScore").value;
  sessionStorage.setItem(username, rScore);
  alert("Warrior Data Saved!");
});
