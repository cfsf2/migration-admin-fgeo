import React from "react";

import "./instituciones.scss";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  CardImg,
  CardFooter,
} from "reactstrap";

export default function AltaInstituciones(props) {
  return (
    <div className="animated fadeIn altainstituciones">
      <Row>
        <Col>
          <Card>
            <CardHeader>Alta de instituciones</CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
