import React, { Component, Fragment } from "react";
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
} from "../../redux/actions/publicidadesActions";
import { GET_PEDIDOS } from "../../redux/actions/pedidosActions";
import {
  GET_PRODUCTOS_PACK_BY_ENTIDAD,
  GET_ENTIDADES,
} from "../../redux/actions/packsproductosActions";

import ButtonHome from "./components/ButtonHome";
import VentaOnlineSelect from "./components/VentaOnlineSelect";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosnuevos: 0,
      pedidosenproceso: 0,
      productoscasiagotados: 0,
      productosagotados: 0,
      publicidades: this.props.publicidadesReducer.publicidades.reverse(),
    };
    this.handleFiltro = this.handleFiltro.bind(this);
    this.handlePanelExistencias = this.handlePanelExistencias.bind(this);
    this.handleBannerNutriendoEsperanza = this.handleBannerNutriendoEsperanza.bind(
      this
    );
  }

  async handleBannerNutriendoEsperanza() {
    const { entidades } = this.props.packsproductosReducer;
    let entidadNutriEspe = await entidades.filter((e) => {
      return e._id === "5fbe3e36115ba7000189ea40";
    })[0];
    var promResuelta = Promise.resolve(
      this.props.GET_PRODUCTOS_PACK_BY_ENTIDAD(entidadNutriEspe)
    );
    var thenProm = promResuelta.then(
      (window.location.href = "/#/FinalizarSolicitudProveeduria")
    );
  }

  handleFiltro(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    this.props.GET_PUBLICIDADES();
    this.handlePanelExistencias();
    this.props.GET_ENTIDADES();
  }
  

  async handlePanelExistencias() {
    const { mis_pedidos } = this.props.pedidosReducer;
    const { userprofile, user } = this.props.authReducer;

    if (userprofile !== null) {
      if (!user.IS_ADMIN && userprofile.productos !== undefined) {
        var pedidosnuevos = await mis_pedidos.filter((p) => {
          return p.estado == "nuevo";
        }).length;
        var pedidosenproceso = await mis_pedidos.filter((p) => {
          return p.estado == "enproceso";
        }).length;
        this.setState({ pedidosnuevos, pedidosenproceso });

        var productoscasiagotados = await userprofile.productos.filter((p) => {
          return p.inventario == "pocasexistencias";
        }).length;
        var productosagotados = await userprofile.productos.filter((p) => {
          return p.inventario == "sinexistencias";
        }).length;
        this.setState({ productosagotados, productoscasiagotados });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { userprofile } = this.props.authReducer;
    if (
      prevProps.publicidadesReducer.publicidades !==
      this.props.publicidadesReducer.publicidades
    ) {
      await this.setState({
        publicidades: this.props.publicidadesReducer.publicidades.reverse(),
      });
    }

    if (userprofile !== null) {
      if (prevProps.authReducer.userprofile !== userprofile) {
        this.handlePanelExistencias();
      }
    }
  }


  render() {
    const { user, userprofile } = this.props.authReducer;
    return (
      <div className="animated fadeIn">
        {user.IS_ADMIN || !user.IS_FARMACIA ? null : userprofile ? (
          userprofile.perfil_farmageo === "indefinido" ? (
            <VentaOnlineSelect />
          ) : (
            <Row>
              <Col md="6">
                <Row>
                  <Col>
                    <Row style={{ marginBottom: 10, paddingBottom: 0 }}>
                      <Col md="12">
                        <a
                          //onClick={this.handleBannerNutriendoEsperanza}
                          href={
                            "https://mfarmaceutica.com.ar/todo-riesgo-farmacias/"
                          }
                          target="_blank"
                          rel="noopener"
                        >
                          <img
                            style={{ width: "100%" }}
                            src="https://farmageo2.s3.amazonaws.com/farmacias/1609347294356-lg.jpg"
                          />
                        </a>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="12" style={{ height: 50 }}>
                        <ButtonHome
                          href={process.env.PUBLIC_URL+"/#/NuevoTransfer"}
                          titulo="TRANSFERS FARMACIAS"
                          subtitulo={<br />}
                          align="left"
                          tipo="grande"
                          icono={require("../../assets/images/icons/1.png")}
                          simple={true}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="6" style={{ height: 50 }}>
                        <ButtonHome
                          href="https://farma.pami.org.ar/seguridad/iniciar-sesion"
                          titulo="FARMAPAMI"
                          subtitulo={<br />}
                          align="left"
                          icono={require("../../assets/images/icons/7.png")}
                        />
                      </Col>

                      <Col md="6" style={{ height: 50 }}>
                        <ButtonHome
                          href="https://api.whatsapp.com/send?phone=5493413871962&text=%C2%A1Hola!%20Quiero%20realizar%20una%20consulta"
                          titulo="MESA DE AYUDA"
                          subtitulo="Estamos cerca tuyo"
                          align="left"
                          icono={require("../../assets/images/icons/5.png")}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          href="https://campus.farmacursos.org.ar/presentacion.cgi?wAccion=vertopico&wIdTopico=3281&id_curso=70"
                          titulo="PRECIOS SUGERIDOS"
                          subtitulo="de medicamentos hospitalarios y accesorios"
                          align="left"
                          icono={require("../../assets/images/icons/6.png")}
                        />
                      </Col>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          href="http://www.cfsf2.org.ar/faltante-de-medicamentos/"
                          titulo="FALTANTES DE MEDICAMENTOS"
                          subtitulo="según ANMAT"
                          align="left"
                          icono={require("../../assets/images/icons/3.png")}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="6" style={{ height: 50 }} align="center" >
                        <ButtonHome
                          to="/reporteObras"
                          titulo="NORMATIVAS DE OBRAS SOCIALES"
                          subtitulo="del D.O.S"
                          align="left"
                          icono={require("../../assets/images/icons/2.png")}
                        />
                      </Col>

                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          href="http://www.cfsf2.org.ar/dos/presentacion-de-ooss/"
                          titulo="CRONOGRAMA DE PRESENTACIÓN"
                          subtitulo="del D.O.S"
                          align="left"
                          icono={require("../../assets/images/icons/4.png")}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <b>MIS PEDIDOS</b>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col
                            md="6"
                            xs="12"
                            style={{
                              height: 80,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                            align="center"
                            className={
                              this.state.pedidosnuevos > 0
                                ? "btn btn-success"
                                : "btn btn-white"
                            }
                            style={{ color: "black", width: "100%" }}
                          >
                            <Row>
                              <Col md="3" xs="3">
                                <div
                                  className="bg-success"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 20,
                                    borderRadius: 50,
                                    float: "right",
                                  }}
                                >
                                  <b style={{ fontSize: 20 }}>...</b>
                                </div>
                              </Col>
                              <Col md="9" xs="9">
                                <a
                                  href={process.env.PUBLIC_URL+"/#/pedidos"}
                                  style={{ color: "black", float: "left" }}
                                >
                                  <p
                                    style={{
                                      fontSize: 18,
                                      paddingBottom: 0,
                                      marginBottom: 0,
                                      marginTop: 18,
                                    }}
                                  >
                                    {this.state.pedidosnuevos} Pedidos
                                  </p>
                                  <p style={{ fontSize: 10 }}>nuevos</p>
                                </a>
                              </Col>
                            </Row>
                          </Col>

                          <Col
                            md="6"
                            xs="12"
                            style={{
                              height: 80,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                            align="center"
                            className={
                              this.state.pedidosenproceso > 0
                                ? "btn btn-success"
                                : "btn btn-white"
                            }
                            style={{ color: "black", width: "100%" }}
                          >
                            <Row>
                              <Col md="3" xs="3">
                                <div
                                  className="bg-secondary"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 20,
                                    borderRadius: 50,
                                    float: "right",
                                  }}
                                >
                                  <b style={{ fontSize: 25, color: "white" }}>
                                    -
                                  </b>
                                </div>
                              </Col>
                              <Col md="9" xs="9">
                                <a
                                  href={process.env.PUBLIC_URL+"/#/pedidos"}
                                  style={{ color: "black", float: "left" }}
                                >
                                  <p
                                    style={{
                                      fontSize: 18,
                                      paddingBottom: 0,
                                      marginBottom: 0,
                                      marginTop: 18,
                                    }}
                                  >
                                    {this.state.pedidosenproceso} Pedidos
                                  </p>
                                  <p style={{ fontSize: 10 }}>en proceso</p>
                                </a>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            md="6"
                            xs="12"
                            style={{
                              height: 80,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                            align="center"
                            className={
                              this.state.pedidosnuevos > 0
                                ? "btn btn-success"
                                : "btn btn-white"
                            }
                            style={{ color: "black", width: "100%" }}
                          >
                            <Row>
                              <Col md="3" xs="3">
                                <div
                                  className="bg-warning"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 20,
                                    borderRadius: 50,
                                    float: "right",
                                  }}
                                >
                                  <b style={{ fontSize: 25 }}>!</b>
                                </div>
                              </Col>
                              <Col md="9" xs="9">
                                <a
                                  href={process.env.PUBLIC_URL+"/#/productos"}
                                  style={{ color: "black", float: "left" }}
                                >
                                  <p
                                    style={{
                                      fontSize: 18,
                                      paddingBottom: 0,
                                      marginBottom: 0,
                                      marginTop: 18,
                                    }}
                                  >
                                    {this.state.productoscasiagotados} Productos
                                  </p>
                                  <p style={{ fontSize: 10 }}>
                                    casi sin existencias
                                  </p>
                                </a>
                              </Col>
                            </Row>
                          </Col>

                          <Col
                            md="6"
                            xs="12"
                            style={{
                              height: 80,
                              marginTop: 15,
                              marginBottom: 15,
                            }}
                            align="center"
                            className={
                              this.state.pedidosenproceso > 0
                                ? "btn btn-success"
                                : "btn btn-white"
                            }
                            style={{ color: "black", width: "100%" }}
                          >
                            <Row>
                              <Col md="3" xs="3">
                                <div
                                  className="bg-danger"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 20,
                                    borderRadius: 50,
                                    float: "right",
                                  }}
                                >
                                  <b style={{ fontSize: 25, color: "white" }}>
                                    X
                                  </b>
                                </div>
                              </Col>
                              <Col md="9" xs="9">
                                <a
                                  href={process.env.PUBLIC_URL+"/#/productos"}
                                  style={{ color: "black", float: "left" }}
                                >
                                  <p
                                    style={{
                                      fontSize: 18,
                                      paddingBottom: 0,
                                      marginBottom: 0,
                                      marginTop: 18,
                                    }}
                                  >
                                    {this.state.productosagotados} Productos
                                  </p>
                                  <p style={{ fontSize: 10 }}>agotados</p>
                                </a>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <b>MIS VENTAS</b>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col
                            md="6"
                            xs="12"
                            style={{
                              height: 80,
                              marginTop: 15,
                              marginBottom: 15,
                              width: "100%",
                            }}
                            align="center"
                          >
                            <p
                              style={{
                                fontSize: 18,
                                paddingBottom: 0,
                                marginBottom: 0,
                                marginTop: 18,
                              }}
                            >
                              $0.00
                            </p>
                            <hr />
                            <p style={{ fontSize: 10 }}>
                              Ventas netas este mes
                            </p>
                          </Col>
                          <Col
                            md="6"
                            xs="12"
                            style={{
                              height: 80,
                              marginTop: 15,
                              marginBottom: 15,
                              width: "100%",
                            }}
                            align="center"
                          >
                            <p
                              style={{
                                fontSize: 18,
                                paddingBottom: 0,
                                marginBottom: 0,
                                marginTop: 18,
                              }}
                            >
                              ...
                            </p>
                            <hr />
                            <p style={{ fontSize: 10 }}>
                              Es el más vendido este mes{" "}
                            </p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <b>Novedades de interés</b>
                      </Col>
                      <Col>
                        <select
                          value={this.state.filtro}
                          onChange={this.handleFiltro}
                          name="filtro"
                        >
                          <option value="recientes">
                            Más recientes primero
                          </option>
                          <option value="hoy">Hoy</option>
                          <option value="semana">Últimos 7 días</option>
                          <option value="mes">Último mes</option>
                        </select>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <hr />
                    {this.state.publicidades.map((p, index) => {
                      return p.tipo === "novedadesadmin" && p.habilitado ? (
                        <Fragment key={index}>
                          <Row>
                            <Col>
                              <Row>
                                <Col className="col-1">
                                  <div
                                    style={{
                                      backgroundColor:
                                        p.color === "verde"
                                          ? "#00D579"
                                          : p.color === "rojo"
                                          ? "red"
                                          : "yellow",
                                      color: "white",
                                      borderRadius: "50%",
                                      width: 20,
                                      height: 20,
                                      borderWidth: 10,
                                      borderColor: "black",
                                    }}
                                  ></div>
                                </Col>
                                <Col>
                                  <p
                                    style={{
                                      textJustify: "initial",
                                      fontSize: 16,
                                      fontWeight: "bold",
                                    }}
                                    className="d-inline"
                                  >
                                    {p.titulo}
                                  </p>
                                </Col>
                                <Col className="col-3">
                                  {p.fechaalta.substring(0, 10)}
                                </Col>
                              </Row>
                              <Row>
                                <Col className="col-1"></Col>
                                <Col>{p.descripcion}</Col>
                              </Row>
                            </Col>
                          </Row>
                          <hr />
                        </Fragment>
                      ) : null;
                    })}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    publicidadesReducer: state.publicidadesReducer,
    pedidosReducer: state.pedidosReducer,
    packsproductosReducer: state.packsproductosReducer,
  };
};
const mapDispatchToProps = {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  GET_PEDIDOS,
  GET_PRODUCTOS_PACK_BY_ENTIDAD,
  GET_ENTIDADES,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
