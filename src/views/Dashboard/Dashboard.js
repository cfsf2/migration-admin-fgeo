import React, { Component, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Container,
  Spinner,
} from "reactstrap";
import NoInstitucionesFound from "../../components/NoInstitucionesFound";
import { connect } from "react-redux";
import {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  GET_NOVEDADES_FARMACIA,
} from "../../redux/actions/publicidadesActions";
import { GET_PEDIDOS } from "../../redux/actions/pedidosActions";
import {
  GET_PRODUCTOS_PACK_BY_ENTIDAD,
  GET_ENTIDADES,
} from "../../redux/actions/packsproductosActions";

import "./dashboard.scss";

import ButtonHome from "./components/ButtonHome";
import MisPedidos from "./components/MisPedidos";
import VentaOnlineSelect from "./components/VentaOnlineSelect";
import { image_path_server } from "../../config";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerAdmin: this.props.publicidadesReducer.publicidades
        .filter((p) => p.tipo === "banners_admin")
        .sort(),
      publicidades: this.props.publicidadesReducer.publicidades,
      novedades: this.props.publicidadesReducer.novedades,
      user: this.props.authReducer.user,
      farmacia: this.props.authReducer.userprofile,
    };
    this.handleFiltro = this.handleFiltro.bind(this);
    this.handleBannerNutriendoEsperanza =
      this.handleBannerNutriendoEsperanza.bind(this);
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

  async componentDidMount() {
    this.props.GET_PUBLICIDADES();

    if (
      this.props.authReducer.user.permisos &&
      this.props.authReducer.user.permisos.includes("packsdeproductos")
    ) {
      this.props.GET_ENTIDADES();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { userprofile } = this.props.authReducer;

    if (this.props.authReducer.user.admin) {
      this.props.GET_INSTITUCIONES(1000);
    }

    if (
      this.props.authReducer.user.permisos &&
      this.props.authReducer.user.permisos.includes("packsdeproductos")
    ) {
      this.props.GET_ENTIDADES();
    }

    if (
      prevProps.publicidadesReducer.publicidades !==
      this.props.publicidadesReducer.publicidades
    ) {
      await this.setState({
        publicidades: this.props.publicidadesReducer.publicidades,
      });
      await this.setState({
        bannerAdmin: this.props.publicidadesReducer.publicidades
          .filter((p) => p.tipo === "banners_admin")
          .sort(),
      });
    }

    // if (userprofile !== null) {
    //   if (prevProps.authReducer.userprofile !== userprofile) {
    //     this.handlePanelExistencias();
    //   }
    // }
  }

  render() {
    const { user, userprofile } = this.props.authReducer;
    return (
      <div className="animated fadeIn">
        {user.IS_ADMIN || !user.IS_FARMACIA ? null : userprofile ? (
          userprofile.perfil_farmageo === "indefinido" ? (
            <VentaOnlineSelect />
          ) : (
            <Row className="colorDeFondoLoco">
              <Col md="6">
                <Row>
                  <Col>
                    {this.state.bannerAdmin?.map((banner) => {
                      return banner.habilitado ? (
                        <Row
                          key={banner._id}
                          style={{ marginBottom: 10, paddingBottom: 0 }}
                        >
                          <Col md="12">
                            <a
                              //onClick={this.handleBannerNutriendoEsperanza}
                              href={banner.link}
                              target={
                                banner.link.trim() !== "" ? "_blank" : "_self"
                              }
                              rel="noopener"
                            >
                              <img
                                style={{ width: "100%" }}
                                src={image_path_server + banner.imagen}
                              />
                            </a>
                          </Col>
                        </Row>
                      ) : null;
                    })}
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="12" style={{ height: 50 }}>
                        <ButtonHome
                          href={process.env.PUBLIC_URL + "/#/NuevoTransfer"}
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
                      <Col md="12" style={{ height: 50 }}>
                        <ButtonHome
                          to="/videosInstitucional"
                          titulo="VIDEOS INSTITUCIONALES"
                          subtitulo={<br />}
                          align="left"
                          tipo="grande"
                          icono={require("../../assets/images/icon-videos.png")}
                          simple={true}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          to="/debitosPami"
                          titulo="DEBITOS PAMI"
                          subtitulo="Consultar aquí"
                          align="left"
                          icono={require("../../assets/images/icons/pami.png")}
                        />
                      </Col>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          to="/reporteObras"
                          titulo="RESUMEN DE NORMATIVAS OOSS"
                          subtitulo="Obras Sociales"
                          align="left"
                          icono={require("../../assets/images/icons/ooss.png")}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 5, paddingBottom: 0 }}>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <Link
                          to={{
                            pathname: "/tableropami",
                          }}
                        >
                          <ButtonHome
                            titulo="CRONOGRAMA DE PAGOS PAMI"
                            subtitulo="PAMI"
                            align="left"
                            icono={require("../../assets/images/icons/4.png")}
                          />
                        </Link>
                      </Col>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          href="https://campus.farmacursos.org.ar/archivos.cgi?wAccion=vergrupo&wIdGrupo=3320&id_curso=70"
                          titulo="NORMATIVAS DE OBRAS SOCIALES"
                          subtitulo="del D.O.S"
                          align="left"
                          icono={require("../../assets/images/icons/2.png")}
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
                          href="http://www.cfsf2.org.ar/faltante-de-medicamentos/"
                          titulo="FALTANTES DE MEDICAMENTOS"
                          subtitulo="según ANMAT"
                          align="left"
                          icono={require("../../assets/images/icons/3.png")}
                        />
                      </Col>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          href="http://cfsf2.e-ducativa.com/index.cgi?mod=contentFront&accion=get&comando=article&_wf=true&articleId=432&skin=extranet&currentPage=0&currentActionPager=0&orderBy=&orderMode=DESC&force_publish="
                          titulo="PRECIOS SUGERIDOS"
                          subtitulo="de medicamentos hospitalarios y accesorios"
                          align="left"
                          icono={require("../../assets/images/icons/6.png")}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <MisPedidos {...this.props} {...this.state} />
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
              <Col md="6" className="dashboard_info">
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
                    {this.props.authReducer.userprofile.instituciones
                      ?.length === 0 ? (
                      <Row>
                        <Col>
                          <NoInstitucionesFound />
                        </Col>
                      </Row>
                    ) : null}
                    {this.props.publicidadesReducer.novedades?.map(
                      (p, index) => {
                        return (
                          <Fragment key={p._id}>
                            <Row key={p._id}>
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
                                    {p.fecha_alta
                                      ? p.fecha_alta.substring(0, 10)
                                      : p.fechaalta.substring(0, 10)}
                                  </Col>
                                </Row>
                                <Row>
                                  <Col className="col-1"></Col>
                                  <Col className="col-11">
                                    <div className="dashboard_info_descripcion">
                                      {p.descripcion}
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <hr />
                          </Fragment>
                        );
                      }
                    )}
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
  GET_NOVEDADES_FARMACIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
