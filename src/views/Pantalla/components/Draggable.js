import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Draggable = (props) => {
  const [idDragable, setIdDragable] = useState(uuidv4() + "#Draggable");
  const [idDragzone, setIdDragzone] = useState(uuidv4() + "#Dragzone");

  useEffect(() => {
    const dragable = document.getElementById(idDragable),
      dragzone = document.getElementById(idDragzone);

    dragElement(dragable, dragzone);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1020",
        top: props.top,
        left: props.left,
      }}
      id={idDragable}
    >
      <div
        id={idDragzone}
        style={{
          background: "#D3D3D3",
          width: "100%",
          textAlign: "center",
          cursor: "move",
          padding: 0,
          margin: 0,
        }}
      >
        <i>
          Developer <span style={{ fontSize: "1rem" }}>🕶️</span>
        </i>
      </div>
      {props.children}
    </div>
  );
};

export default Draggable;

const dragElement = (element, dragzone) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const dragMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const dragMouseMove = (event) => {
    event.preventDefault();

    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;

    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  };

  const dragMouseDown = (event) => {
    event.preventDefault();

    pos3 = event.clientX;
    pos4 = event.clientY;

    document.onmouseup = dragMouseUp;
    document.onmousemove = dragMouseMove;
  };

  dragzone.onmousedown = dragMouseDown;
};
