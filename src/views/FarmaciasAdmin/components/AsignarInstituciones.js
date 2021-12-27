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
import TextField from "@mui/material/TextField";
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
  const [allinstituciones, setAllInstituciones] = React.useState([]);
  const [instituciones, setInstituciones] = React.useState(
    farmacia.instituciones ? farmacia.instituciones : []
  );
  const [farmaciaInstituciones, setFarmaciaInstituciones] = React.useState([]);

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
      setFarmacia((state) => {
        return { ...state, instituciones: newState };
      });
      return newState;
    });
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    let resultado = [...allinstituciones]
      .filter((ins) => ins.nombre.toLowerCase().startsWith(value.toLowerCase()))
      .sort();
    setInstituciones(() => resultado);
    if (value.trim() === "") {
      setInstituciones(allinstituciones);
    }
  };

  React.useEffect(() => {
    if (instituciones.length === 0) {
      props.SEARCH_INSTITUCIONES("", 1000, true).then((res) => {
        setAllInstituciones(() => res);
        setInstituciones(() => res);
      });
    }
  }, []);

  return (
    <Card className="w-100">
      <CardHeader>Asignar Instituciones</CardHeader>
      <div className="altafarmacia_asignarinstituciones">
        <TextField
          label="Buscar..."
          type="text"
          onChange={handleFilter}
          className="altafarmacia_asignarinstituciones_instituciones_buscar"
        />
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
                        : "no-seleccionado"
                    }
                  >
                    {" "}
                    {ins.nombre}
                  </MenuItem>
                );
              })}
          </div>
        </div>
        <div>
          <InputLabel>Instituciones Asignadas</InputLabel>
          <div className="altafarmacia_asignarinstituciones_asignadas">
            {farmaciaInstituciones &&
              farmaciaInstituciones.map((ins) => {
                return (
                  <MenuItem
                    onClick={() => handleChange(ins)}
                    key={ins}
                    value={ins}
                    className="asignada"
                  >
                    {allinstituciones.find((inst) => inst._id === ins)?.nombre}
                  </MenuItem>
                );
              })}
          </div>
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
