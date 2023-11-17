import React from "react";

const SiNo = ({ data, campokey, indiceData, cab,id_elemento }) => {
  
  const classNames = data[cab.id_a + "_className"] ?? cab.className;
  return (
    <div id={id_elemento} style={{ textAlign: "center" }} className={classNames}>
      {data[campokey] === "s" ? "SI" : "NO"}
    </div>
  );
};

export default SiNo;
