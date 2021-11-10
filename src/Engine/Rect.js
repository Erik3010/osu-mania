class Element {
  constructor({
    ctx,
    x,
    y,
    width,
    height,
    color,
    hoverColor = null,
    isHover = false,
    strokeColor = null,
  }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.hoverColor = hoverColor;
    this.isHover = isHover;
    this.strokeColor = strokeColor;
  }
  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.isHover ? this.hoverColor : this.color;
    this.ctx.fill();
    if (this.strokeColor) {
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.stroke();
    }
    this.ctx.closePath();
    this.ctx.restore();
  }
}

export default Element;
