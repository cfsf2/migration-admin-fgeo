import React from "react";

const SiNo = ({ data, campokey }) => {
  return (
    <div style={{ textAlign: "center" }}>
      {data[campokey] === "s" ? "SI" : "NO"}
    </div>
  );
};

export default SiNo;
