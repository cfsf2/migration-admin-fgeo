import React from "react";
import { connect } from "react-redux";
import { GET_CAMPANA } from "../../../src/redux/actions/campanasAction";
import { CampanasPage } from "./CampanasPage";

const GestorCampanas = (props) => {
  React.useEffect(() => {
    if (props.UsuarioReducer.usuario) {
      if (props.UsuarioReducer.load) {
        props.GET_CAMPANA(props.UsuarioReducer.usuario._id);
      }
    }
  }, [props.UsuarioReducer.usuario._id]);

  return (
    <>
      {props.CampanaReducer?.campanas_activas ? (
        <CampanasPage {...props} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    CampanaReducer: state.campanasReducer,
    UsuarioReducer: state.userReducer,
  };
};

const mapDispatchToProps = {
  GET_CAMPANA,
};

export default connect(mapStateToProps, mapDispatchToProps)(GestorCampanas);
