import Rect from "./Engine/Rect";
import Text from "./Engine/Text";

class PianoKey extends Rect {
  constructor({ ctx, x, y, width, height, color, hoverColor, isHover, key }) {
    super({ ctx, x, y, width, height, color, hoverColor, isHover });

    this.key = key;

    this.highlight = null;
    this.text == null;

    this.initText();
    this.initHighlight();

    this.listener();
  }
  draw() {
    super.draw();

    this.text.draw();

    if (this.isHover) {
      this.highlight.draw();
    }
  }
  initText() {
    this.text = new Text({
      ctx: this.ctx,
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      text: this.key,
      color: "#fff",
      fontSize: 24,
      fontFamily: "Arial",
      textAlign: "center",
      textBaseline: "middle",
    });
  }
  initHighlight() {
    const highlight = {
      x: this.x,
      y: this.y - 200,
      width: this.width,
      height: 200 - 22,
    };

    const gradient = this.ctx.createLinearGradient(0, highlight.y, 0, this.y);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "#fff");

    this.highlight = new Rect({ ...highlight, ctx: this.ctx, color: gradient });
  }
  listener() {
    window.addEventListener("keydown", this.keyDownHandler.bind(this));
    window.addEventListener("keyup", this.keyUpHandler.bind(this));
  }
  keyDownHandler(e) {
    if (e.code === `Key${this.key}`) this.isHover = true;
  }
  keyUpHandler(e) {
    if (e.code === `Key${this.key}`) this.isHover = false;
  }
}

export default PianoKey;
