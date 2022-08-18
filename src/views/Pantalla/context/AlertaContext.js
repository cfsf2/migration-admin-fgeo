import React, { useContext, createContext } from "react";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
// CommonJS
const S = require("sweetalert2");

export const ALERT = ({
  title,
  text,
  icon,
  confirmButtonText,
  timer = 5000,
  denyButtonText,
}) => {
  return S.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText && confirmButtonText,
    timer: timer,
    denyButtonText: denyButtonText && denyButtonText,
    showDenyButton: denyButtonText && true,
    allowOutsideClick: true,
    allowEscapeKey: true,
  });
};

const AlertasContext = createContext();

export const AlertasProvider = (props) => {
  return (
    <AlertasContext.Provider value={{ ALERT }}>
      {props.children}
    </AlertasContext.Provider>
  );
};

export default AlertasContext;
