import React from "react";
import Obligatorio from "./ObligatorioF";

const Label = (props) => {
  return (
    <h5>
      {props.label}{" "}
      <Obligatorio
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
    </h5>
  );
};

export default Label;
