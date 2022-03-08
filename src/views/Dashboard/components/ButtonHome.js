import { CompassCalibrationOutlined } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { useHistory } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Container,
} from "reactstrap";

const ButtonHome = (props) => {
  const history = useHistory()
  const pushHandler = ()=>{
    if(props.to)
    history.push(props.to)
  }
  return (
    <div>

      <a
        onClick={pushHandler}
        className="btn"
        href={props.href}
        target={props.simple ? "" : "_blank"}
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          color: "rgb(0, 120, 143)",
          //float: props.align,
          paddingBottom: 0,
        }}
      >
        <Row style={{ paddingLeft: 5, paddingRight: 0 }}>
          <Col md={props.tipo === "grande" ? 5 : 2} sm="2" xs="2">
            {" "}
            <img src={props.icono} style={{ width: 25, float: "right" }} />
          </Col>
          <Col
            md={props.tipo === "grande" ? 7 : 10}
            xs="10"
            sm="10"
            style={{ float: "left" }}
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
            <p
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
            </p>
          </Col>
        </Row>
      </a>
    </div>
  );
}


export default ButtonHome;
