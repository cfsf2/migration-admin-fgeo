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

import { GET_PUBLICIDADES } from "../../../redux/actions/publicidadesActions";

import { LOADPROFILE } from "../../../redux/actions/authActions";

import TransferCart from "./TransferCart";
import SelectNroCuenta from "./components/SelectNroCuenta";
import "./transfer.scss";

function Novedades(result) {
  const comunicado = result.comunicado;
  const novedades = `<div class="transfer_alert_block nove"><p class="tit">Novedades</p><p class="transfer_condiciones_comerciales">${result.data.novedades.trim()}</p></div>`;
  const condcom = `<div class="transfer_alert_block condi"><p class="tit">Condiciones Comerciales</p><p class="transfer_condiciones_comerciales">${result.data.condiciones_comerciales.trim()}</p></div>`;
  return `<div class="transfer_alert">
      ${comunicado ?? ""}
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
      descuento_drogueria: 31.03,
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
    if (this.props.publicidadesReducer.comunicadoTransfers === null) {
      this.props.GET_PUBLICIDADES();
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
            result.comunicado =
              this.props.publicidadesReducer.comunicadoTransfers;
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
    showNovedades({
      data: this.state.lab_selected,
      comunicado: this.props.publicidadesReducer.comunicadoTransfers,
    });
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
          <Col md="12" xs="12">
            <div className="transfer_tit">
              <div className="transfer_tit_bloque">
                <p className="transfer_tit_tit">{lab_selected.nombre}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Card>
          <CardBody style={{ paddingTop: "0.5rem" }}>
            {(this.state.lab_selected.condiciones_comerciales ||
              this.state.lab_selected.novedades) && (
              <div
                className="finalizar_transfer_condiciones"
                onClick={() => this.handleCondiciones()}
              >
                Ver condiciones comerciales
              </div>
            )}
            <SelectNroCuenta
              transfer={this.state.transfer}
              handleInputNroCuenta={this.handleInputNroCuenta}
              farmacia={this.props.farmaciaReducer.farmacia}
              laboratorio={lab_selected}
              descuento={this.state.descuento_drogueria}
              calcularPrecio={this.state.lab_selected.calcular_precio}
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
  GET_PUBLICIDADES,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarTransfer);
