import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const OrixiaSpinner = ({ text, spinner }) => {
  const _spinner = spinner ?? (
    <FontAwesomeIcon icon={faCircleNotch} spin style={{ fontSize: "50px" }} />
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "20px",
        flexDirection: "column",
        fontSize: "16px",
        color: "#006f7a",
      }}
    >
      {_spinner}
      <div style={{ marginTop: "10px" }}>{text}</div>
    </div>
  );
};

export default OrixiaSpinner;
