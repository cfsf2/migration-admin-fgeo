import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Draggable = (props) => {
  const [id, setId] = useState(uuidv4() + "#Draggable");
  const [mouseDown, setMouseDown] = useState(false);
  const [position, setPosition] = useState({
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
  });

  const dragMouseUp = (e) => {
    e.preventDefault();

    setMouseDown(false);
  };
  const dragMouseDown = (e) => {
    e.preventDefault();
    e.persist();

    setMouseDown(true);

    setPosition((p) => {
      const np = { ...p };
      np.pos3 = e.clientX;
      np.pos4 = e.clientY;
      return np;
    });
  };

  const dragMouseMove = (e) => {
    e.preventDefault();
    e.persist();
    if (!mouseDown) return;

    setPosition((p) => {
      return {
        pos1: p.pos3 - e.clientX,
        pos2: p.pos4 - e.clientY,
        pos3: e.clientX,
        pos4: e.clientY,
      };
    });
  };

  useLayoutEffect(() => {
    const dragEl = document.getElementById(id);

    dragEl.style.top = `${dragEl.offsetTop - position.pos2}px`;
    dragEl.style.left = `${dragEl.offsetLeft - position.pos1}px`;
  }, [id, position.pos1, position.pos2]);

  return (
    <div
      onMouseMove={dragMouseMove}
      onMouseUp={dragMouseUp}
      onMouseDown={dragMouseDown}
      onMouseLeave={dragMouseUp}
      style={{ position: "absolute", zIndex: "410" }}
      id={id}
    >
      {props.children}
    </div>
  );
};

export default Draggable;
