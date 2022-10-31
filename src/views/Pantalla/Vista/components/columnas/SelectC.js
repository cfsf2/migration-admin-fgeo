import React, { useState, useContext } from "react";
import Select from "../../../components/Select";
import FuncionesContext from "../../../context/FuncionesContext";
import VistaContext from "../../context/VistaContext";

const SelectC = ({ data, cab, hijos, campokey, indiceData }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { VistaDispatch } = useContext(VistaContext);

  const [value, setValue] = useState(data[campokey]);
  const [lastValue, setLastvalue] = useState(data[campokey]);
  const [capturaId, setCapturaId] = useState();

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
    let valor = e.target.value;
    const update_id = data[cab.update_id_alias];

    if (valor === null || lastValue?.toString() === valor.toString().trim())
      return;

    const { id_a } = cab;

    if (typeof cab.opciones[0].value === "number") {
      valor = parseInt(valor, 10);
    }

    setValue(valor);
    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        setLastvalue(valor);
        VistaDispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            key: cab.update_id_alias, // update_id
            indiceData: indiceData, // 4
            value: result.data.id,
          },
        });
        setCapturaId(result.data.id);
      })
      .catch((err) => {
        console.log("Cancelado ", err);
      });
  };
  return (
    //<div style={{ textAlign: "center"}}>
    <div style={{ flex: "1 0 100%" }}>
      <div
        className="vista_label_select"
        //style={{ fontWeight: "bold", display: "flex", width: "100%" }}
      >
        <p style={{ flexShrink: 0, flexWrap: "wrap" }}>{cab.nombre}:</p>
        <Select
          nombre={nombre}
          opciones={cab.opciones ? cab.opciones : []}
          value={value}
          onChange={handleChange}
          def={cab.default}
        />
        {hijos}
      </div>
    </div>
  );
};

export default SelectC;
