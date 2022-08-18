import React, { useEffect, useCallback } from "react";
import Like from "./filtros/Like";
import Number from "./filtros/Number";
import Fecha from "./filtros/Fecha";
import SelectF from "./filtros/Select";
import CheckboxF from "./filtros/Checkbox";
import RadioF from "./filtros/RadioButton";

const SwitchFiltros = (props) => {
  useEffect(() => {
    const abortController = new AbortController();
    const { setFiltrosAAplicar, id_a } = props;

    setFiltrosAAplicar((prevState) => {
      return {
        ...prevState,
        [id_a]: props.default,
      };
    });

    return () => {
      abortController.abort();
    };
  }, [props.default]);

  const { componente } = props;
  const Componente = (() => {
    switch (componente) {
      case "like":
        return <Like {...props} />;
      case "number":
        return <Number {...props} />;
      case "fecha":
        return <Fecha {...props} />;
      case "fecha_simple":
        return <Fecha {...props} />;
      case "select":
        return <SelectF {...props} />;
      case "checkbox":
        return <CheckboxF {...props} />;
      case "radio":
        return <RadioF {...props} />;
      default:
        return <></>;
    }
  })();

  return Componente;
};

export default SwitchFiltros;
