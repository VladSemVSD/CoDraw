import React from 'react'
import '../styles/toolbar.scss'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import canvasState from '../store/canvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import { set } from 'mobx'

const Toolbar =() => {
  const colorChange = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value)
  }
  return (
    <div className='toolbar'>
        <button className='toolbar__button brush' onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}></button>
        <button className='toolbar__button rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
        <button className='toolbar__button circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
        <button className='toolbar__button eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
        <button className='toolbar__button line' onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>
        <input type="color" value="#000000" style={{ marginLeft: 10 }} onChange={(e) => colorChange(e)} />
        <button className='toolbar__button undo' onClick={() => canvasState.undo()}></button>
        <button className='toolbar__button redo' onClick={() => canvasState.redo()}></button>
        <button className='toolbar__button save'></button>
    </div>
  )
}

export default Toolbar