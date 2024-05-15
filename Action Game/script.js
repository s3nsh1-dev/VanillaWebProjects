let score = 0; // to Keep Tabs of score values
let cross = true; // to see weather the dino and obstacle collisions happend or not... id yes then make it false for 1s then true again so that it doesn't amke the score values stuck

const deathAudio = new Audio("./Sounds/gameover.mp3");
const backgroundAudio = new Audio("./Sounds/music.mp3");
const dino = document.querySelector(".dino");

// game audio
setTimeout(() => {
  // backgroundAudio.play();
}, 1000);

//Following logic is about tracing the key number and assigning action to them so that space is used for Jump and arrow keys for left and right movement .... left and right can be done by aadding/substracting 112px to its left value
document.onkeydown = function (event) {
  // console.log(event.keyCode);

  //Space bar
  if (event.keyCode == 32) {
    // const dino = document.querySelector(".dino");
    //animate dino makes the dino goes jump
    //remove and add the class to perform the action again
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 900);
  }

  //Right key
  if (event.keyCode == 39) {
    // const dino = document.querySelector(".dino");
    const dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }

  //Left key
  if (event.keyCode == 37) {
    // const dino = document.querySelector(".dino");
    const dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};

//the folowing logic is about calculating the left computed value of the dino and obstacle and the time it meets -> GameOver
setInterval(() => {
  // const dino = document.querySelector(".dino");
  const gameOver = document.querySelector(".gameOver");
  const obstacle = document.querySelector(".obstacle");

  // this will give the computed value in PX of left/bottom of the element dino.. covert them into int
  const dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  const dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );
  const ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  //offset value will when the diffrence is small and what action can take place then the offset is of certain value
  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);

  //Logic to make dino and obstacle collide and GameOver
  if (offsetX < 73 && offsetY < 52) {
    gameOver.style.visibility = "visible";
    obstacle.classList.remove("obstacleAni");
    gameOver.innerText = "Game  Over - Reload to Play";
    // deathAudio.play();
    setTimeout(() => {
      // audio.pause();
      // deathAudio.pause();
    }, 1000);
  } // Logic to update the score
  else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;

    // make cross = true after 1s coz by that time the dino and obstacle collision must have been detected ... if game still running score is open to update
    setTimeout(() => {
      cross = true;
    }, 1000);

    // Logic to increase the obstacle spped by 0.2s every time it reaches end
    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 1;
      obstacle.style.animationDuration = newDur + "s";
      // console.log("New duration: ", aniDur);
    }, 500);
  }
}, 100);

// Score function
function updateScore() {
  scoreCont.innerHTML = "Your Score: " + score;
}
