import React, { Component, Fragment } from "react";
import axios from "axios";
import { farmageo_api } from "../../../config";

class LineaImportPack extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "", submiting: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.action !== this.props.action) {
      //console.log('submiting...')
      this.handleSubmit();
      //this.setState({ submiting: true, status: "cargando..." });
    }
  }

  async handleSubmit() {
    this.setState({ submiting: true, status: "cargando..." });
    const {
      sku,
      entidad_id,
      categoria_id,
      nombre,
      descripcion,
      precio,
      precio_con_IVA,
      rentabilidad,
    } = this.props;

    try {
      const result = await axios.post(farmageo_api + "/productospack", {
        sku: sku,
        entidad_id: entidad_id,
        categoria_id: categoria_id,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),
        precio_con_IVA: parseFloat(precio_con_IVA),
        rentabilidad: parseInt(rentabilidad),
      });
      console.log(result.data);
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
      sku,
      entidadNombre,
      nombre,
      categoriaNombre,
      descripcion,
      precio,
      precio_con_IVA,
      rentabilidad,
    } = this.props;

    return (
      <tr>
        <td>{sku}</td>
        <td>{entidadNombre}</td>
        <td>{categoriaNombre}</td>
        <td>{nombre}</td>
        <td>{descripcion}</td>
        <td>{precio_con_IVA}</td>
        <td>{rentabilidad}</td>
        <td>{precio}</td>
        <td>{this.state.status}</td>
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

export default LineaImportPack;
