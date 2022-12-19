import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "../components/Pantalla.scss";
import ModalesContext from "../context/ModalContext";

export default function Modal({
  open,
  handleClose,
  children,
  modalContainerStyle,
  zIndex,
  data,
}) {
  const modalContext = useContext(ModalesContext);
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
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export const MemoizedModal = React.memo(Modal);
