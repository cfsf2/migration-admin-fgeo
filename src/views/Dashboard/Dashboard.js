import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

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

const dashboardButtons = [
  {
    to: "/pantalla/PANTALLA_ART_NUEVO_TRANSFER",
    target: null,
    titulo: "TRANSFERS FARMACIAS",
    subtitulo: <br />,
    align: "left",
    icono: require("../../assets/images/icons/1.png"),
    md: 12,
    order: 10,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "/pantalla/PANTALLA_ART_DEBITOS_PAMI",
    target: null,
    titulo: "DEBITOS PAMI",
    subtitulo: "Consultar aquí",
    align: "left",
    icono: require("../../assets/images/icons/pami.png"),
    md: 6,
    order: 30,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "/pantalla/PANTALLA_ART_RESUMEN",
    target: null,
    titulo: "RESUMEN DE NORMATIVAS OOSS",
    subtitulo: "Obras Sociales",
    align: "left",
    icono: require("../../assets/images/icons/ooss.png"),
    md: 6,
    order: 40,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "/pantalla/PANTALLA_ART_CRONOGRAMA",
    target: null,
    titulo: "CRONOGRAMA DE PAGOS PAMI",
    subtitulo: "PAMI",
    align: "left",
    icono: require("../../assets/images/icons/4.png"),
    md: 6,
    order: 50,
    isWrappedInLink: true, // Está dentro de un Link
  },
  {
    to: "pantalla/PANTALLA_ART_EXT_NORMATIVA",
    target: "_blank",
    titulo: "NORMATIVAS DE OBRAS SOCIALES",
    subtitulo: "del D.O.S",
    align: "left",
    icono: require("../../assets/images/icons/2.png"),
    md: 6,
    order: 60,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "pantalla/PANTALLA_EXT_RECETAS_ELECTRONICAS",
    target: "_blank", // Abre en una nueva pestaña
    titulo: "RECETAS ELECTRÓNICAS",
    subtitulo: <br />, // No se especificaron subtítulos
    align: "left",
    icono: require("../../assets/images/icons/2.png"), // Reutilizando el mismo icono de normativas
    md: 6,
    order: 75, // Debe ir justo después de "NORMATIVAS", que tiene order=60
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "pantalla/PANTALLA_ART_FARMAPAMI",
    target: "_blank",
    titulo: "IMED - AUTORIZADOR PAMI",
    subtitulo: <br />,
    align: "left",
    icono: require("../../assets/images/icons/7.png"),
    md: 6,
    order: 70,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "pantalla/PANTALLA_ART_EXT_MESAAYUDA",
    target: "_blank",
    titulo: "MESA DE AYUDA",
    subtitulo: "Estamos cerca tuyo",
    align: "left",
    icono: require("../../assets/images/icons/5.png"),
    md: 6,
    order: 80,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "pantalla/PANTALLA_ART_EXT_FALTANTES",
    target: "_blank",
    titulo: "FALTANTES DE MEDICAMENTOS",
    subtitulo: "según ANMAT",
    align: "left",
    icono: require("../../assets/images/icons/3.png"),
    md: 6,
    order: 90,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "pantalla/PANTALLA_ART_EXT_PRECIOS_SUG",
    target: "_blank",
    titulo: "PRECIOS SUGERIDOS",
    subtitulo: "de medicamentos hospitalarios y accesorios",
    align: "left",
    icono: require("../../assets/images/icons/6.png"),
    md: 6,
    order: 100,
    isWrappedInLink: false, // No está dentro de un Link
  },
  {
    to: "/pantalla/PANTALLA_ART_VIDEOS_INST",
    target: null,
    titulo: "VIDEOS INSTITUCIONALES",
    subtitulo: <br />,
    align: "left",
    icono: require("../../assets/images/icon-videos.png"),
    md: 6,
    order: 110,
    isWrappedInLink: false, // No está dentro de un Link
  },
];

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
  }

  render() {
    const { user, userprofile } = this.props.authReducer;

    const esAdmin = user.IS_ADMIN || !user.IS_FARMACIA;
    const perfilIndefinido = userprofile?.perfil_farmageo === "indefinido";

    if (esAdmin) return null;
    if (!userprofile) return null;

    const renderBanners = () => {
      return this.state.bannerAdmin?.map((banner) =>
        banner.habilitado ? (
          <Row key={banner._id} style={{ marginBottom: 10 }}>
            <Col md="12">
              <EsLink link={banner.link}>
                <img
                  alt="imagen banner"
                  style={{ width: "100%" }}
                  src={image_path_server + banner.imagen}
                />
              </EsLink>
            </Col>
          </Row>
        ) : null
      );
    };

    const renderDashboardButtons = () => {
      return dashboardButtons
        .sort((a, b) => a.order - b.order)
        .map((button) => {
          const renderedButton = button.isWrappedInLink ? (
            <Link to={button.to} key={button.order}>
              <ButtonHome {...button} />
            </Link>
          ) : (
            <ButtonHome {...button} key={button.order} />
          );

          return (
            <div
              key={button.to}
              className={
                button.md === 6 ? "dashboard-btn-sm" : "dashboard-btn-lg"
              }
              style={{ height: 50 }}
            >
              {renderedButton}
            </div>
          );
        });
    };
    
    return (
      <div className="animated fadeIn">
        {perfilIndefinido ? <VentaOnlineSelect /> : 
        <Row className="colorDeFondoLoco">
          <Col md="6">
            <Row>
              <Col>{renderBanners()}</Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{ display: "flex", flexWrap: "wrap", margin: "0 7px" }}
                >
                  {renderDashboardButtons()}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <MisPedidos pedidosNuevos {...this.props} {...this.state} />
              </Col>
            </Row>
            {this.state.misventas && (
              <Row>
                <Col>
                  <MisVentas {...this.props} {...this.state} />
                </Col>
              </Row>
            )}
          </Col>
          <Col md="6" className="dashboard_info">
            <Novedades {...this.props} />
          </Col>
        </Row>
        }
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
