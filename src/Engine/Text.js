class Text {
  constructor({
    ctx,
    x,
    y,
    text,
    color,
    textAlign,
    textBaseline,
    fontFamily,
    fontSize,
  }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.text = text;
    this.color = color;

    this.textAlign = textAlign;
    this.textBaseline = textBaseline;

    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    this.ctx.textAlign = this.textAlign;
    this.ctx.textBaseline = this.textBaseline;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.closePath();
  }
}

export default Text;
