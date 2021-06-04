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

import { image_path_server } from "../../../../config";

class LineaProductoProveeduria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linea: {
        _id: this.props.prod._id,
        codigo_producto: this.props.prod.sku,
        cantidad: "",
        observacion: "",
        nombre: this.props.prod.nombre,
        precio: (this.props.prod.precio_con_IVA / 1.21).toFixed(2), //precio de compra sin iva
        rentabilidad: (
          (this.props.prod.rentabilidad * this.props.prod.precio_con_IVA) /
          100
        ).toFixed(2),
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.rentabilidad !== this.props.rentabilidad) {
      await this.setState({
        linea: {
          ...this.state.linea,
          precio: (
            (this.props.prod.precio / 1.21) *
            ((100 - this.props.rentabilidad) / 100)
          ).toFixed(2), //precio de compra sin iva
        },
      });
    }
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      linea: { ...this.state.linea, [name]: value },
    });

    this.props.handleLineaChange(this.state.linea, 1);
  }
  render() {
    const { prod, entidad_selected } = this.props;
    return !this.props.finalizar ? (
      <Fragment>
        <tr>
          <td>{prod.sku}</td>
          <td>{prod.nombre}</td>

          {entidad_selected == null ? null : entidad_selected.iscampaign ? (
            <td>$ {this.state.linea.precio}</td>
          ) : (
            <>
              <td>
                <CardImg
                  src={
                    prod.imagen !== undefined
                      ? image_path_server + prod.imagen
                      : null
                  }
                  style={{
                    backgroundColor: "#ffffff",
                    width: 80,
                  }}
                />
              </td>
              <td>$ {prod.precio}</td>
              <td>$ {this.state.linea.rentabilidad}</td>
              <td>$ {this.state.linea.precio}</td>
            </>
          )}
          <td>
            <Input
              type="number"
              name="cantidad"
              defaultValue={null}
              value={this.state.linea ? this.state.linea.cantidad : undefined}
              onChange={this.handleInputChange}
              style={{
                backgroundColor: this.state.linea
                  ? this.state.linea.cantidad < 1 &&
                    this.state.linea.cantidad != ""
                    ? "#ff00002e"
                    : null
                  : null,
              }}
            />
          </td>
          <td>
            {" "}
            {this.state.linea.cantidad != ""
              ? (
                  parseFloat(this.state.linea.precio) *
                  parseInt(this.state.linea.cantidad)
                ).toFixed(2)
              : undefined}
          </td>
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
                this.state.linea.cantidad < 1 || this.state.linea.cantidad == ""
              }
            />
          </td>
        </tr>
      </Fragment>
    ) : this.state.linea.cantidad >= 1 ? (
      <Fragment>
        <tr>
          <td>{prod.sku}</td>
          <td>{prod.nombre}</td>
          {entidad_selected == null ? null : entidad_selected.iscampaign ? (
            <td>$ {this.state.linea.precio}</td>
          ) : (
            <>
              <td>
                <CardImg
                  src={
                    prod.imagen !== undefined
                      ? image_path_server + prod.imagen
                      : null
                  }
                  style={{
                    backgroundColor: "#ffffff",
                    width: 80,
                  }}
                />
              </td>
              <td>{prod.precio}</td>
              <td>${this.state.linea.rentabilidad}</td>
              <td>$ {this.state.linea.precio}</td>
            </>
          )}
          <td>
            <Input
              type="number"
              name="cantidad"
              defaultValue={null}
              value={this.state.linea ? this.state.linea.cantidad : undefined}
              onChange={this.handleInputChange}
            />
          </td>
          <td>
            {" "}
            {this.state.linea.cantidad != ""
              ? (
                  parseFloat(this.state.linea.precio) *
                  parseInt(this.state.linea.cantidad)
                ).toFixed(2)
              : undefined}
          </td>
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
                this.state.linea.cantidad < 1 || this.state.linea.cantidad == ""
              }
            />
          </td>
        </tr>
      </Fragment>
    ) : null;
  }
}

export default LineaProductoProveeduria;
