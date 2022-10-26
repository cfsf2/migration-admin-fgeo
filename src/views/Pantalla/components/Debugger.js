import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";

import ReactDOM from "react-dom";

import PantallaContext from "../context/PantallaContext";
import { Link } from "react-router-dom";

import Draggable from "./Draggable";

const Debugger = () => {
  const { sql } = useContext(PantallaContext);
  const ref = useRef();
  const id = "Debugger";

  const [height, setH] = useState();
  const [display, setDisplay] = useState(false);

  const obs = new ResizeObserver((entries) => {
    if (!entries) return;
    setH(entries[0].contentRect.height);

    return entries[0].contentRect;
  });

  useEffect(() => {
    const debug = document.getElementById(id);
    if (debug) {
      debug.scrollTop = debug.scrollHeight;
      if (ref.current.render !== 1) {
        obs.observe(debug);
        ref.current.render = 1;
      }
    }
  }, [obs, sql.length]);

  useLayoutEffect(() => {
    const debug = document.getElementById(id);
    if (debug) {
      const { parentElement } = debug;
      parentElement.style.marginTop = height + "px";
    }
  }, [height]);

  if (sql.length === 0) return <></>;

  const element = (
    <Draggable top="100px" left="250px">
      <button
        onClick={() => setDisplay((s) => !s)}
        style={{ padding: "1rem 2rem", background: "lightgray" }}
      >
        SQLs
      </button>
    </Draggable>
  );
  const root = ReactDOM.createPortal(
    element,
    document.getElementById("modal-root")
  );

  return (
    <>
      {root}
      <div
        style={{
          position: "fixed",
          top: 0,
          background: "white",
          height: "15vh",
          maxHeight: "50vh",
          overflowY: "scroll",
          resize: "vertical",
          zIndex: "400",
          marginTop: "50px",
          borderBottom: "1px black solid",
          display: display ? "inherit" : "none",
        }}
        id={id}
        ref={ref}
      >
        <code>
          {sql.map((s) => {
            if (!s) return <></>;
            if (s.conf === "Separador")
              return (
                <div style={{ marginTop: "0.8rem" }}>
                  <hr />
                  <h5>{s.sql}</h5>
                </div>
              );
            return (
              <div style={{ fontSize: "1rem" }}>
                <Link
                  to={{
                    pathname: "Vista/PANTALLA_VISTA_CONFIGURACION",
                    search: "id=" + s.confId,
                  }}
                  target="_blank"
                >
                  <h4>{s.conf}</h4>
                </Link>
                <code>{s.sql}</code>
              </div>
            );
          })}
        </code>
      </div>
    </>
  );
};

export default Debugger;
