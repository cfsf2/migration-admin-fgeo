import React from "react";
import ReactDOM from "react-dom";
import "../components/Pantalla.scss";

export default function Modal({
  open,
  handleClose,
  children,
  modalContainerStyle,
}) {
  const d = open ? "block" : "none";
  modalContainerStyle.display = d;

  return ReactDOM.createPortal(
    <>
      <div
        className="pantalla-fondo-modal"
        onClick={() => handleClose(false)}
        style={{ display: d }}
      ></div>
      <div className="pantalla-modal-container" style={modalContainerStyle}>
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export const MemoizedModal = React.memo(Modal);
