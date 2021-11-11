import Rect from "./Engine/Rect";

class Tile extends Rect {
  constructor({ ctx, x, y, width, height, color, speed, hitAt, position }) {
    super({ ctx, x, y: y * -1, width, height, color });

    this.speed = speed;
    this.hitAt = hitAt;
    this.position = position;

    this.hitted = false;
    this.passed = false;
  }
  draw() {
    super.draw();
  }
  update(ms) {
    this.draw();

    this.y = this.hitAt + ms * this.speed;
  }
}

export default Tile;
