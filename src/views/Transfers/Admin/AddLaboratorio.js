import React from "react";
import FormularioLaboratorio from "./FormularioLaboratorio";

import { connect } from "react-redux";
import {
  GET_LABORATORIOS_ADMIN,
  ADD_LABORATORIO,
  UPDATE_LABORATORIO,
} from "../../../redux/actions/transfersActions";

const AddLaboratorio = (props) => {
  return (
    <FormularioLaboratorio
      pantalla={"s"}
      laboratorio={{ _id: "" }}
      {...props}
    />
  );
};

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {
  GET_LABORATORIOS_ADMIN,
  ADD_LABORATORIO,
  UPDATE_LABORATORIO,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLaboratorio);
