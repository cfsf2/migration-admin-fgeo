import React, { useState, useContext, useEffect } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import PantallaContext from "../../../context/PantallaContext";
import VistaContext from "../../context/VistaContext";
import { Switch } from "@material-ui/core";

const Toggle = ({ data, cab, campokey, key, indiceData }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { configuraciones_ref } = useContext(PantallaContext);
  const { VistaDispatch } = useContext(VistaContext);
  const [value, setValue] = useState(data[campokey]);
  const [lastValue, setLastvalue] = useState(data[campokey]);
  const [update_id, setUpdate_id] = useState(data[cab.update_id_alias]);

  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

  const handleCancelar = () => {
    setValue(data[campokey]);
    setLastvalue(data[campokey]);
  };

  const handleChange = async (e) => {
    const valor = e.target.checked ? "s" : "n";

    if (valor === null || lastValue?.toString() === valor.toString().trim())
      return;

    const { id_a } = cab;

    setValue(valor);

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        setLastvalue(() => valor);

        VistaDispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            value: result.data.id,
            indiceData,
            key: cab.update_id_alias,
          },
        });

        VistaDispatch({
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
        //console.log("Cancelado ", err);
      });
  };

  useEffect(() => {
    if (configuraciones_ref[cab.id_a] === 1) return;

    setValue(data[campokey]);
    setUpdate_id(data[cab.update_id_alias]);
  }, [configuraciones_ref[cab.id_a]]);
  return (
    <div
      key={key}
      className="tarjeta_grid_item_label_item"
      style={{ justifyContent: "center" }}
    >
      <div className="vista_label" style={{ fontWeight: "bold" }}>
        {nombre}:
      </div>
      <Switch
        color="primary"
        checked={value === null ? false : value === "s" ? true : false}
        onChange={handleChange}
      />
    </div>
  );
};

export default Toggle;
