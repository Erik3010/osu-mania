import "./style.css";

import Game from "./src/Game";

const canvas = document.querySelector("#canvas");
const timeEl = document.querySelector(".time-container span");
const scoreEl = document.querySelector(".score-container span");

const game = new Game({ canvas, timeEl, scoreEl });
window.onload = async () => await game.init();
