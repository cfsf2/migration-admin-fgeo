import React from "react";

import {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
} from "../../../redux/actions/institucionesAction";
import { connect } from "react-redux";

import { Card, CardHeader, Input, Label } from "reactstrap";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./asignarInstituciones.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function AsignarInstituciones(props) {
  const { farmacia, setFarmacia } = props;
  const [instituciones, setInstituciones] = React.useState([]);
  const [farmaciaInstituciones, setFarmaciaInstituciones] = React.useState([]);
  const [values, setValues] = React.useState([]);

  const handleChange = (value) => {
    setFarmaciaInstituciones((state) => {
      let newState = [...state];
      const indx = newState.indexOf(value);
      if (indx === 0) {
        newState.shift();
      }
      if (indx === newState.length) {
        newState.pop();
      }
      if (indx > 0) {
        newState = newState.slice(0, indx).concat(newState.slice(indx + 1));
      }
      if (indx === -1) {
        newState = newState.concat(value);
      }
      return newState;
    });
  };

  React.useEffect(() => {
    if (instituciones.length === 0) {
      props.SEARCH_INSTITUCIONES("", 1000, true).then((res) => {
        setInstituciones(() => res);
        setValues(() => instituciones.map((ins) => ins._id));
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader>Asignar Instituciones</CardHeader>
      <div className="altafarmacia_asignarinstituciones">
        <div className="altafarmacia_asignarinstituciones_instituciones">
          <InputLabel>Instituciones</InputLabel>
          <div className="altafarmacia_asignarinstituciones_instituciones_lista">
            {instituciones &&
              instituciones.map((ins) => {
                return (
                  <MenuItem
                    onClick={() => handleChange(ins._id)}
                    key={ins._id}
                    value={ins._id}
                    className={
                      farmaciaInstituciones.includes(ins._id)
                        ? "seleccionado"
                        : null
                    }
                  >
                    {" "}
                    {ins.nombre}
                  </MenuItem>
                );
              })}
          </div>
        </div>
        <div className="altafarmacia_asignarinstituciones_asignadas">
          <InputLabel>Instituciones Asignadas</InputLabel>
          {farmaciaInstituciones &&
            farmaciaInstituciones.map((ins) => {
              return (
                <MenuItem
                  onClick={() => handleChange(ins)}
                  key={ins}
                  value={ins}
                >
                  {instituciones.find((inst) => inst._id === ins)?.nombre}
                </MenuItem>
              );
            })}
        </div>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    institucionesReducer: state.institucionesReducer,
  };
};
const mapDispatchToProps = {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsignarInstituciones);
