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
import LineaProductoProveeduria from "./components/LineaProductoProveeduria";

import {
  ADD_SOLICITUD_PROVEEDURIA,
  SUBMITTING,
} from "../../../redux/actions/packsproductosActions";

class FinalizarSolicitudProveeduria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudProveeduria: {
        fecha: new Date(Date.now()).toISOString().substring(0, 10),
      },
      productos: [],
      finalizar: false,
      vistaprevia: false,
      submitting: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFiltroFinalizar = this.handleFiltroFinalizar.bind(this);
    this.handleVistaPrevia = this.handleVistaPrevia.bind(this);
    this.handleLineaChange = this.handleLineaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createHtmlMail = this.createHtmlMail.bind(this);
    this.handleLimpiarProductos = this.handleLimpiarProductos.bind(this);
  }

  handleFiltroFinalizar(value) {
    this.setState({
      finalizar: value,
    });
  }

  handleVistaPrevia(value) {
    this.setState({
      vistaprevia: value,
    });
  }

  handleLimpiarProductos() {
    this.setState({
      productos: [],
    });
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      solicitudProveeduria: {
        ...this.state.solicitudProveeduria,
        [name]: value,
      },
    });
  }

  async handleLineaChange(linea, minimo) {
    // console.log(linea);
    let _productos = await this.state.productos.filter((p) => {
      return p._id != linea._id;
    });

    if (linea.cantidad >= minimo) {
      _productos = await _productos.concat(linea);
    }

    await this.setState({
      productos: _productos,
    });
  }

  createHtmlMail = async (solicitudProveeduria, direccioncompleta) => {
    const { entidad_selected } = this.props.packsproductosReducer;

    let body = await `<head>
                        <style>
                          table {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                          }
                          
                          td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                          }
                          
                          tr:nth-child(even) {
                            background-color: #dddddd;
                          }

                        </style>
                      </head>
                      <body>
                        <div>
                          <p><b>Farmacia: </b>${
                            solicitudProveeduria.farmacia_nombre
                          }</p>
                          <p><b>Nº Farmacia: </b>${
                            solicitudProveeduria.farmacia_id
                          }</p>
                          <p><b>Nº Cuit: </b>${
                            solicitudProveeduria.cuit
                          }</p>
                          <p><b>Dirección: </b>${direccioncompleta}</p>
                          <p><b>Entidad: </b>${
                            solicitudProveeduria.entidad_id
                          }</p>
                          ${
                            entidad_selected.iscampaign
                              ? ""
                              : `<p><b>N° de cuenta de Droguería: </b>${solicitudProveeduria.nro_cuenta_drogueria}</p>`
                          }
                        </div>
                      <table>
                          <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>
                            ${
                              entidad_selected.iscampaign
                                ? `Precio`
                                : `Precio Compra (sin IVA)`
                            }
                            </th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Observaciones</th>
                          </tr>
                        <tbody>
                        ${solicitudProveeduria.productos_solicitados.map(
                          (p) => {
                            return `<tr>
                                    <td>${p.codigo_producto}</td>
                                    <td>${p.nombre}</td>
                                    <td>${p.precio}</td>
                                    <td>${p.cantidad}</td>
                                    <td>${(p.cantidad * p.precio).toFixed(
                                      2
                                    )}<td>
                                    <td><p>${p.observacion}</p></td>
                                  </tr>`;
                          }
                        )}
                        </tbody>
                      </table>
                    </body>`;
    return body;
  };

  async handleSubmit() {
    const { farmaciaid, email, nombre, direccioncompleta, cuit } =
      this.props.authReducer.userprofile;

    const { entidad_selected } = this.props.packsproductosReducer;

    // this.props.SUBMITTING(true);
    this.setState({
      submitting: true,
    });
    let solicitudProveeduria = {
      ...this.state.solicitudProveeduria,
      productos_solicitados: this.state.productos,
      farmacia_id: farmaciaid,
      cuit: cuit,
      farmacia_nombre: nombre,
      estado: "nuevo",
      entidad_id: entidad_selected.entidadnombre,
      email_destinatario:
        (email !== null ? email : "") + ";" + entidad_selected.email,
    };

    let html = await this.createHtmlMail(
      solicitudProveeduria,
      direccioncompleta
    );
    this.props.ADD_SOLICITUD_PROVEEDURIA(
      solicitudProveeduria,
      this.props.history,
      html,
      (email !== null ? email : "") + ";" + entidad_selected.email
    );
  }

  render() {
    const { entidad_selected, productos } = this.props.packsproductosReducer;
    const { farmaciaid, cuit, email, nombre, direccioncompleta } =
      this.props.authReducer.userprofile;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="3" xs="12">
            <Button
              href={process.env.PUBLIC_URL + "/#/NuevaSolicitudProveeduria"}
              className="btn"
              style={{
                color: "black",
                fontSize: 10,
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 8,
                paddingBottom: 8,
                marginBottom: 10,
                borderLeftWidth: 10,
                borderColor: "#000000",
                borderBottomWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
            >
              <b style={{ fontSize: 15 }}>{"<   "}</b>
              <b>Volver a elegir una entidad</b>
            </Button>
          </Col>
        </Row>

        <Card>
          <CardBody>
            {entidad_selected != null ? (
              entidad_selected._id === "5fbe3e36115ba7000189ea40" ? (
                entidad_selected.textos == null ? null : (
                  <Row className="mb-3">
                    <Col style={{ lineHeight: "0.6em" }}>
                      {entidad_selected.textos.map((p, index) => {
                        return <p key={index}>{p.text}</p>;
                      })}
                    </Col>
                  </Row>
                )
              ) : null
            ) : null}

            <Row style={{ color: "#20a8d8", fontSize: 18 }}>
              <Col md="4" xs="12">
                <FormGroup>
                  <Label>Fecha de la solicitud</Label>
                  <Input
                    type="date"
                    name="fecha"
                    value={
                      this.state.solicitudProveeduria
                        ? this.state.solicitudProveeduria.fecha
                        : undefined
                    }
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4" xs="12">
                {entidad_selected ==
                null ? null : entidad_selected.iscampaign ? null : (
                  <FormGroup>
                    <Label>N° de cuenta de Droguería</Label>
                    <Input
                      type="text"
                      name="nro_cuenta_drogueria"
                      value={
                        this.state.solicitudProveeduria
                          ? this.state.solicitudProveeduria.nro_cuenta_drogueria
                          : undefined
                      }
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                )}
              </Col>
              <Col md="4" xs="12">
                <FormGroup>
                  <Label>Entidad Elegida</Label>
                  <Input
                    type="text"
                    value={
                      entidad_selected != null
                        ? entidad_selected.entidadnombre
                        : undefined
                    }
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>

            <hr />

            {this.state.vistaprevia ? (
              <Row style={{ margin: 5 }}>
                <Col>
                  <Row>
                    <Col>
                      <p>
                        <b>Farmacia: </b>
                        {nombre}
                      </p>
                      <p>
                        <b>Email destino: </b>
                        {(email !== null ? email : "") +
                          ";" +
                          entidad_selected.email}
                      </p>
                      <p>
                        <b>Domicilio: </b>
                        {direccioncompleta}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="table-responsive table-striped table-fix">
                        <table className="table">
                          <thead className="bg-secondary">
                            <tr>
                              <th>Código</th>
                              <th>Producto</th>
                              <th>
                                {entidad_selected.iscampaign
                                  ? "Precio"
                                  : "Precio Compra (sin IVA)"}
                              </th>
                              <th>Unidades a pedir</th>
                              <th>Subtotal</th>
                              <th>Observaciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.productos.map((p, index) => {
                              return (
                                <tr key={index}>
                                  <td>{p.codigo_producto}</td>
                                  <td>{p.nombre}</td>
                                  <td>{p.precio}</td>
                                  <td>{p.cantidad}</td>
                                  <td>{(p.cantidad * p.precio).toFixed(2)}</td>
                                  <td>{p.observacion}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row style={{ margin: 5 }}>
                <div className="table-responsive table-striped table-fix">
                  <table className="table text-center">
                    <thead className="bg-secondary">
                      <tr>
                        <th>Código</th>
                        <th>Producto</th>

                        {entidad_selected ==
                        null ? null : entidad_selected.iscampaign ? (
                          <th>Precio</th>
                        ) : (
                          <>
                            <th>Imagen</th>
                            <th>Precio en FarmaGeo</th>
                            <th>Rentabilidad </th>
                            <th>Precio Compra (sin IVA)</th>
                          </>
                        )}
                        <th>Unidades a pedir</th>
                        <th>Subtotal</th>
                        <th>Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos
                        ? productos.map((prod, index) => {
                            return prod.habilitado ? (
                              <LineaProductoProveeduria
                                prod={prod}
                                key={index}
                                finalizar={this.state.finalizar}
                                handleLineaChange={this.handleLineaChange}
                                entidad_selected={entidad_selected}
                              />
                            ) : null;
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </Row>
            )}
          </CardBody>
          <CardFooter>
            <Row>
              <Col></Col>
              <Col>
                {this.state.finalizar ? (
                  !this.state.vistaprevia ? (
                    <Fragment>
                      <Button
                        onClick={() => {
                          this.handleFiltroFinalizar(false);
                        }}
                        className="btn btn-warning"
                      >
                        Volver
                      </Button>
                      <Button
                        onClick={() => {
                          this.handleVistaPrevia(true);
                        }}
                        className="btn btn-success"
                        style={{ marginLeft: 5 }}
                        disabled={this.state.productos.length < 1}
                      >
                        Siguiente
                      </Button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Button
                        onClick={() => {
                          this.handleFiltroFinalizar(false);
                          this.handleVistaPrevia(false);
                          this.handleLimpiarProductos();
                        }}
                        className="btn btn-danger"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={this.handleSubmit}
                        className="btn btn-success"
                        disabled={
                          this.state.solicitudProveeduria == null ||
                          this.state.solicitudProveeduria
                            .nro_cuenta_drogueria === "" ||
                          !this.state.solicitudProveeduria
                            .nro_cuenta_drogueria ||
                          this.state.submitting
                        }
                        style={{ marginLeft: 5 }}
                      >
                        Confirmar
                      </Button>
                    </Fragment>
                  )
                ) : (
                  <Button
                    onClick={() => {
                      this.handleFiltroFinalizar(true);
                    }}
                    className="btn btn-success"
                    disabled={this.state.productos.length < 1}
                  >
                    Siguiente
                  </Button>
                )}
              </Col>
              <Col></Col>
            </Row>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
    authReducer: state.authReducer,
    publicidadesReducer: state.publicidadesReducer,
    packsproductosReducer: state.packsproductosReducer,
  };
};
const mapDispatchToProps = {
  ADD_SOLICITUD_PROVEEDURIA,
  SUBMITTING,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalizarSolicitudProveeduria);
