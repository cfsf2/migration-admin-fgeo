import React, { useState, useContext, useEffect } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import PantallaContext from "../../../context/PantallaContext";
import ListadoContext from "../../context/ListadoContext";
import { Switch, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  switchBase: {
    "&.Mui-checked.Mui-disabled": {
      color: "hsl(231, 48.4%, 70%)", // Color degradado para el track.
    },
    "&.Mui-checked.Mui-disabled + .MuiSwitch-track": {
      backgroundColor: "hsl(231, 48.4%, 47.8%)", // Color degradado para el track.
    },
  },
  track: {
    opacity: 0.5, // Opcional: Ajustar la opacidad del track cuando está deshabilitado.
  },
}));
const Toggle = ({ data, cab, campokey, indiceData, id_elemento }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { configuraciones_ref } = useContext(PantallaContext);
  const { datos, ListadoDispatch } = useContext(ListadoContext);

  const [value, setValue] = useState(data[campokey]);
  const [lastValue, setLastvalue] = useState(data[campokey]);
  const [update_id, setUpdate_id] = useState(data[cab.update_id_alias]);
  const classes = useStyles();

  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();
  const disabled = (() => {
    return data[cab.id_a + "_disabled"] ?? cab.disabled;
  })();

  const handleCancelar = () => {
    setValue(data[campokey]);
    setLastvalue(data[campokey]);
  };

  const handleChange = async (e) => {
    const valor = e.target.checked ? "s" : "n";

    if (valor === null || lastValue?.toString() === valor.toString().trim())
      return;

    const { id_a, alerta_exito } = cab;

    setValue(valor);

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        setLastvalue(() => valor);

        ListadoDispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            value: result.data.id,
            indiceData,
            key: cab.update_id_alias,
          },
        });

        ListadoDispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            value: valor,
            indiceData,
            key: cab.campo_alias ? cab.campo_alias : id_a,
          },
        });

        return result;
      })
      .catch((err) => {
        console.log("Cancelado ", err);
      });
  };

  useEffect(() => {
    if (configuraciones_ref[cab.id_a] === 1) return;

    setValue(data[campokey]);
    setUpdate_id(data[cab.update_id_alias]);
  }, [configuraciones_ref[cab.id_a]]);

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <div
      id={id_elemento}
      className={"tarjeta_grid_item_label_item " + classNames}
      style={{ justifyContent: "center" }}
    >
      <Switch
        disabled={disabled === "s"}
        color="primary"
        checked={value === null ? false : value === "s" ? true : false}
        onChange={handleChange}
        classes={{
          switchBase: classes.switchBase,
          track: classes.track,
        }}
      />
    </div>
  );
};

export default Toggle;
