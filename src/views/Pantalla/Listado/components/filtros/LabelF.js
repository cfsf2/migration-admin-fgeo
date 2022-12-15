import React from "react";
import Obligatorio from "./ObligatorioF";
import "../filtros.scss";

const Label = (props) => {
  return (
    <h5 className="filtro_grid_radio_button_label">
      {props.label}{" "}
      <Obligatorio
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
    </h5>
  );
};

export default Label;
