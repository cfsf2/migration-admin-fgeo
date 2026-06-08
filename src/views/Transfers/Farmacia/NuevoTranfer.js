import React, { Fragment } from "react";

import { Col, Row } from "reactstrap";

import { connect } from "react-redux";
import LaboratorioSelect from "./components/LaboratorioSelect";

import {
  GET_LABORATORIOS_FARMACIA,
  GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
} from "../../../redux/actions/transfersActions";

import { LOADPROFILE } from "../../../redux/actions/authActions";

import TransferTitle from "./TransferCategoriaTitle";

import "./transfer.scss";

const transferIcon = require("../../../assets/images/icons/1.png");

function SectionTitle({ titulo, icono }) {
  return (
    <div className="transfer-section-title-wrapper">
      <div className="transfer-section-title">
        {icono && (
          <img
            src={icono}
            alt=""
            className="transfer-section-title-icon"
          />
        )}

        <h3 className="transfer-section-title-text">{titulo}</h3>
      </div>
    </div>
  );
}

function NuevoTransfer(props) {
  async function getData() {
    props.CLEAN_PRODUCTOS();
    props.GET_LABORATORIOS_FARMACIA();
    props.GET_DROGUERIAS();
    props.LOADPROFILE(localStorage.user, localStorage.token);
  }

  React.useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const { laboratorios, categorias } = props.tranfersReducer;

  const transfersExternos = laboratorios.filter(
    (lab) =>
      lab.habilitado === "s" &&
      lab.transfer_farmageo === "n" &&
      lab.es_bono_descuento !== "s"
  );

  const bonosDescuentos = laboratorios.filter(
    (lab) =>
      lab.habilitado === "s" &&
      lab.transfer_farmageo === "n" &&
      lab.es_bono_descuento === "s"
  );

  return (
    <>
      <div className="animated fadeIn transfer-main-section">
        <Row>
          <Col>
            <SectionTitle
              titulo="TRANSFER FARMAGEO"
              icono={transferIcon}
            />
          </Col>
        </Row>
      </div>

      {categorias.map((c) => {
        const labs_de_c = laboratorios.filter(
          (l) => l.id_transfer_categoria === c.id
        );

        if (labs_de_c.length === 0) return <Fragment key={c.id}></Fragment>;

        return (
          <div
            className="animated fadeIn transfer-category-section"
            key={c.id}
          >
            <div className="transfer-category-title-container">
              <Col>
                <TransferTitle
                  titulo={c.nombre.toUpperCase()}
                  align="center"
                  tipo="grande"
                />
              </Col>
            </div>

            <Row>
              {labs_de_c.map((lab) => {
                return lab.con_permiso === "s" &&
                  lab.transfer_farmageo === "s" ? (
                  <LaboratorioSelect laboratorio={lab} key={lab.id} />
                ) : (
                  <Fragment key={lab.id}></Fragment>
                );
              })}

              {labs_de_c.map((lab) => {
                return lab.con_permiso === "n" &&
                  lab.transfer_farmageo === "s" ? (
                  <LaboratorioSelect laboratorio={lab} key={lab.id} />
                ) : (
                  <Fragment key={lab.id}></Fragment>
                );
              })}
            </Row>
          </div>
        );
      })}

      {/*-----Container del bloque de links externos-----*/}
      <div className="animated fadeIn transfer-main-section">
        <Row>
          <Col>
            <SectionTitle
              titulo="TRANSFERS EXTERNOS"
              icono={transferIcon}
            />
          </Col>
        </Row>

        <Row>
          {transfersExternos.map((lab) => {
            return <LaboratorioSelect laboratorio={lab} key={lab.id} />;
          })}
        </Row>
      </div>

      {/*-----Container del bloque de bonos y programas de descuentos-----*/}
      <div className="animated fadeIn transfer-main-section">
        <Row>
          <Col>
            <SectionTitle
              titulo="SISTEMA DE BONOS Y PROGRAMAS DE DESCUENTOS"
              icono={transferIcon}
            />
          </Col>
        </Row>

        <Row>
          {bonosDescuentos.map((lab) => {
            return <LaboratorioSelect laboratorio={lab} key={lab.id} />;
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
  GET_LABORATORIOS_FARMACIA,
  GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
  LOADPROFILE,
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoTransfer);