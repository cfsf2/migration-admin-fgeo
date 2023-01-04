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
import { GET_INSTITUCIONES } from "../../redux/actions/institucionesAction";

import "./dashboard.scss";

import ButtonHome from "./components/ButtonHome";
import MisPedidos from "./components/MisPedidos";
import MisVentas from "./components/MisVentas";
import VentaOnlineSelect from "./components/VentaOnlineSelect";
import Novedades from "./components/Novedades";
import { image_path_server } from "../../config";

import EsLink from "./components/EsLink";

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
      misventas: false,
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

    // if (
    //   this.props.authReducer.user.permisos &&
    //   this.props.authReducer.user.permisos.includes("packsdeproductos")
    // ) {
    //   this.props.GET_ENTIDADES();
    // }

    if (
      prevProps.publicidadesReducer.publicidades !==
      this.props.publicidadesReducer.publicidades
    ) {
      this.setState({
        publicidades: this.props.publicidadesReducer.publicidades,
      });
      this.setState({
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
                            {/* <Link
                              //onClick={this.handleBannerNutriendoEsperanza}
                              href={
                                "http://localhost:3000/#/FinalizarTransfer?l=616a1169469336a90d0ad077"
                              }
                              // target={
                              //   banner.link.trim() !== "" ? "_blank" : "_self"
                              // }
                              rel="noopener"
                            >
                              <img
                                style={{ width: "100%" }}
                                src={image_path_server + banner.imagen}
                              />
                            </Link> */}

                            <EsLink link={banner.link}>
                              <img
                                style={{ width: "100%" }}
                                src={image_path_server + banner.imagen}
                              />
                            </EsLink>
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
                          to="/pantalla/PANTALLA_ART_VIDEOS_INST"
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
                          to="/pantalla/PANTALLA_ART_DEBITOS_PAMI"
                          titulo="DEBITOS PAMI"
                          subtitulo="Consultar aquí"
                          align="left"
                          icono={require("../../assets/images/icons/pami.png")}
                        />
                      </Col>
                      <Col md="6" style={{ height: 50 }} align="center">
                        <ButtonHome
                          to="/pantalla/PANTALLA_ART_RESUMEN"
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
                            pathname: "/pantalla/PANTALLA_ART_CRONOGRAMA",
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
                          to="pantalla/PANTALLA_ART_FARMAPAMI"
                          target="_blank"
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
                    <MisPedidos pedidosNuevos {...this.props} {...this.state} />
                  </Col>
                </Row>
                {this.state.misventas ? (
                  <Row>
                    <Col>
                      <MisVentas {...this.props} {...this.state} />
                    </Col>
                  </Row>
                ) : null}
              </Col>
              <Col md="6" className="dashboard_info">
                <Novedades {...this.props} />
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
  GET_INSTITUCIONES,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
