import React from "react";
import { useLocation } from "react-router-dom";

export default function Tableropami() {
  const location = useLocation();
  const { pdf } = location.state;
  return (
    <embed
      src={pdf}
      zoo="true"
      width="100%"
      height="800px"
      type="application/pdf"
    />
  );
}
