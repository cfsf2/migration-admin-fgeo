import React, { Component } from "react";

import { Button, Card, CardBody, Col, Row } from "reactstrap";
import axios from "axios";
import { farmageo_api } from "../../../config";

import { image_path_server } from "../../../config";
import S from "sweetalert2";

import { connect } from "react-redux";

import {
  ADD_TRANSFER,
  GET_LABORATORIOS,
  SET_LABORATORIO_SELECTED,
  SUBMITTING,
} from "../../../redux/actions/transfersActions";

import { LOADPROFILE } from "../../../redux/actions/authActions";

import TransferCart from "./TransferCart";
import SelectNroCuenta from "./components/SelectNroCuenta";
import "./transfer.scss";

function Novedades(result) {
  const novedades = `<div class="transfer_alert_block nove"><p class="tit">Novedades</p><p class="transfer_condiciones_comerciales">${result.data.novedades.trim()}</p></div>`;
  const condcom = `<div class="transfer_alert_block condi"><p class="tit">Condiciones Comerciales</p><p class="transfer_condiciones_comerciales">${result.data.condiciones_comerciales.trim()}</p></div>`;
  return `<div class="transfer_alert">
      ${result.data.novedades.trim() ? novedades : ""}
      ${result.data.condiciones_comerciales.trim() ? condcom : ""}
    </div>`;
}

function showNovedades(result) {
  S.fire({
    html: Novedades(result),
    showCloseButton: true,
    timer: 50000,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
  });
}

class FinalizarTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transfer: {},
      productos: [],
      finalizar: false,
      vistaprevia: false,
      submitting: false,
      lab_selected: {},
      descuento_drogueria: 0,
    };

    this.handlequery = this.handlequery.bind(this);
    this.handleInputNroCuenta = this.handleInputNroCuenta.bind(this);
    this.handleCondiciones = this.handleCondiciones.bind(this);
  }

  handleInputNroCuenta(e) {
    if (this.state.lab_selected.modalidad_entrega.id_a === "DIRECTO") {
      return this.setState({
        transfer: { ...this.state.transfer, [e.target.name]: e.target.value },
      });
    }

    const nro_cuenta_drogueria =
      this.props.farmaciaReducer.farmacia.nro_cuenta_drogueria.find(
        (cta) => cta.id_drogueria.toString() === e.target.value.toString()
      );

    this.setState({
      descuento_drogueria: nro_cuenta_drogueria
        ? nro_cuenta_drogueria.descuento
        : 0,
      transfer: {
        ...this.state.transfer,
        [e.target.name]: e.target.value,
        nro_cuenta_drogueria: nro_cuenta_drogueria
          ? nro_cuenta_drogueria.nro_cuenta
          : "",
      },
    });
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  async componentDidMount() {
    var laboratorio = this.handlequery().get("l");
    if (this.props.farmaciaReducer.load === false) {
      LOADPROFILE(localStorage.user, localStorage.token);
    }
    if (this.props.tranfersReducer.laboratorios.length === 0) {
      this.props.GET_LABORATORIOS();
    }

    if (laboratorio) {
      const lab_local = this.props.tranfersReducer.laboratorios.find(
        (l) => l.id.toString() === laboratorio.toString()
      );
      this.props.SET_LABORATORIO_SELECTED(lab_local);
    }

    if (laboratorio) {
      try {
        const result = await axios.get(
          farmageo_api + "/laboratorios/" + laboratorio
        );
        if (result.data) {
          this.setState({ lab_selected: result.data });
          this.props.SET_LABORATORIO_SELECTED(result.data);
          if (result.data.condiciones_comerciales || result.data.novedades) {
            showNovedades(result);
          }
        }
      } catch (error) {
        this.setState({ lab_selected: null });
      }
    }
  }
  async componentDidUpdate() {
    if (this.props.tranfersReducer.laboratorios.length === 0) {
      this.props.GET_LABORATORIOS();
    }
  }

  handleCondiciones() {
    showNovedades({ data: this.state.lab_selected });
  }

  render() {
    const { lab_selected, calcular_precio } = this.state;
    const { comunicadoTransfers } = this.props.publicidadesReducer;

    if (this.props.farmaciaReducer.load === false)
      return <p>Cargando farmacia</p>;
    return (
      <div
        className="animated fadeIn"
        style={{ whiteSpace: "pre-wrap", marginBottom: "2.5rem" }}
      >
        {/* <ModalStep /> */}

        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col md="4" xs="12">
            <Button
              href={process.env.PUBLIC_URL + "/#/NuevoTransfer"}
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
          <Col md="4" xs="12">
            <div className="transfer_tit">
              <div className="transfer_tit_bloque">
                <img
                  className="transfer_tit_imagen"
                  src={image_path_server + lab_selected.imagen}
                  alt="loguito"
                ></img>
                <p className="transfer_tit_tit">{lab_selected.nombre}</p>
              </div>
            </div>
          </Col>
          <Col md="4"></Col>
        </Row>
        <Card>
          <CardBody style={{ paddingTop: "0.5rem" }}>
            {(this.state.lab_selected.condiciones_comerciales ||
              this.state.lab_selected.novedades) && (
              <div
                className="finalizar_transfer_condiciones"
                onClick={() => this.handleCondiciones()}
              >
                Condiciones
              </div>
            )}
            <SelectNroCuenta
              transfer={this.state.transfer}
              handleInputNroCuenta={this.handleInputNroCuenta}
              farmacia={this.props.farmaciaReducer.farmacia}
              laboratorio={lab_selected}
              descuento={this.state.descuento_drogueria}
            />
            <TransferCart
              transfer={this.state.transfer}
              descuentoDrogueria={this.state.descuento_drogueria}
              calcularPrecio={this.state.lab_selected.calcular_precio}
              history={this.props.history}
            />
          </CardBody>
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
    farmaciaReducer: state.farmaciaReducer,
  };
};
const mapDispatchToProps = {
  ADD_TRANSFER,
  SUBMITTING,
  GET_LABORATORIOS,
  SET_LABORATORIO_SELECTED,
  LOADPROFILE,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarTransfer);
