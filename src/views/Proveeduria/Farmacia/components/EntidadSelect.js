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
import { GET_PRODUCTOS_PACK_BY_ENTIDAD } from "../../../../redux/actions/packsproductosActions";
import { image_path_server } from "../../../../config";
class EntidadSelect extends Component {
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
            padding: this.props.entidad
              ? this.props.entidad.styleLogo
                ? this.props.entidad.styleLogo.padding
                : 30
              : null,
          }}
        >
          <img
            src={
              this.props.entidad
                ? this.props.entidad.logo !== undefined
                  ? image_path_server + this.props.entidad.logo
                  : null
                : null
            }
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              borderRadius: this.props.entidad
                ? this.props.entidad.styleLogo
                  ? this.props.entidad.styleLogo.borderRadius
                  : 0
                : null,
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
            href={process.env.PUBLIC_URL+"/#/FinalizarSolicitudProveeduria"}
            style={{
              color: "#20a8d8",
              backgroundColor: "#ffffff",
              width: 150,
              fontWeight: "bold",
              fontSize: 20,
            }}
            className="btn btn-light"
            onClick={() => {
              this.props.GET_PRODUCTOS_PACK_BY_ENTIDAD(this.props.entidad);
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
  GET_PRODUCTOS_PACK_BY_ENTIDAD,
};

export default connect(null, mapDispatchToProps)(EntidadSelect);
