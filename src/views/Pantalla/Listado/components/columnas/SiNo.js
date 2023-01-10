import React from "react";

const SiNo = ({ data, campokey, indiceData, cab }) => {
  const id = JSON.stringify(data) + JSON.stringify(cab) + indiceData;

  return (
    <div id={id} style={{ textAlign: "center" }}>
      {data[campokey] === "s" ? "SI" : "NO"}
    </div>
  );
};

export default SiNo;
