import "./style.css";

import Game from "./src/Game";
import UI from "./src/UI";

const canvas = document.querySelector("#canvas");
const timeEl = document.querySelector(".time-container span");
const scoreEl = document.querySelector(".score-container span");

const game = new Game({ canvas, timeEl, scoreEl });

const ui = new UI({
  game,
  startGameButton: document.querySelector("#start-btn"),
  resumeGameButton: document.querySelector("#resume-btn"),
  restartGameButton: document.querySelector("#restart-btn"),
  speedLevelRadios: [
    ...document.querySelectorAll(".speed-mode input[type=radio]"),
  ],
  pauseModalEl: {
    time: document.querySelector("#pause-modal-time"),
    score: document.querySelector("#pause-modal-score"),
  },
  finishModalEl: {
    score: document.querySelector("#finish-modal-score"),
    highScore: document.querySelector("#finish-modal-highscore"),
  },
});
window.onload = async () => await ui.init();
