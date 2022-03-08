import React from "react";
import { useLocation } from "react-router-dom";
import { image_path_server } from "../config";

export default function DisplayPdf(props) {
  const location = useLocation();
  return (
    <embed
      src={image_path_server + location.search.split("?pdf=")[1]}
      zoo="true"
      width="100%"
      height="800px"
      type="application/pdf"
    />
  );
}
