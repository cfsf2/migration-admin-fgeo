import React from "react";

const Default = ({ data, cab, hijos, campokey }) => {
  const condcionBadge = cab.id_a === "T_COL_ID_TRANSFER" && "0.9em";

  return (
    <div
      className={data[cab.id_a + "_className"]}
      style={{ textAlign: "center", fontSize: condcionBadge }}
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
      className={data[cab.id_a + "_className"]}
      style={{ textAlign: "center", color: "red" }}
    >
      {data[campokey]}
      {hijos}
    </code>
  );
};
