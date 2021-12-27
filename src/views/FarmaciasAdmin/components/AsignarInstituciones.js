import React from "react";

import { GET_INSTITUCIONES } from "../../../redux/actions/institucionesAction";
import { connect } from "react-redux";

export function AsignarInstituciones(props) {
  const { farmacia, setFarmacia } = React.useState("");
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    institucionesReducer: state.institucionesReducer,
  };
};
const mapDispatchToProps = {
  GET_INSTITUCIONES,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsignarInstituciones);
