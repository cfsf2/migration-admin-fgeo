import React, { useState, useContext, useEffect } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import PantallaContext from "../../../context/PantallaContext";
import VistaContext from "../../context/VistaContext";

const SiNoEditable = ({ data, cab, campokey, key, indiceData }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { configuraciones_ref } = useContext(PantallaContext);
  const { datos } = useContext(VistaContext);
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
    const valor = e.target.value;

    if (valor === null || lastValue?.toString() === valor.toString().trim())
      return;

    const { id_a } = cab;
    setValue(valor);

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data }).then(
      (result) => {
        setLastvalue(valor);
      }
    );
  };

  useEffect(() => {
    setValue(data[campokey]);
    setUpdate_id(data[cab.update_id_alias]);
  }, [configuraciones_ref[cab.id_a]]);

  return (
    <div key={key} className="tarjeta_grid_item_label_item">
      <div className="vista_label vista_label_fuente">{nombre}:</div>
      <select
        onChange={handleChange}
        value={value === null ? "null" : value === "s" ? "s" : "n"}
        style={{ marginLeft: "10px" }}
      >
        <option value="s" disabled={data[cab.update_id_alias] ? false : true}>
          SI
        </option>
        <option value="n" disabled={data[cab.update_id_alias] ? false : true}>
          NO
        </option>
        <option value="null" disabled></option>
      </select>
    </div>
  );
};

//actulizo este componente y va a recibir el id_update correcto
//o le tendría que pasar el update_id

export default SiNoEditable;
