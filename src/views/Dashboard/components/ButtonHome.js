import React, { Component, Fragment } from "react";
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

class ButtonHome extends Component {
  render() {
    return (
      <a
        className="btn"
        href={this.props.href}
        target={this.props.simple ? "" : "_blank"}
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          color: "rgb(0, 120, 143)",
          //float: this.props.align,
          paddingBottom: 0,
        }}
      >
        <Row style={{ paddingLeft: 5, paddingRight: 0 }}>
          <Col md={this.props.tipo === "grande" ? 5 : 2} sm="2" xs="2">
            {" "}
            <img src={this.props.icono} style={{ width: 25, float: "right" }} />
          </Col>
          <Col
            md={this.props.tipo === "grande" ? 7 : 10}
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
                textAlign: this.props.align,
              }}
            >
              {this.props.titulo}
            </p>
            <p
              style={{
                fontSize: 10,
                wordWrap: "break-word",
                paddingBottom: 0,
                marginBottom: 0,
                textAlign: this.props.align,
              }}
              className="text-truncate"
              title={this.props.subtitulo}
            >
              {this.props.subtitulo}
            </p>
          </Col>
        </Row>
      </a>
    );
  }
}

export default ButtonHome;
