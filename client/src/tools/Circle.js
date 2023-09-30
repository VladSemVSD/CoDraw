import Tool from "./Tool";

export default class Circle extends Tool {
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
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseUpEvent(e) {
    this.mouseDown = false;
  }
  mouseMoveEvent(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      let radius = Math.max(
        Math.abs(currentX - this.startX),
        Math.abs(currentY - this.startY)
      );
      this.draw(this.startX, this.startY, radius, 0, 2 * Math.PI);
    }
  }

  draw(x, y, r, s, f) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, s, f);
      this.ctx.stroke();
    };
  }
}
