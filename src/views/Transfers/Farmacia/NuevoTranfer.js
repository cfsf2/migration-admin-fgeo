import React, { Component, Fragment } from "react";

import { Col, Row } from "reactstrap";

import { connect } from "react-redux";
import LaboratorioSelect from "./components/LaboratorioSelect";

import {
  GET_LABORATORIOS,
  GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
} from "../../../redux/actions/transfersActions";

import { LOADPROFILE } from "../../../redux/actions/authActions";

import ButtonHome from "../../Dashboard/components/ButtonHome";

class NuevoTransfer extends Component {
  componentDidMount() {
    this.props.CLEAN_PRODUCTOS();
    this.props.GET_LABORATORIOS();
    this.props.GET_DROGUERIAS();
    this.props.LOADPROFILE(localStorage.user, localStorage.token);
  }
  componentDidUpdate() {}

  render() {
    const { laboratorios } = this.props.tranfersReducer;
    return (
      <>
        <div
          className="animated fadeIn"
          style={{ margin: 30, marginBottom: 0, padding: 30, paddingBottom: 5 }}
        >
          <Row style={{ marginBottom: 30 }}>
            <Col>
              <ButtonHome
                //href=""
                titulo="TRANSFERS FARMACIAS"
                subtitulo={<br />}
                align="left"
                tipo="grande"
                icono={require("../../../assets/images/icons/1.png")}
              />
            </Col>
          </Row>
          <Row>
            {laboratorios.map((lab, index) => {
              return lab.habilitado === "s" && lab.transfer_farmageo === "s" ? (
                <LaboratorioSelect laboratorio={lab} key={index} />
              ) : null;
            })}
          </Row>
        </div>

        {/*-----Container del bloque de links externos-----*/}
        <div
          className="animated fadeIn"
          style={{
            //marginTop: 0,
            marginBottom: 30,
            marginLeft: 30,
            marginRight: 30,
            padding: 30,
            paddingBottom: 5,
          }}
        >
          <Row style={{ marginBottom: 30 }}>
            <Col>
              <ButtonHome
                //href=""
                titulo="TRANSFERS EXTERNOS"
                subtitulo={<br />}
                align="left"
                tipo="grande"
                icono={require("../../../assets/images/icons/1.png")}
              />
            </Col>
          </Row>
          <Row>
            {laboratorios.map((lab, index) => {
              return lab.habilitado === "s" && lab.transfer_farmageo === "n" ? (
                <LaboratorioSelect laboratorio={lab} key={index} />
              ) : null;
            })}
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
    farmaciaReducer: state.farmaciaReducer,
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = {
  GET_LABORATORIOS,
  GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
  LOADPROFILE,
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoTransfer);
