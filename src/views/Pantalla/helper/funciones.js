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

  const acciones = [
    //"historial_activo",
    "imprimir_activo",
    "excel_activo",
    "email_activo",
    "configuracion_usuario_activo",
    "configuracionesDeListado",
  ];
  

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
