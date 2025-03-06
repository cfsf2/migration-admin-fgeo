import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

const TransferTitle = (props) => {
  const history = useHistory();

  const pushHandler = () => {
    if (props.to) {
      if (props.target) {
        return window.open("/#/" + props.to, props.target);
      }
      history.push(props.to);
    }
  };
  return (
    <a
      onClick={pushHandler}
      className="btn"
      href={props.href}
      target={props.target}
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        color: "rgb(0, 120, 143)",
        //float: props.align,
        paddingBottom: 0,
        cursor:"default"
      }}
    >
      <p
        style={{
          fontSize: 12,
          paddingBottom: 0,
          marginBottom: 0,
          marginTop: 1,
          fontWeight: "bold",
          textAlign: props.align,
        }}
      >
        {props.titulo}
      </p>
      {/* <p
        style={{
          fontSize: 10,
          wordWrap: "break-word",
          paddingBottom: 0,
          marginBottom: 0,
          textAlign: props.align,
        }}
        className="text-truncate"
        title={props.subtitulo}
      >
        {props.subtitulo}
      </p> */}
    </a>
  );
};

export default TransferTitle;
