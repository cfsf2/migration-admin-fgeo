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
import axios from "axios";
import { farmageo_api } from "../../../config";

import { connect } from "react-redux";
import LineaProducto from "./components/LineaProducto";
import {
  ADD_TRANSFER,
  SUBMITTING,
} from "../../../redux/actions/transfersActions";

class FinalizarTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transfer: { fecha: new Date(Date.now()).toISOString().substring(0, 10) },
      productos: [],
      finalizar: false,
      vistaprevia: false,
      submitting: false,
      lab_selected: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFiltroFinalizar = this.handleFiltroFinalizar.bind(this);
    this.handleVistaPrevia = this.handleVistaPrevia.bind(this);
    this.handleLineaChange = this.handleLineaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createHtmlMail = this.createHtmlMail.bind(this);
    this.handleLimpiarProductos = this.handleLimpiarProductos.bind(this);
    this.handlequery = this.handlequery.bind(this);
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
      transfer: { ...this.state.transfer, [name]: value },
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

  createHtmlMail = async (transfer, direccioncompleta) => {
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
                          <p><b>Farmacia: </b>${transfer.farmacia_nombre}</p>
                          <p><b>Nº Farmacia: </b>${transfer.farmacia_id}</p>
                          <p><b>N° de cuenta de Droguería: </b>${
                            transfer.nro_cuenta_drogueria
                          }</p> 
                          <p><b>Droguería: </b>${transfer.drogueria_id}</p>
                          <p><b>Laboratorio elegido: </b>${
                            transfer.laboratorio_id
                          }</p>
                          <p><b>Dirección: </b>${direccioncompleta}</p>
                        </div>
                      <table>
                          <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Observaciones</th>
                          </tr>
                        <tbody>
                        ${transfer.productos_solicitados.map((p) => {
                          return `<tr>
                                    <td>${p.codigo_producto}</td>
                                    <td>${p.nombre}</td>
                                    <td>${p.cantidad}</td>
                                    <td>${p.observacion}</td>
                                  </tr>`;
                        })}
                        </tbody>
                      </table>
                    </body>`;
    return body;
  };

  async handleSubmit() {
    const {
      farmaciaid,
      email,
      nombre,
      direccioncompleta,
    } = this.props.authReducer.userprofile;
    const { lab_selected } = this.props.tranfersReducer;

    // this.props.SUBMITTING(true);
    this.setState({
      submitting: true,
    });
    let transfer = {
      ...this.state.transfer,
      productos_solicitados: this.state.productos,
      farmacia_id: farmaciaid,
      farmacia_nombre: nombre,
      estado: "nuevo",
      laboratorio_id: lab_selected.nombre,
      email_destinatario: email,
    };

    let html = await this.createHtmlMail(transfer, direccioncompleta);
    this.props.ADD_TRANSFER(transfer, this.props.history, html, email);
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  async componentDidMount() {
    var laboratorio = this.handlequery().get("l");
    if (laboratorio) {
      try {
        const result = await axios.get(
          farmageo_api + "/laboratorios/" + laboratorio
        );
        if (result.data) {
          this.setState({ lab_selected: result.data });
        }
      } catch (error) {
        this.setState({ lab_selected: null });
      }
    }
  }

  render() {
    const {
      //lab_selected,
      productos,
      droguerias,
    } = this.props.tranfersReducer;
    const { lab_selected } = this.state;
    const {
      email,
      nombre,
      direccioncompleta,
    } = this.props.authReducer.userprofile;

    const { comunicadoTransfers } = this.props.publicidadesReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="3" xs="12">
            <Button
              href={process.env.PUBLIC_URL+"/#/NuevoTransfer"}
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
              <b>Volver a elegir un Laboratorio</b>
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md="12" xs="12">
            <div
              style={{
                color: "black",
                fontSize: 20,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                marginBottom: 10,
                borderBottomWidth: 0,
                borderTopWidth: 10,
                borderRightWidth: 0,
                borderColor: "#000000",
                borderLeftWidth: 0,
                fontWeight: "bold",
              }}
            >
              <p>{lab_selected !== null ? lab_selected.novedades : ""}</p>
              <p>{comunicadoTransfers}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12" xs="12">
            <div
              style={{
                color: "black",
                fontSize: 16,
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
                marginBottom: 10,
                borderBottomWidth: 0,
                borderTopWidth: 10,
                borderRightWidth: 0,
                borderColor: "#000000",
                borderLeftWidth: 0,
              }}
            >
              <p>
                <b>Condiciones comerciales: </b>
                {lab_selected !== null
                  ? lab_selected.condiciones_comerciales
                  : ""}
              </p>
            </div>
          </Col>
        </Row>

        <Card>
          <CardBody>
            <Row style={{ color: "#20a8d8", fontSize: 18 }}>
              <Col md="3" xs="12">
                <FormGroup>
                  <Label>Fecha del transfer</Label>
                  <Input
                    type="date"
                    name="fecha"
                    defaultValue={null}
                    value={
                      this.state.transfer
                        ? this.state.transfer.fecha
                        : undefined
                    }
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="3" xs="12">
                <FormGroup>
                  <Label>N° de cuenta de Droguería</Label>
                  <Input
                    type="text"
                    name="nro_cuenta_drogueria"
                    value={
                      this.state.transfer
                        ? this.state.transfer.nro_cuenta_drogueria
                        : undefined
                    }
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="3" xs="12">
                <FormGroup>
                  <Label>Elegir Droguería</Label>
                  <Input
                    type="select"
                    name="drogueria_id"
                    value={
                      this.state.transfer
                        ? this.state.transfer.drogueria_id
                        : undefined
                    }
                    onChange={this.handleInputChange}
                  >
                    <option value={undefined}>seleccionar...</option>
                    {droguerias.map((d, index) => {
                      return d.habilitado ? (
                        <option value={d.nombre} key={index}>
                          {d.nombre}
                        </option>
                      ) : null;
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3" xs="12">
                <FormGroup>
                  <Label>Laboratorio elegido</Label>
                  <Input
                    type="text"
                    value={
                      lab_selected != null ? lab_selected.nombre : undefined
                    }
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col align="center" md="4" xs="12">
                <div
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                    marginTop: 5,
                  }}
                >
                  ...
                </div>
              </Col>
              <Col align="center" md="4" xs="12">
                <div
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                    marginTop: 5,
                  }}
                >
                  ...
                </div>
              </Col>
              <Col align="center" md="4" xs="12">
                <div
                  style={{
                    backgroundColor: "#17a2b8",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                    marginTop: 5,
                  }}
                >
                  ...
                </div>
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
                        {email}
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
                              <th>Producto / Presentación</th>
                              <th>Unidades a pedir</th>
                              <th>Observaciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.productos.map((p, index) => {
                              return (
                                <tr>
                                  <td>{p.codigo_producto}</td>
                                  <td>{p.nombre}</td>
                                  <td>{p.cantidad}</td>
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
                  <table className="table">
                    <thead className="bg-secondary">
                      <tr>
                        <th>Código</th>
                        <th>Producto / Presentación</th>
                        <th>Imagen</th>
                        <th>Precio al público</th>
                        <th>%</th>
                        <th>Unidades a pedir</th>
                        <th>Subtotal</th>
                        <th>Mínimo</th>
                        <th>Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos
                        ? productos
                            .filter((p) => {
                              return p.habilitado;
                            })
                            .map((prod, index) => {
                              return (
                                <LineaProducto
                                  prod={prod}
                                  key={index}
                                  finalizar={this.state.finalizar}
                                  handleLineaChange={this.handleLineaChange}
                                />
                              );
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
                          this.state.transfer == null ||
                          this.state.transfer.drogueria_id == undefined ||
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
  };
};
const mapDispatchToProps = {
  ADD_TRANSFER,
  SUBMITTING,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarTransfer);
