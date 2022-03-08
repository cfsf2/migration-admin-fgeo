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

import { image_path_server } from "../../../../config";

class LineaProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linea: {
        _id: this.props.prod._id,
        codigo_producto: this.props.prod.codigo,
        cantidad: "",
        observacion: "",
        nombre: this.props.prod.nombre + "  " + this.props.prod.presentacion
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      linea: { ...this.state.linea, [name]: value }
    });

    this.props.handleLineaChange(
      this.state.linea,
      this.props.prod.cantidad_minima
    );
  }
  render() {
    const { prod } = this.props;
    return !this.props.finalizar ? (
      <Fragment>
        <tr>
          <td>{prod.codigo}</td>
          <td>
            {prod.nombre} / {prod.presentacion}
          </td>
          <td>
            <CardImg
              src={
                prod.imagen !== undefined
                  ? image_path_server + prod.imagen
                  : null
              }
              style={{
                backgroundColor: "#ffffff",
                width: 80
              }}
            />
          </td>
          <td></td>
          <td>{prod.descuento_porcentaje}</td>
          <td>
            <Input
              type="number"
              name="cantidad"
              defaultValue={null}
              value={this.state.linea ? this.state.linea.cantidad : undefined}
              onChange={this.handleInputChange}
              style={{
                backgroundColor: this.state.linea
                  ? this.state.linea.cantidad < prod.cantidad_minima &&
                    this.state.linea.cantidad != ""
                    ? "#ff00002e"
                    : null
                  : null
              }}
            />
          </td>
          <td></td>
          <td>{prod.cantidad_minima}</td>
          <td>
            <Input
              type="text"
              name="observacion"
              defaultValue={null}
              value={
                this.state.linea ? this.state.linea.observacion : undefined
              }
              onChange={this.handleInputChange}
              disabled={
                this.state.linea.cantidad < prod.cantidad_minima ||
                this.state.linea.cantidad == ""
              }
            />
          </td>
        </tr>
      </Fragment>
    ) : this.state.linea.cantidad >= prod.cantidad_minima ? (
      <Fragment>
        <tr>
          <td>{prod.codigo}</td>
          <td>
            {prod.nombre} / {prod.presentacion}
          </td>
          <td>
            <CardImg
              src={
                prod.imagen !== undefined
                  ? image_path_server + prod.imagen
                  : null
              }
              style={{
                backgroundColor: "#ffffff",
                width: 80
              }}
            />
          </td>
          <td></td>
          <td>{prod.descuento_porcentaje}</td>

          <td>
            <Input
              type="number"
              name="cantidad"
              defaultValue={null}
              value={this.state.linea ? this.state.linea.cantidad : undefined}
              onChange={this.handleInputChange}
            />
          </td>
          <td></td>
          <td>{prod.cantidad_minima}</td>
          <td>
            <Input
              type="text"
              name="observacion"
              defaultValue={null}
              value={
                this.state.linea ? this.state.linea.observacion : undefined
              }
              onChange={this.handleInputChange}
              disabled={
                this.state.linea.cantidad < prod.cantidad_minima ||
                this.state.linea.cantidad == ""
              }
            />
          </td>
        </tr>
      </Fragment>
    ) : null;
  }
}

export default LineaProducto;
