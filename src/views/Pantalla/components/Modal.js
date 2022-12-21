import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "../components/Pantalla.scss";

export default function Modal({
  open,
  handleClose,
  children,
  modalContainerStyle,
  zIndex,
  data,
}) {
  const d = open ? "block" : "none";
  modalContainerStyle.display = d;

  return ReactDOM.createPortal(
    <>
      <div
        className="pantalla-fondo-modal"
        onClick={() => handleClose(false)}
        style={{ display: d, zIndex }}
      ></div>

      <div className="pantalla-modal-container" style={modalContainerStyle}>
        <div
          style={{
            background: "white",
            padding: "0.3rem 0 ",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <span
            style={{
              background: "lightgray",
              fontSize: "14px",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
            }}
            onClick={() => handleClose(false)}
          >
            X
          </span>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export const MemoizedModal = React.memo(Modal);
