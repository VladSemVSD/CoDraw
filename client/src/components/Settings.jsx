import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";

const Settings = () => {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Line width</label>
      <input
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
        onChange={(e) => toolState.setWidth(e.target.value)}
      />
      <label htmlFor="line-color">Stroke color</label>
      <input
        style={{ margin: "0 10px" }}
        id="line-color"
        type="color"
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
      />
    </div>
  );
};

export default Settings;
