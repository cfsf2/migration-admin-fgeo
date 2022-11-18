import React from "react";

const Default = ({ data, cab, hijos, campokey }) => {
  return (
    <div
      className={data[cab.id_a + "_className"] + cab.className}
      style={{ textAlign: "center" }}
    >
      {data[campokey]}
      {hijos}
    </div>
  );
};

export default Default;

export const Code = ({ data, cab, hijos, campokey }) => {
  return (
    <code
      className={data[cab.id_a + "_className"] + cab.className}
      style={{ textAlign: "center" }}
    >
      {data[campokey]}
      {hijos}
    </code>
  );
};
