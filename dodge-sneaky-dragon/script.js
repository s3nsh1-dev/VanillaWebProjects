import { deathAudio, backgroundAudio } from "./extra-data.js";

// ingame audio
backgroundAudio.play();
let score = 0;
const userAvatar = document.querySelector(".user-avatar");
const showTitle = document.getElementById("title");
const showGameOver = document.getElementById("game-over");
const obstacle = document.querySelector(".obstacle");
// dynamic array to track and collect cooradinates(left position) of obstacle
let xCountArray = [];

// reponsibe for avatar and obstacle  movement
document.onkeydown = function (event) {
  if (event.keyCode == 32) {
    userAvatar.classList.add("animateDino");
    setTimeout(() => {
      userAvatar.classList.remove("animateDino");
    }, 900);
  }
  if (event.keyCode == 39) {
    // take the value of avatar left position coordinates
    const userAvatarX = parseInt(
      window.getComputedStyle(userAvatar, null).getPropertyValue("left")
    );
    userAvatar.style.left = userAvatarX + 112 + "px";
  }
  if (event.keyCode == 37) {
    // converting input to integer, because received value is in 'px' which is astring
    const userAvatarX = parseInt(
      window.getComputedStyle(userAvatar, null).getPropertyValue("left")
    );
    userAvatar.style.left = userAvatarX - 112 + "px";
  }
};

const gameLogic = setInterval(() => {
  if (isCollided()) {
    deathAudio.play();
    obstacle.classList.remove("obstacle-ani");
    showTitle.style.display = "none";
    showGameOver.style.display = "block";
    backgroundAudio.pause();
    // clearing interval to end continuous checking of collision. stops the collision audio.
    clearInterval(gameLogic);
  } else if (isPassed()) {
    increasingSpeed();
    // empting cooradinate counting array. so, when checked for collision again it won't add new values to old data.
    xCountArray = [];
  }
}, 100);

function isCollided() {
  // taking left and right position to check collision
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

// if obstacle completes its journey from rightend to leftend, it means no collision.
function updateScore(newDuration) {
  // newDuration is the time it takes to complete its journey
  // intruption in time = collision = no score updated
  setTimeout(() => {
    score += 1;
    document.getElementById("rank-score").value = score;
  }, newDuration);
}

function isPassed() {
  const obstaclePosX = obstacle.getBoundingClientRect();

  // fills the array with obstacle position
  xCountArray.push(obstaclePosX.left);
  // if array's last index is negative = no collision
  if (xCountArray[xCountArray.length - 1] < 0) {
    // -ve coordinates only happens when obstacle passes left boundry of screen
    return true;
  } else {
    false;
  }
}

function increasingSpeed() {
  let animationDuration = parseFloat(
    window
      .getComputedStyle(obstacle, null)
      .getPropertyValue("animation-duration")
  );
  // reduces the obstacle speed by making updating its CSS animation value
  if (animationDuration > 1) {
    let newDuration = animationDuration - 1;
    obstacle.style.animationDuration = newDuration + "s";
  }
  updateScore(animationDuration);
}

document.getElementById("btn").addEventListener("click", () => {
  //Saves the user data in Session storage
  const username = document.getElementById("user-name").value;
  const rScore = document.getElementById("rank-score").value;
  sessionStorage.setItem(username, rScore);
  alert("Warrior Data Saved!");
});
