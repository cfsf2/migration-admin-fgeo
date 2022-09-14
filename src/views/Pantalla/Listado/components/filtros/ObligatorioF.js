import React from "react";

const Obligatorio = (props) => {
  const { permite_null, opcionales_null } = props;

  return (
    <div style={{ color: "red", display: "inline-block" }}>
      {opcionales_null === "s" ? "**" : permite_null === "n" ? "*" : <></>}
    </div>
  );
};

export default Obligatorio;
