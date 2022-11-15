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
import axios from "axios";
import { farmageo_api } from "../../../config";

import { ADD_PRODUCTO_TRANSFER } from "../../../redux/actions/transfersActions";
class LineaImportTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status ?? "",
      submiting: this.props.submiting ?? false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      //this.handleSubmit();
      this.setState({
        ...this.state,
        status: this.props.status,
      });
    }
  }

  async handleSubmit() {
    this.setState({ submiting: true, status: "cargando..." });
    const {
      codigo,
      laboratorioid,
      nombre,
      presentacion,
      cantidad_minima,
      descuento_porcentaje,
      precio,
      instituciones,
    } = this.props;

    try {
      const result = await axios.post(farmageo_api + "/productosTransfers", {
        codigo: codigo,
        laboratorioid: laboratorioid,
        nombre: nombre,
        presentacion: presentacion,
        cantidad_minima: parseInt(cantidad_minima),
        descuento_porcentaje: parseInt(descuento_porcentaje),
        precio: parseFloat(precio),
        instituciones: instituciones,
      });

      this.setState({
        submiting: false,
        status: "ok",
      });
    } catch (error) {
      this.setState({
        error,
        submiting: false,
        status: "error",
      });
    }
  }

  render() {
    const {
      codigo,
      laboratorioNombre,
      nombre,
      presentacion,
      cantidad_minima,
      descuento_porcentaje,
      habilitado,
      precio,
    } = this.props;

    return (
      <tr>
        <td>{codigo}</td>
        <td>{laboratorioNombre}</td>
        <td>{nombre + " / " + presentacion}</td>
        <td>{cantidad_minima}</td>
        <td>{descuento_porcentaje}</td>
        <td>{precio}</td>
        <td>{habilitado}</td>
        <td
          style={
            this.state.status === "ok"
              ? {
                  fontWeight: "bold",
                  color: "green",
                  textTransform: "uppercase",
                }
              : null
          }
        >
          {this.state.status}
        </td>
        <td>
          {this.state.status === "error" ? (
            <button className="btn btn-success" onClick={this.handleSubmit}>
              Reintentar
            </button>
          ) : null}
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};

const mapDispatchToProps = {
  ADD_PRODUCTO_TRANSFER,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineaImportTransfer);
