console.log("Welcome to Tic Tac Toe");
let music = new Audio("./Media/music.mp3");
let audioTurn = new Audio("./Media/ting.mp3");
let gameover = new Audio("./Media/gameover.mp3");
let turn = "X";
let isgameover = false;

// function to chnage X -> 0 vice versa
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// function to chack for a win
const checkWin = () => {
  let boxText = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxText[e[0]].innerText === boxText[e[1]].innerText &&
      boxText[e[2]].innerText === boxText[e[1]].innerText &&
      boxText[e[0]].innerText !== ""
    ) {
      document.getElementsByClassName("info")[0].innerText =
        boxText[e[1]].innerText + " Won the game!";
      isgameover = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};

//Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
// console.log("Jello",boxes) // will contain all box classes as object
// below forEach will target each boxes object and do aciton inside them
// span tag is the data inside the boxes div tag
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext"); // span tag
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn(); // update X -> 0 || 0 -> X
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

reset.addEventListener("click", () => {
  let boxTexts = document.querySelectorAll(".boxtext");
  Array.from(boxTexts).forEach((e) => {
    e.innerText = "";
  });
  turn = "X";
  isgameover = false;
  // Do not use ${} in place of ""
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
});
