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
