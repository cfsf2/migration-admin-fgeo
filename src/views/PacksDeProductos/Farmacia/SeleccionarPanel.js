import React, { Component } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  CardImg,
  Label,
  CardFooter,
} from "reactstrap";

class SeleccionarPanel extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="3" xs="12" style={{ marginTop: 30 }} align="center">
            <a href={process.env.PUBLIC_URL+"/#/PacksDeProductosFarmacia"}>
              <div
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 30,
                }}
              >
                <p
                  style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    color: "#20a8d8",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Productos Farmageo
                </p>
              </div>
            </a>
          </Col>
          <Col md="3" xs="12" style={{ marginTop: 30 }} align="center">
            <a href={process.env.PUBLIC_URL+"/#/productos"}>
              <div
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 30,
                }}
              >
                <p
                  style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    color: "#20a8d8",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Mis productos
                </p>
              </div>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SeleccionarPanel;
