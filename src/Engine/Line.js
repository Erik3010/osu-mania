class Line {
  constructor({ ctx, start, end, color, width = 1 }) {
    this.ctx = ctx;
    this.start = start;
    this.end = end;
    this.color = color;
    this.width = width;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.lineTo(this.end.x, this.end.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Line;
