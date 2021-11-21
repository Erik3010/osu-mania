import Line from "./Engine/Line";
import PianoKey from "./PianoKey";
import Border from "./Border";
import Tile from "./Tile";

import Rect from "./Engine/Rect";

import { assetsBaseUrl } from "./env";
import Http from "./Utility/Http";

class Game {
  constructor({ canvas, timeEl, scoreEl }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.timeEl = timeEl;
    this.scoreEl = scoreEl;

    this.song = {};

    this.tiles = [];
    this.keys = [];
    this.lines = [];
    this.border = null;

    this.interval = null;
    this.fps = 1000 / 30;

    this.laneCount = 4;

    this.pianoKeysPosition = {
      width: this.canvas.width / this.laneCount,
      height: 140,
    };

    this.borderPosition = {
      top: 22,
      height: 15,
    };

    this.offsetHeight =
      this.canvas.height -
      this.pianoKeysPosition.height -
      this.borderPosition.height;

    this.keysMap = ["D", "F", "J", "K"];

    this.ms = 0;
    this.start = 0;

    this.speedModes = {
      slow: 0.5,
      normal: 1,
      hardcore: 2,
    };
    this.speed = this.speedModes["normal"];

    this.hitTolerance = 50;

    this.pause = false;
    this.pauseStart = null;

    this.onFinish = null;
  }
  async init(speed) {
    this.speed = this.speedModes[speed];

    this.start = Date.now();

    this.song = await Http.fetch(
      `${assetsBaseUrl}songs/1.unforgiving/map.json`
    );

    this.initUI();
    this.initTiles();

    this.animate();
  }
  initUI() {
    this.initPianoKeys();
    this.initLine();
    this.initBorder();
  }
  initTiles() {
    const width = this.canvas.width / this.laneCount;

    this.song.hitObjects.forEach((object) => {
      const initialY = -object.hitAt * this.speed + this.offsetHeight;

      const tile = new Tile({
        ctx: this.ctx,
        x: (object.position - 1) * width,
        y: initialY,
        hitAt: initialY,
        position: object.position - 1,
        speed: this.speed,
        width: this.canvas.width / this.laneCount,
        height: 30,
        color: "#ffb930",
      });
      this.tiles.push(tile);
    });
  }
  initLine() {
    const { width, height } = this.pianoKeysPosition;

    Array(this.laneCount + 1)
      .fill("")
      .forEach((_, index) => {
        this.lines.push(
          new Line({
            ctx: this.ctx,
            start: {
              x: index * width,
              y: 0,
            },
            end: {
              x: index * width,
              y: this.canvas.height - height - this.borderPosition.top,
            },
            color: "#868686",
          })
        );
      });
  }
  initBorder() {
    const { height } = this.pianoKeysPosition;

    this.border = new Border({
      ctx: this.ctx,
      x: 0,
      y: this.canvas.height - height - this.borderPosition.top,
      width: this.canvas.width,
      height: this.borderPosition.height,
      color: "#363636",
      strokeColor: "#fff",
    });
  }
  initPianoKeys() {
    const { width, height } = this.pianoKeysPosition;

    this.keysArea = new Rect({
      ctx: this.ctx,
      x: 0,
      y: this.canvas.height - height - this.borderPosition.height,
      width: this.canvas.width,
      height: this.canvas.height,
      color: "#0f0f17",
    });

    this.keysMap.forEach((key, index) => {
      this.keys.push(
        new PianoKey({
          height,
          key,
          ctx: this.ctx,
          x: index * width + 2,
          y: this.canvas.height - height,
          width: width - 4,
          color: "#ffb930",
          hoverColor: "#d69b27",
          onHitTile: this.hitTileHandler.bind(this),
        })
      );
    });
  }
  draw() {
    this.tiles.forEach(
      (tile) => !tile.passed && !tile.hitted && tile.update(this.ms)
    );

    this.keysArea.draw();
    this.keys.forEach((key) => key.draw());
    this.lines.forEach((line) => line.draw());

    this.border.draw();

    this.timeEl.innerHTML = (this.ms / 1000).toFixed(2);
    this.scoreEl.innerHTML = `${this.score}%`;
  }
  hitTileHandler(key) {
    this.tiles.forEach((tile) => {
      if (this.isTileHitted(tile, key)) {
        tile.hitted = true;
        tile.passed = true;
      }
    });
  }
  vanishTiles() {
    this.tiles.forEach((tile) => {
      if (
        tile.y > this.offsetHeight + this.hitTolerance &&
        !tile.hitted &&
        !tile.passed
      )
        tile.passed = true;
    });
  }
  animate() {
    if (this.isFinish || this.pause) {
      this.isFinish && this.onFinish && this.onFinish();
      return;
    }

    this.ms = Date.now() - this.start;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();

    this.vanishTiles();

    this.interval = setTimeout(this.animate.bind(this), this.fps);
  }
  isTileHitted(tile, key) {
    return (
      tile.y + tile.height >= this.offsetHeight - this.hitTolerance &&
      tile.y <= this.offsetHeight + this.hitTolerance &&
      !tile.hitted &&
      !tile.passed &&
      tile.position === this.keysMap.indexOf(key)
    );
  }
  pauseGame() {
    this.pause = true;
    this.pauseStart = Date.now();
  }
  resumeGame() {
    this.pause = false;

    const pausedTime = Date.now() - this.pauseStart;
    this.start += pausedTime;

    this.interval = setTimeout(this.animate.bind(this), this.fps);
  }
  get score() {
    const hitted = this.tiles.filter((tile) => tile.hitted).length;
    const passed = this.tiles.filter((tile) => tile.passed).length;

    return (!passed ? 0 : (hitted / passed) * 100).toFixed(2);
  }
  get isFinish() {
    return (
      this.ms >=
      this.song.hitObjects[this.song.hitObjects.length - 1].hitAt + 1000
    );
  }
}

export default Game;
