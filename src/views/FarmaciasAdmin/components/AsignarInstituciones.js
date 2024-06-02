import React from "react";

import {
  GET_INSTITUCIONES,
  GET_INSTITUCIONES_USUARIO,
} from "../../../redux/actions/institucionesAction";
import { connect } from "react-redux";

import { Card, CardHeader, Input, Label, Spinner } from "reactstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import "./asignarInstituciones.scss";
import axios from "axios";
import { farmageo_api } from "config";

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

function AsignarInstituciones(props) {
  const {
    obj = { _id: "" },
    setObj,
    invalid,
    error,
    compacto = false,
    key,
  } = props;
  const [loading, setLoading] = React.useState(true);
  const [allinstituciones, setAllInstituciones] = React.useState([]);
  const [institucionesUsuario, setInstitucionesUsuario] = React.useState([]);

  const [instituciones, setInstituciones] = React.useState([]);
  const [institucionesFarmacia, setinstitucionesFarmacia] = React.useState(
    obj && obj.instituciones ? obj.instituciones : []
  ); //obj.instituciones es un array de id de instituciones

  const handleChange = (value) => {
    setinstitucionesFarmacia((state) => {
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
      setObj(() => {
        return { ...obj, instituciones: newState };
      });
      return newState;
    });
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    let resultado = [...institucionesUsuario]
      .filter((ins) => ins.nombre.toLowerCase().startsWith(value.toLowerCase()))
      .sort();
    setInstituciones(() => resultado);
    if (value.trim() === "") {
      setInstituciones(institucionesUsuario);
    }
  };

  React.useEffect(() => {
    const fd = async () => {
      setLoading(true);
      if (instituciones.length === 0) {
        await axios
          .get(farmageo_api + "/instituciones", {
            params: { limit: 100, usuario: true },
          })
          .then((res) => {
            setInstitucionesUsuario(() => res.data);
            setInstituciones(() => res.data);
            setLoading(false);
          });
      }
      if (props.institucionesReducer.instituciones.length === 0) {
        await axios
          .get(farmageo_api + "/instituciones", { params: { limit: 100 } })
          .then((res) => {
            setAllInstituciones(() => res.data);
            setLoading(false);
          });
        return;
      }

      setLoading(false);
    };
    fd();
  }, []);

  React.useEffect(() => {
    setinstitucionesFarmacia([]);
    if (obj && obj.instituciones) {
      setinstitucionesFarmacia((state) => obj.instituciones);
    }
    if (obj && !obj.instituciones) setinstitucionesFarmacia([]);
    //if (!obj) setinstitucionesFarmacia([]);
  }, [obj]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card
      className={` w-100 ${
        institucionesFarmacia.length === 0 && (invalid || error)
          ? "error"
          : null
      } ${compacto ? "h-100" : null}`}
      key={key}
    >
      <CardHeader>Asignar Instituciones</CardHeader>
      <div
        className={`altafarmacia_asignarinstituciones ${
          compacto ? "compacto" : null
        }`}
      >
        <TextField
          label="Buscar..."
          type="text"
          onChange={handleFilter}
          className="altafarmacia_asignarinstituciones_instituciones_buscar"
        />
        <div className="altafarmacia_asignarinstituciones_instituciones">
          <InputLabel>Instituciones</InputLabel>

          <div
            className={
              compacto
                ? `altafarmacia_asignarinstituciones_instituciones_lista `
                : `altafarmacia_asignarinstituciones_instituciones_lista`
            }
          >
            {instituciones &&
              instituciones.map((ins) => {
                ins._id = ins.id?.toString();
                return (
                  <MenuItem
                    onClick={() => handleChange(ins._id)}
                    key={ins._id}
                    value={ins._id}
                    className={`${
                      loading
                        ? "no-seleccionado"
                        : institucionesFarmacia.includes(ins._id)
                        ? "seleccionado"
                        : "no-seleccionado"
                    } ${ins.habilitada ? null : "no-habilitada"}`}
                  >
                    {" "}
                    {ins.nombre}
                  </MenuItem>
                );
              })}
          </div>
        </div>

        <div className="altafarmacia_asignarinstituciones_asignadas_lol">
          <InputLabel>Instituciones Asignadas</InputLabel>
          <div className="altafarmacia_asignarinstituciones_asignadas">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {allinstituciones.length > 0 &&
                  institucionesFarmacia &&
                  institucionesFarmacia.map((ins) => {
                    const usuarioPuedeModificar = institucionesUsuario.some(
                      (iu) => iu.id == ins
                    );
                    return (
                      <MenuItem
                        onClick={
                          usuarioPuedeModificar
                            ? () => handleChange(ins)
                            : () => {}
                        }
                        key={ins}
                        value={ins}
                        className={
                          usuarioPuedeModificar
                            ? "asignada_item"
                            : "asignada_item_disabled"
                        }
                      >
                        {allinstituciones.length > 0 ? (
                          allinstituciones.find((inst) => inst._id == ins)
                            ?.nombre
                        ) : (
                          <></>
                        )}
                      </MenuItem>
                    );
                  })}
              </>
            )}
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
  GET_INSTITUCIONES_USUARIO,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsignarInstituciones);
