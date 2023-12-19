import React, { useEffect, useCallback } from "react";
import Like from "./filtros/Like";
import Number from "./filtros/Number";
import Fecha from "./filtros/Fecha";
import SelectF from "./filtros/Select";
import CheckboxF from "./filtros/Checkbox";
import RadioF from "./filtros/RadioButton";
import AutocompletarF from "./filtros/AutocompletarF";

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
      case "autocompletar":
        return <AutocompletarF {...props} />;
      default:
        return <></>;
    }
  })();

  if (componente === "hidden") return <></>;
  if (componente === "grupo_filtros") return <></>;

  function calcGridColumn(cab) {
    const { grid_span, grid_area } = cab;

    if (grid_area && grid_area !== "") {
      return {
        gridArea: grid_area,
      };
    }

    if ((!grid_area || grid_area === "") && grid_span && grid_span !== "") {
      return {
        gridColumn: grid_span,
      };
    }

    return { gridColumn: "span 5 / auto" };
  }

  const grids = calcGridColumn(props);

  return (
    <div
      id={props.id_a}
      className="filtro_grid_int"
      style={Object.assign(
        {
          alignSelf:
            componente in ["like", "autocompletar", "filtro_buscador"]
              ? "center"
              : "start",
        },
        grids
      )}
    >
      {Componente}
    </div>
  );
};

export default SwitchFiltros;
