import React from "react";
import ReactDOM from "react-dom";
import "../components/modal.scss";

export default function Modal({ open, handleClose, children }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fondo-modal" onClick={() => handleClose(false)}></div>
      <div className="modal-container">{children}</div>
    </>,
    document.getElementById("modal-root")
  );
}
