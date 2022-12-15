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

function NuevoTransfer(props) {
  async function getData() {
    props.CLEAN_PRODUCTOS();
    props.GET_LABORATORIOS();
    props.GET_DROGUERIAS();
    props.LOADPROFILE(localStorage.user, localStorage.token);
  }

  React.useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const { laboratorios, categorias } = props.tranfersReducer;

  return (
    <>
      <div
        className="animated fadeIn"
        style={{
          margin: 30,
          marginBottom: 0,
          padding: 30,
          paddingBottom: 5,
        }}
      >
        <Row style={{ marginBottom: 10 }}>
          <Col>
            <ButtonHome
              //href=""
              titulo="TRANSFER FARMAGEO"
              subtitulo={<br />}
              align="left"
              tipo="grande"
              icono={require("../../../assets/images/icons/1.png")}
            />
          </Col>
        </Row>
      </div>
      {categorias.map((c) => {
        const labs_de_c = laboratorios.filter(
          (l) => l.id_transfer_categoria === c.id
        );
        return (
          <div
            className="animated fadeIn"
            style={{
              margin: 10,
              marginBottom: 0,
              padding: 10,
              paddingBottom: 5,
            }}
          >
            <Row style={{ marginBottom: 30 }}>
              <Col>
                <ButtonHome
                  //href=""
                  titulo={c.nombre.toUpperCase()}
                  subtitulo={<br />}
                  align="left"
                  tipo="grande"
                />
              </Col>
            </Row>
            <Row>
              {labs_de_c.map((lab, index) => {
                return <LaboratorioSelect laboratorio={lab} key={index} />;
              })}
            </Row>
          </div>
        );
      })}

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
