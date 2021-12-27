import React from "react";
import { useLocation } from "react-router-dom";
import { image_path_server } from "../../config";

export default function Tableropami() {
  const location = useLocation();
  // const { pdf } = location.state;
  return (
    <embed
      src={image_path_server + "tableroPAMI/tableropami.pdf"}
      zoo="true"
      width="100%"
      height="800px"
      type="application/pdf"
    />
  );
}
