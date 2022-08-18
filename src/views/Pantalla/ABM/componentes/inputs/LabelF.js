import React from "react";
import Obligatorio from "./ObligatorioF";

const Label = (props) => {
  return (
    <h4>
      {props.label}{" "}
      <Obligatorio
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
    </h4>
  );
};

export default Label;
