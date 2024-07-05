import React from "react";

const Obligatorio = (props) => {
  const { permite_null, opcionales_null } = props;
  if (!permite_null && !opcionales_null) return <></>;
  return (
    <div style={{ color: "red", display: "inline-block", width: "fit-content" }}>
      {opcionales_null === "s" ? "**" : permite_null === "n" ? "*" : <></>}
    </div>
  );
};

export default Obligatorio;
