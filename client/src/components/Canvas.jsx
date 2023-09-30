import React, { useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const inputRef = useRef();
  const params = useParams();
  const [modal, setModal] = useState(true);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const session = new WebSocket("ws://localhost:5000/");
      const userData = {
        id: params.id,
        name: canvasState.username,
        method: "connection",
      };
      session.onopen = () => {
        session.send(JSON.stringify(userData));
      }
      session.onmessage = (event) => {
        console.log(event.data)
      }
    };
  }, [canvasState.username]);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectionHandler = () => {
    canvasState.setUsername(inputRef.current.value);
    setModal(false);
  };
  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>Enter your name</Modal.Header>
        <Modal.Body><input type="text" ref={inputRef} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Connect
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={900}
        height={600}
      />
    </div>
  );
});

export default Canvas;
