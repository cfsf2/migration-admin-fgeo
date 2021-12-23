// ES6 Modules or TypeScript
import Swal from "sweetalert2";

// CommonJS
const S = require("sweetalert2");

export const ALERT = (title, text, icon, confirmButtonText, timer = 50000) => {
  return S.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
    timer: timer,
  });
};
