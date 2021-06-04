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
  CardFooter,
} from "reactstrap";

import { connect } from "react-redux";

class ConfirmacionPedido extends Component {
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
            fontSize: 16,
          }}
        >
          Hemos procesado su pedido. Estaremos validando el mismo y
          actualizaremos el estado en el panel de Tranfers
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmacionPedido);
