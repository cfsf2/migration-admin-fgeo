import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Container,
  Spinner,
} from "reactstrap";

export default function MisVentas(props) {
  return (
    <Card>
      <CardHeader>
        <b>MIS VENTAS</b>
      </CardHeader>
      <CardBody>
        <Row>
          <Col
            md="6"
            xs="12"
            style={{
              height: 80,
              marginTop: 15,
              marginBottom: 15,
              width: "100%",
            }}
            align="center"
          >
            <p
              style={{
                fontSize: 18,
                paddingBottom: 0,
                marginBottom: 0,
                marginTop: 18,
              }}
            >
              $0.00
            </p>
            <hr />
            <p style={{ fontSize: 10 }}>Ventas netas este mes</p>
          </Col>
          <Col
            md="6"
            xs="12"
            style={{
              height: 80,
              marginTop: 15,
              marginBottom: 15,
              width: "100%",
            }}
            align="center"
          >
            <p
              style={{
                fontSize: 18,
                paddingBottom: 0,
                marginBottom: 0,
                marginTop: 18,
              }}
            >
              ...
            </p>
            <hr />
            <p style={{ fontSize: 10 }}>Es el más vendido este mes </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
