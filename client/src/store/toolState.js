import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }

  setFillColor(color) {
    this.tool.fillStyle = color;
  }

  setStrokeColor(color) {
    this.tool.strokeStyle = color;
  }

  setWidth(width) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
