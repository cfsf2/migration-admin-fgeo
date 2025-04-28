import React from "react";
import { useHistory } from "react-router-dom";
import {
  Col,
  Row,
} from "reactstrap";

const ButtonHome = (props) => {
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
    <div>
      <a
        onClick={pushHandler}
        className="btn"
        href={props.href}
        target={props.target}
        style={{
          width: "100%",
          color: "rgb(0, 120, 143)",
          //float: props.align,
          paddingBottom: 0,
        }}
      >
        <Row style={{ paddingLeft: 5, paddingRight: 0, alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' }}>
        <Col xs="3" style={{ textAlign: "center" }}>
          <img src={props.icono} style={{ width: "25px", maxHeight: "40px" }} />
        </Col>
        <Col xs="9" style={{ textAlign: props.align, minWidth: 0 }}>
          <p
            style={{
              fontSize: 12,
              marginBottom: 0,
              marginTop: 1,
              fontWeight: "bold",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {props.titulo}
          </p>
          <p
            style={{
              fontSize: 10,
              marginBottom: 0,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            title={props.subtitulo}
          >
            {props.subtitulo}
          </p>
        </Col>
        </Row>
      </a>
    </div>
  );
};

export default ButtonHome;
