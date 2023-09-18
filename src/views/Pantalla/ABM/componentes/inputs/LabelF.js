import React from "react";
import Obligatorio from "./ObligatorioF";

const Label = (props) => {
  return (
    <div style={{ fontSize: "1rem" }}>
      {props.label}{" "}
      <Obligatorio
        opcionales_null={props.opcionales_null}
        permite_null={props.permite_null}
      />
    </div>
  );
};

export default Label;
