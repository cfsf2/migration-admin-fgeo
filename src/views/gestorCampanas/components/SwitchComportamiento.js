import React from "react";
import { connect } from "react-redux";
import CapturaWs from "./CapturaWs";

export function SwitchComportamiento(
  { codigo, campana, CampanaReducer, authReducer },
  props
) {
  const orientados = campana.orientados.map((orientado) => orientado.nombre);
  switch (true) {
    case CampanaReducer.loading:
      return null;

    case codigo === "captura_ws" &&
      orientados.includes("usuario_farmageo_admin"):
      if (authReducer.user.islogin) {
        return <CapturaWs campana={campana} actulizarTel={false} />;
      }
      return null;

    case codigo === "captura_ws" &&
      orientados.includes("usuario_farmageo_noreg"):
      return <CapturaWs campana={campana} />;

    case "nada":
      return null;

    default:
      return null;
  }
}

const mapStateToProps = (state) => {
  return {
    CampanaReducer: state.campanasReducer,
    authReducer: state.authReducer,
    
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchComportamiento);
