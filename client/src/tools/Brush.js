import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveEvent.bind(this);
    this.canvas.onmousedown = this.mouseDownEvent.bind(this);
    this.canvas.onmouseup = this.mouseUpEvent.bind(this);
  }

  mouseDownEvent(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }
  mouseUpEvent(e) {
    this.mouseDown = false;
  }
  mouseMoveEvent(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
