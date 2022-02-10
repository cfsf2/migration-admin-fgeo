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
      <Col md="3" sm="4" lg="3" xl="2" style={{ marginBottom: 30 }}>
        <a
          href={
            process.env.PUBLIC_URL +
            `/#/FinalizarTransfer?l=${this.props.laboratorio._id}`
          }
          // className="btn btn-light"
          onClick={() => {
            this.props.GET_PRODUCTOS_TRANSFERS_BY_LAB(this.props.laboratorio);
          }}
        >
          <div
            className="transfer_laboratorioSelect_hover"
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
              alt={this.props.laboratorio.nombre}
            />
          </div>

          {/* <div
            style={{
              padding: "3px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "150px",
              background: "aliceblue",
              whiteSpace: "normal",
            }}
          >
            {this.props.laboratorio.nombre}
          </div> */}
        </a>
      </Col>
    );
  }
}

const mapDispatchToProps = {
  GET_PRODUCTOS_TRANSFERS_BY_LAB,
};

export default connect(null, mapDispatchToProps)(LaboratorioSelect);
