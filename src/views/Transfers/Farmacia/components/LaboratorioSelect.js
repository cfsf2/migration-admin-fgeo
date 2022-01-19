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
import { GET_PRODUCTOS_TRANSFERS_BY_LAB } from "../../../../redux/actions/transfersActions";
import { image_path_server } from "../../../../config";
class LaboratorioSelect extends Component {
  render() {
    return (
      <Col md="2" style={{ marginBottom: 30 }}>
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
          <img
            src={
              this.props.laboratorio
                ? this.props.laboratorio.imagen !== undefined
                  ? image_path_server + this.props.laboratorio.imagen
                  : null
                : null
            }
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 150,
          }}
        >
          <a
            href={
              process.env.PUBLIC_URL +
              `/#/FinalizarTransfer?l=${this.props.laboratorio._id}`
            }
            style={{
              color: "#20a8d8",
              backgroundColor: "#ffffff",
              width: 150,
              fontWeight: "bold",
              fontSize: 20,
            }}
            className="btn btn-light"
            onClick={() => {
              // this.props.GET_PRODUCTOS_TRANSFERS_BY_LAB(this.props.laboratorio);
            }}
          >
            ELEGIR
          </a>
        </div>
      </Col>
    );
  }
}

const mapDispatchToProps = {
  GET_PRODUCTOS_TRANSFERS_BY_LAB,
};

export default connect(null, mapDispatchToProps)(LaboratorioSelect);
