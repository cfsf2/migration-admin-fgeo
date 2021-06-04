import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Label,
  //CardTitle,
  //FormText
} from "reactstrap";
import { connect } from "react-redux";
import {
  GET_PEDIDOS,
  VER_PEDIDO,
  GET_INFO_SOCIO,
  UPDATE_PEDIDO,
  GET_ALL_PEDIDOS_ADMIN,
} from "../../redux/actions/pedidosActions";
import { GET_ENTIDADES } from "../../redux/actions/packsproductosActions";

class PedidosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = { pedido: null };
  }

  async componentDidMount() {
    this.props.GET_ALL_PEDIDOS_ADMIN();
    this.props.GET_ENTIDADES();
  }

  handleInputChange = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({ pedido: { ...this.state.pedido, [name]: value } });
  };

  handlePrecio = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      pedido: {
        ...this.state.pedido,
        gruposproductos: this.state.pedido.gruposproductos.map((p) => {
          return { ...p, [name]: value };
        }),
      },
    });
  };

  render() {
    const { mis_pedidos, socio } = this.props.pedidosReducer;
    const { entidades } = this.props.packsproductosReducer;

    return (
      <div>
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Todos los Pedidos</b>
              </CardHeader>
              <div className="table-responsive table-fix">
                <table className="table table-striped">
                  <thead className="bg-dark">
                    <tr>
                      <th>Origen</th>
                      <th>Código</th>
                      <th>Farmacia</th>
                      <th>Pedido</th>
                      <th>Fecha</th>
                      <th>Forma de envio</th>
                      <th>Estado</th>
                      <th>Detalle</th>
                      {/*<th>Localidad</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {mis_pedidos.map((p, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            {p.origen === "ecommerce" ? (
                              <p className="bg-success">Ecommerce</p>
                            ) : (
                              <p className="bg-warning">APP</p>
                            )}
                          </td>
                          <td>{p._id}</td>
                          <td>{p.nombrefarmacia}</td>
                          <td>{p.descripcion.toUpperCase()}</td>
                          <td>{p.fechaalta.substring(0, 10)}</td>
                          <td>
                            {p.envio ? "Con envío" : "Retira en Farmacia"}
                          </td>
                          <td>
                            <div
                              style={{
                                backgroundColor:
                                  p.estado === "nuevo"
                                    ? "#00D579"
                                    : p.estado === "enproceso"
                                    ? "yellow"
                                    : p.estado === "entregado"
                                    ? "#20a8d8"
                                    : p.estado === "anulado"
                                    ? "red"
                                    : "",
                                color: "white",
                                borderRadius: "50%",
                                width: 20,
                                height: 20,
                                borderWidth: 10,
                                borderColor: "black",
                                margin: 10,
                              }}
                            ></div>
                            {p.estado === "nuevo" ? (
                              <p style={{ fontSize: 8 }}>Nuevo</p>
                            ) : p.estado === "enproceso" ? (
                              <p style={{ fontSize: 8 }}>En proceso</p>
                            ) : p.estado === "entregado" ? (
                              <p style={{ fontSize: 8 }}>Entregado</p>
                            ) : p.estado === "anulado" ? (
                              <p style={{ fontSize: 8 }}>Anulado</p>
                            ) : null}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-secondary mt-2"
                              data-toggle="modal"
                              data-target=".bd-example-modal-lg"
                              onClick={() => {
                                this.setState({ pedido: p });
                                this.props.GET_INFO_SOCIO(p.username);
                              }}
                              style={{ width: "100%" }}
                            >
                              ver
                            </button>
                          </td>
                          {/*<td></td>*/}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                className="modal fade bd-example-modal-lg"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    {this.state.pedido === null || socio == null ? null : (
                      <Row>
                        <Col xs="12" sm="12">
                          <Card>
                            <CardHeader>
                              <Row>
                                <Col>Pedido: {this.state.pedido._id}</Col>
                                <Col>
                                  {this.state.pedido.estado.toUpperCase()}
                                </Col>
                                <Col>
                                  <Button
                                    className="close"
                                    data-dismiss="modal"
                                  >
                                    {" "}
                                    X{" "}
                                  </Button>
                                </Col>
                              </Row>
                            </CardHeader>
                            <CardBody>
                              <Row className="my-2">
                                <Col xs="12" md="12" className="my-2">
                                  <Label>
                                    <b>Usuario:</b>
                                    {this.state.pedido.es_invitado
                                      ? " No Logueado "
                                      : this.state.pedido.username}
                                  </Label>
                                </Col>
                              </Row>
                              <Row className="my-2">
                                <Col xs="12" md="6" className="my-2">
                                  <Label>
                                    <b>Detalles de Facturación</b>
                                  </Label>
                                  {this.state.pedido.es_invitado ? (
                                    <p>
                                      {this.state.pedido.datos_cliente[0]
                                        .apellido +
                                        ", " +
                                        this.state.pedido.datos_cliente[0]
                                          .nombre}
                                      (Invitado)
                                    </p>
                                  ) : null}
                                  <p>
                                    {socio.name !== undefined
                                      ? socio.name
                                      : null}
                                    {socio.apellido != undefined
                                      ? " " + socio.apellido
                                      : null}
                                  </p>
                                </Col>
                                <Col xs="12" md="6" className="my-2">
                                  <Label>
                                    <b>Detalles de Envio</b>
                                  </Label>
                                  <Input
                                    type="text"
                                    onChange={this.handleInputChange}
                                    name="domicilioenvio"
                                    value={this.state.pedido.domicilioenvio}
                                  />
                                </Col>
                              </Row>
                              <Row className="my-2">
                                <Col xs="12" md="6" className="my-2">
                                  <Label>
                                    <b>Correo electrónico</b>
                                  </Label>
                                  <Input
                                    type="text"
                                    onChange={this.handleInputChange}
                                    name="username"
                                    value={
                                      this.state.pedido.username ===
                                      "No Registrado"
                                        ? this.state.pedido.datos_cliente[0]
                                            .email
                                        : this.state.pedido.username
                                    }
                                  />
                                </Col>
                                <Col xs="12" md="6" className="my-2">
                                  <Label>
                                    <b>Método de envío</b>
                                  </Label>
                                  <Input
                                    type="select"
                                    value={this.state.pedido.envio}
                                    name="envio"
                                    onChange={this.handleInputChange}
                                  >
                                    <option value={true}>Cadete</option>
                                    <option value={false}>
                                      Retira en farmacia
                                    </option>
                                  </Input>
                                </Col>
                              </Row>
                              <Row style={{ marginTop: 10 }}>
                                <Col xs="6">
                                  <b>Tel: </b> {this.state.pedido.whatsapp}
                                </Col>
                                <Col xs="6">
                                  <b>Pago mediante: </b>{" "}
                                  {/*this.state.pedido.pago_online ? 'pago online':'efectivo'*/}
                                  <select
                                    value={this.state.pedido.pago_online}
                                    name="pago_online"
                                    onChange={this.handleInputChange}
                                    style={{ width: "100%" }}
                                  >
                                    <option value={true}>Pago online</option>
                                    <option value={false}>Efectivo</option>
                                  </select>
                                </Col>
                              </Row>

                              <hr />
                              <Row>
                                <Col>
                                  <p>
                                    <b>Archivos adjuntos</b>
                                  </p>

                                  {this.state.pedido.gruposproductos[0]
                                    .obra_social_frente != null ? (
                                    <p>
                                      <a
                                        href={
                                          this.state.pedido.gruposproductos[0]
                                            .obra_social_frente
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Carnet obra social - frente
                                      </a>
                                    </p>
                                  ) : null}

                                  {this.state.pedido.gruposproductos[0]
                                    .obra_social_dorso != null ? (
                                    <p>
                                      <a
                                        href={
                                          this.state.pedido.gruposproductos[0]
                                            .obra_social_dorso
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Carnet obra social - dorso
                                      </a>
                                    </p>
                                  ) : null}

                                  {this.state.pedido.gruposproductos[0]
                                    .receta != null ? (
                                    <p>
                                      <a
                                        href={
                                          this.state.pedido.gruposproductos[0]
                                            .receta
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Receta
                                      </a>
                                    </p>
                                  ) : null}
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col xs="12">
                                  <p>
                                    <b>Comentarios:</b>
                                  </p>
                                  <textarea
                                    name="comentarios"
                                    value={this.state.pedido.comentarios}
                                    cols="40"
                                    rows="5"
                                    onChange={this.handleInputChange}
                                  ></textarea>
                                </Col>
                              </Row>
                              <Row>
                                <div className="table-responsive table-fix">
                                  <table className="table table-striped">
                                    <thead className="bg-dark">
                                      <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th>Entidad</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.pedido.descripcion ===
                                      "productos" ? (
                                        <Fragment>
                                          {this.state.pedido.gruposproductos[0].productos.map(
                                            (p, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td xs="6">{p.nombre}</td>
                                                  <td xs="2">{p.cantidad}</td>
                                                  <td xs="4">{p.subtotal}</td>
                                                  <td>
                                                    {entidades.length > 0 &&
                                                    p.entidad != null &&
                                                    p.entidad !=
                                                      "productopropio"
                                                      ? entidades.filter(
                                                          (e) =>
                                                            e._id == p.entidad
                                                        )[0].entidadnombre
                                                      : p.entidad ==
                                                        "productopropio"
                                                      ? "Producto Propio"
                                                      : null}
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </Fragment>
                                      ) : (
                                        <tr>
                                          <td>
                                            {this.state.pedido.descripcion.toUpperCase()}
                                          </td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </Row>
                              <hr />

                              <Row style={{ marginTop: 10 }}>
                                <Col xs="6">
                                  <Label>
                                    <b>Monto:</b>
                                  </Label>
                                  <Input
                                    type="text"
                                    onChange={this.handlePrecio}
                                    name="precio"
                                    value={
                                      this.state.pedido.gruposproductos[0]
                                        .precio != null
                                        ? parseFloat(
                                            this.state.pedido.gruposproductos[0]
                                              .precio
                                          ).toFixed(2)
                                        : "A confirmar"
                                    }
                                  />
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col xs="4">
                                  <Button
                                    onClick={() => {
                                      this.props.UPDATE_PEDIDO({
                                        ...this.state.pedido,
                                        estado: "enproceso",
                                      });
                                      this.setState({
                                        pedido: {
                                          ...this.state.pedido,
                                          estado: "enproceso",
                                        },
                                      });
                                    }}
                                  >
                                    Procesando
                                  </Button>
                                </Col>
                                <Col xs="4">
                                  <Button
                                    onClick={() => {
                                      this.props.UPDATE_PEDIDO({
                                        ...this.state.pedido,
                                        estado: "entregado",
                                      });
                                      this.setState({
                                        pedido: {
                                          ...this.state.pedido,
                                          estado: "entregado",
                                        },
                                      });
                                    }}
                                  >
                                    Completado
                                  </Button>
                                </Col>
                                <Col xs="4">
                                  <Button
                                    onClick={() => {
                                      this.props.UPDATE_PEDIDO({
                                        ...this.state.pedido,
                                      });
                                    }}
                                  >
                                    Guardar
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    pedidosReducer: state.pedidosReducer,
    packsproductosReducer: state.packsproductosReducer,
  };
};
const mapDispatchToProps = {
  GET_PEDIDOS,
  VER_PEDIDO,
  GET_INFO_SOCIO,
  UPDATE_PEDIDO,
  GET_ALL_PEDIDOS_ADMIN,
  GET_ENTIDADES,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidosAdmin);
