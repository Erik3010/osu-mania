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
  speedLevelRadios: [
    ...document.querySelectorAll(".speed-mode input[type=radio]"),
  ],
  pauseModalEl: {
    time: document.querySelector("#pause-modal-time"),
    score: document.querySelector("#pause-modal-score"),
  },
});
window.onload = async () => await ui.init();
