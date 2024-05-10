export const music = new Audio("./Media/music.mp3");
export const audioTurn = new Audio("./Media/ting.mp3");
export const gameOver = new Audio("./Media/gameover.mp3");

export const winSlotsAndCoordinates = [
  //starting 3 slots are win conditions and last 3 are success line coordinates
  [0, 1, 2, 5, 5, 0],
  [3, 4, 5, 5, 15, 0],
  [6, 7, 8, 5, 25, 0],
  [0, 3, 6, -5, 15, 90],
  [1, 4, 7, 5, 15, 90],
  [2, 5, 8, 15, 15, 90],
  [0, 4, 8, 5, 15, 45],
  [2, 4, 6, 5, 15, 135],
];
