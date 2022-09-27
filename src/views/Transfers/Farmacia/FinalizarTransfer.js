import React, { Component } from "react";

import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import { farmageo_api } from "../../../config";

import { connect } from "react-redux";

import {
  ADD_TRANSFER,
  GET_LABORATORIOS,
  SET_LABORATORIO_SELECTED,
  SUBMITTING,
} from "../../../redux/actions/transfersActions";

import TransferCart from "./TransferCart";
import SelectDrogueria from "./components/SelectDrogueria";
import SelectLaboratorioCuenta from "./components/SelectLaboratorioCuenta";

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
    };

    this.handlequery = this.handlequery.bind(this);
    this.handleInputNroCuenta = this.handleInputNroCuenta.bind(this);
  }

  handleInputNroCuenta(e) {
    if (this.state.lab_selected.permite_nro_cuenta === "n") {
      const nro_cuenta_drogueria =
        this.props.farmaciaReducer.farmacia.nro_cuenta_drogueria.find(
          (cta) => cta.id_drogueria.toString() === e.target.value.toString()
        );

      this.setState({
        transfer: {
          ...this.state.transfer,
          [e.target.name]: e.target.value,
          nro_cuenta_drogueria: nro_cuenta_drogueria
            ? nro_cuenta_drogueria.nro_cuenta
            : "",
        },
      });
    }
    if (this.state.lab_selected.permite_nro_cuenta === "s") {
      this.setState({
        transfer: { ...this.state.transfer, [e.target.name]: e.target.value },
      });
    }
  }

  handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
  };

  async componentDidMount() {
    var laboratorio = this.handlequery().get("l");

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

  render() {
    const { lab_selected } = this.state;
    const { comunicadoTransfers } = this.props.publicidadesReducer;

    return (
      <div className="animated fadeIn">
        {/* <ModalStep /> */}

        <Row>
          <Col md="3" xs="12">
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
        </Row>

        <Row>
          <Col md="12" xs="12">
            <div
              style={{
                color: "black",
                fontSize: 14,
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
              <p style={{ whiteSpace: "pre-wrap" }}>
                {lab_selected !== null ? lab_selected.novedades : ""}
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>{comunicadoTransfers}</p>
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
              {lab_selected?.permite_nro_cuenta === "s" ? (
                <SelectLaboratorioCuenta
                  transfer={this.state.transfer}
                  handleInputNroCuenta={this.handleInputNroCuenta}
                  farmacia={this.props.farmaciaReducer.farmacia}
                  laboratorio={lab_selected}
                />
              ) : (
                <SelectDrogueria
                  transfer={this.state.transfer}
                  handleInputNroCuenta={this.handleInputNroCuenta}
                  farmacia={this.props.farmaciaReducer.farmacia}
                />
              )}

              <Col md="4" xs="12">
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
            <hr />
            <TransferCart
              transfer={this.state.transfer}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarTransfer);
