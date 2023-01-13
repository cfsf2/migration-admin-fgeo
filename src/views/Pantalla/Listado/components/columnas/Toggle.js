import React, { useState, useContext, useEffect } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import PantallaContext from "../../../context/PantallaContext";
import ListadoContext from "../../context/ListadoContext";
import { Switch } from "@material-ui/core";

const Toggle = ({ data, cab, campokey, indiceData, id_elemento }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { configuraciones_ref } = useContext(PantallaContext);
  const { datos, ListadoDispatch } = useContext(ListadoContext);

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


  return (
    <div
      id={id_elemento}
      className="tarjeta_grid_item_label_item"
      style={{ justifyContent: "center" }}
    >
      <Switch
        color="primary"
        checked={value === null ? false : value === "s" ? true : false}
        onChange={handleChange}
      />
    </div>
  );
};

export default Toggle;
