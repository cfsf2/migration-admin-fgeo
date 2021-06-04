import React, { Component, Fragment } from "react";
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
  CardFooter
} from "reactstrap";

class TareasMantenimiento extends Component {
  render() {
    return (
      <div className="animated fadeIn" style={{ margin: 30, padding: 30 }}>
        <div
          style={{
            backgroundColor: "#20a8d8",
            color: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            fontSize: 16
          }}
        >
          Estamos realizando tareas de mantenimiento, disculpe las molestias
          ocacionadas.
        </div>
      </div>
    );
  }
}

export default TareasMantenimiento;
