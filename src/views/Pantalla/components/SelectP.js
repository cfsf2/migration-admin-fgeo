import React, { useState, useContext } from "react";
import Select from "./Select";
import FuncionesContext from "../context/FuncionesContext";

const Select_Enlazable = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  context,
}) => {
  const { superSubmit, refrescarConfiguracion } = useContext(FuncionesContext);

  const { dispatch, setFiltro, filtros } = useContext(context);

  const [value, setValue] = useState(() => {
    if (filtros[cab.id_a]) {
      return filtros[cab.id_a];
    }
    return data[campokey];
  });

  const [lastValue, setLastvalue] = useState(data[campokey]);

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

    if (cab.select_es_maestro === "s") {
      await setFiltro({ id_a, valor });
      console.log(cab.id_a, "filtros:", filtros);
      refrescarConfiguracion({ cab });

      return;
    }

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        setLastvalue(valor);
        dispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            key: cab.update_id_alias, // update_id
            indiceData: indiceData, // 4
            value: result.data.id,
          },
        });
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
          id={cab.id_a}
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

export default Select_Enlazable;
