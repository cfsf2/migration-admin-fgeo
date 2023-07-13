import React from "react";

const Default = ({ data, cab, hijos, campokey, indiceData, id_elemento }) => {
  const condcionBadge = cab.id_a === "T_COL_ID_TRANSFER" && "0.9em";

  const regex =  /^[0-9]+\.[0-9]+$/;;
  const number = regex.test(data[campokey]); // true
  
  return (
    <div
      id={id_elemento}
      className={data[cab.id_a + "_className"]}
      style={{ textAlign: cab.align ?? "center", fontSize: condcionBadge }}
    >
      {number ? data[campokey].toFixed(2) : data[campokey]}
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
  return (
    <code
      id={id_elemento}
      className={data[cab.id_a + "_className"]}
      style={{ textAlign: "center", color: "red" }}
    >
      {data[campokey]}
      {hijos}
    </code>
  );
};
