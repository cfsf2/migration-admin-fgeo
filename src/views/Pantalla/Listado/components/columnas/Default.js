import React from "react";

const Default = ({ data, cab, hijos, campokey }) => {
  return (
    <div className={cab.class} style={{ textAlign: "center" }}>
      {data[campokey]}
      {hijos}
    </div>
  );
};

export default Default;

export const Code = ({ data, cab, hijos, campokey }) => {
  return (
    <code className={cab.class} style={{ textAlign: "center" }}>
      {data[campokey]}
      {hijos}
    </code>
  );
};
