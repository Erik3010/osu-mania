import Line from "./Engine/Line";
import PianoKey from "./PianoKey";
import Border from "./Border";
import Tile from "./Tile";

import Utility from "./Utility";

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

    this.interval = 30;

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
    this.start = Date.now();

    this.score = 0;

    this.speed = 1;
  }
  async init() {
    this.song = await Utility.fetchSongMap();

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
    this.song.hitObjects.forEach((object) => {
      const width = this.canvas.width / this.laneCount;

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
    console.log(this.tiles);
  }
  initLine() {
    Array(this.laneCount + 1)
      .fill("")
      .forEach((_, index) => {
        const { width, height } = this.pianoKeysPosition;

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
    this.keysMap.forEach((key, index) => {
      const { width, height } = this.pianoKeysPosition;

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
    this.tiles.forEach((tile) => {
      if (!tile.passed && !tile.hitted) {
        tile.update(this.ms);
      }
    });

    this.keys.forEach((key) => key.draw());
    this.lines.forEach((line) => line.draw());

    this.border.draw();

    this.timeEl.innerHTML = (this.ms / 1000).toFixed(2);
    this.scoreEl.innerHTML = `${this.score.toFixed(2)}%`;
  }
  hitTileHandler(key) {
    this.tiles.forEach((tile) => {
      if (this.isTileHitted(tile, key)) tile.hitted = true;
    });
  }
  vanishTiles() {
    this.tiles.forEach((tile) => {
      if (tile.y >= this.offsetHeight + 30) tile.passed = true;
    });
  }
  animate() {
    this.ms = Date.now() - this.start;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();

    this.vanishTiles();

    this.calculateScore();

    setTimeout(this.animate.bind(this), this.interval);
  }
  isTileHitted(tile, key) {
    return (
      tile.y >= this.offsetHeight &&
      !tile.hitted &&
      !tile.passed &&
      tile.position === this.keysMap.indexOf(key)
    );
  }
  calculateScore() {
    const hitted = this.tiles.filter((tile) => tile.hitted).length;
    const passed = this.tiles.filter((tile) => tile.passed).length;

    console.log(hitted, passed);

    this.score = !passed ? 0 : (hitted / passed) * 100;
  }
}

export default Game;
