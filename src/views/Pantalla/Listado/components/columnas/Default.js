import React from "react";

const Default = ({ data, cab, hijos, campokey, indiceData, id_elemento }) => {
  const condcionBadge = cab.id_a === "T_COL_ID_TRANSFER" && "0.9em";

  const valor = cab.round
    ? Number(data[campokey]).toFixed(cab.round)
    : data[campokey];
  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <div
      id={id_elemento}
      className={classNames}
      style={{ textAlign: cab.align ?? "center", fontSize: condcionBadge }}
    >
      {valor}
      {hijos}
    </div>
  );
};

export default Default;

export const Code = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  id_elemento,
}) => {
  const classNames = data[cab.id_a + "_className"] ?? cab.className;
  return (
    <code
      id={id_elemento}
      className={classNames}
      style={{ textAlign: "center", color: "red" }}
    >
      {data[campokey]}
      {hijos}
    </code>
  );
};
