export function agregarPropiedades(objetivo, fuente, keys) {
  for (let key of keys) {
    if (fuente.hasOwnProperty(key)) {
      objetivo[key] = fuente[key];
    }
  }
}

export function eliminarKeys(objeto, keys) {
  for (let key of keys) {
    if (objeto.hasOwnProperty(key)) {
      delete objeto[key];
    }
  }
}

export function fusionarPropiedades(objetivo, fuente, keys) {
  const nuevoObjeto = { ...objetivo };

  for (let key of keys) {
    if (fuente.hasOwnProperty(key)) {
      nuevoObjeto[key] = fuente[key];
    }
  }

  return nuevoObjeto;
}

export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
}

export function updateUrlWithQueryString(obj) {
  const queryString = objectToQueryString(obj);
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
  window.history.pushState({ path: newUrl }, '', newUrl);
}


const acciones = [
  //"historial_activo",
  "imprimir_activo",
  "excel_activo",
  "email_activo",
  "configuracion_usuario_activo",
  "configuracionesDeListado",
];

export function fusionarAcciones(opPantalla, opConf) {
  if (!opConf) return opPantalla;
  if (!opPantalla) return opConf;
  if (!opConf && !opPantalla) return {};

  const opConfTieneTitulo = opConf.titulo && opConf.titulo !== "";
  const opPantallaTieneTitulo = opPantalla.titulo && opPantalla.titulo !== "";

  if (opConf.padre === opPantalla.id_a && opConf.orden === 1) {
    if (opConfTieneTitulo) {
      return fusionarPropiedades(opConf, opPantalla, acciones);
    }

    if (!opConfTieneTitulo && opPantallaTieneTitulo) {
      return fusionarPropiedades(opPantalla, opConf, acciones);
    }

    if (!opConfTieneTitulo && !opPantallaTieneTitulo) {
      return fusionarPropiedades(opConf, opPantalla, acciones);
    }
  }
}

export function agregarAcciones(opPantalla, opConf) {
  const opConfTieneTitulo = opConf.titulo && opConf.titulo !== "";
  const opPantallaTieneTitulo = opPantalla.titulo && opPantalla.titulo !== "";

  if (opConf.padre === opPantalla.id_a && opConf.orden === 1) {
    if (opConfTieneTitulo) {
      agregarPropiedades(opConf, opPantalla, acciones);
      return eliminarKeys(opPantalla, acciones);
    }

    if (!opConfTieneTitulo && opPantallaTieneTitulo) {
      agregarPropiedades(opPantalla, opConf, acciones);
      return eliminarKeys(opConf, acciones);
    }

    if (!opConfTieneTitulo && !opPantallaTieneTitulo) {
      agregarPropiedades(opConf, opPantalla, acciones);
      return eliminarKeys(opPantalla, acciones);
    }
  }
}

export function convertirANumero(str) {
  if (/^\d+$/.test(str)) {
    // Verifica si el string contiene solo números
    return Number(str); // Convierte el string en número
  } else {
    return str; // Devuelve el string sin cambios
  }
}

export function esMinuscula(caracter) {
  return caracter === caracter.toLowerCase();
}

export function esNumeroOStringDeNumeros(variable) {
  return !isNaN(variable) && variable !== "" && /^\d+$/.test(variable);
}


export function focusFirstFocusableChild(parentElement) {
  // Si no se pasa un elemento, buscarlo por id
  if (typeof parentElement === "string") {
    //parentElement = document.getElementById(parentElement);
    parentElement = document.querySelector(`[id*="${parentElement}"]`);
    if (!parentElement) {
      console.error("Elemento no encontrado con id:", parentElement);
      return null;
    }
  }

  // Buscar el primer hijo focusable
  for (let child of parentElement.children) {
    if (isFocusable(child)) {
      child.focus(); // Aplica el foco directamente al hijo focusable
      child.scrollIntoView({
        behavior: "smooth", // Para un desplazamiento suave
        block: "center", // Alinea el elemento en el centro de la pantalla
      });
      child.classList.add("focus-highlight");
      if (child.tagName === "SELECT") {
        child.click();
      }
      setTimeout(() => {
        child.classList.remove("focus-highlight");
      }, 1000); // El efecto durará 2 segundos
      return child; // Retorna el elemento al que se le hizo foco
    }

    // Si el hijo tiene hijos, buscar recursivamente en esos hijos
    const focusableChild = focusFirstFocusableChild(child);
    if (focusableChild) {
      return focusableChild; // Si encuentra un hijo focusable, devolverlo
    }
  }

  return null; // Si no se encuentra ningún hijo focusable
}

export function isFocusable(element) {
  // Comprobar si el elemento es un input, textarea, select, button o enlace con href
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLButtonElement ||
    (element instanceof HTMLAnchorElement && element.hasAttribute("href"))
  ) {
    return true;
  }

  // Comprobar si el elemento tiene un atributo tabindex
  if (element.hasAttribute("tabindex") && element.tabIndex >= 0) {
    return true;
  }

  // Comprobar si el elemento es editable
  if (
    element.hasAttribute("contenteditable") &&
    element.getAttribute("contenteditable") !== "false"
  ) {
    return true;
  }

  return false; // Si no cumple con ninguno de los casos anteriores, no es focusable
}

export function tryFocusWithRetry(parentElement, retries = 5, delay = 500) {
  // Intenta hacer foco hasta un número de reintentos
  function attemptFocus() {
    const focusableElement = focusFirstFocusableChild(parentElement);

    // Si se encontró y se le pudo hacer foco
    if (focusableElement) {
      console.log("Foco aplicado a:", focusableElement);
      return true;
    }

    // Si no se pudo aplicar el foco y todavía hay reintentos disponibles
    if (retries > 0) {
      console.log("No se pudo aplicar foco, reintentando...");
      setTimeout(() => {
        tryFocusWithRetry(parentElement, retries - 1, delay); // Llama a la función de nuevo con menos reintentos
      }, delay); // Espera un tiempo antes de reintentar
    } else {
      console.log("No se pudo aplicar foco después de varios intentos.");
      console.log(focusableElement);
    }

    return false;
  }

  attemptFocus(); // Inicia el intento de aplicar foco
}

export function getLoginURL() {
  const urlActual = encodeURIComponent(window.location.href);
  const publicUrl = process.env.PUBLIC_URL;
  return `${publicUrl}/#/login?from=${urlActual}`;
}

export function goToLogin() {
  const loginURL = getLoginURL();
  document.body.style.cursor = "default";
  return window.location.replace(loginURL);
}