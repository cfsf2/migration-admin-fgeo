import React from "react";

const SiNo = ({ data, campokey, indiceData, cab,id_elemento }) => {
  

  return (
    <div id={id_elemento} style={{ textAlign: "center" }}>
      {data[campokey] === "s" ? "SI" : "NO"}
    </div>
  );
};

export default SiNo;
