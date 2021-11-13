import "./style.css";

import Game from "./src/Game";
import UI from "./src/UI";

const canvas = document.querySelector("#canvas");
const timeEl = document.querySelector(".time-container span");
const scoreEl = document.querySelector(".score-container span");

const startBtn = document.querySelector("#start-btn");
const startModal = document.querySelector("#start-modal");

const game = new Game({ canvas, timeEl, scoreEl });
// window.onload = async () => await game.init();

const ui = new UI({ game });
window.onload = async () => await ui.init();
