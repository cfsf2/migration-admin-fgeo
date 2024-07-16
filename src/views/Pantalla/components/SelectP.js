import React, { useState, useContext } from "react";
import Select from "./Select";
import FuncionesContext from "../context/FuncionesContext";
import { useEffect } from "react";

const Select_Enlazable = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  context,
  id_elemento,
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
      setFiltro({ id_a, valor });
      refrescarConfiguracion({ cab });

      // console.log(cab.id_a, "filtros:", filtros);

      return;
    }

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        console.log(cab.update_id_alias, indiceData, result.data.id)
        setLastvalue(valor);
        setValue(valor);
        dispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            key: cab.update_id_alias, // update_id
            indiceData: indiceData, // 4
            value: result.data.id,
          },
        });
         dispatch({
           type: "SET_DATO_ESPECIFICO",
           payload: {
             key: cab.id_a, // update_id
             indiceData: indiceData, // 4
             value: valor,
           },
         });
      })
      .catch((err) => {
        console.log("Cancelado ", err);
      });
  };

  useEffect(() => {
    console.log(cab.id_a, "value", value);
  });
  const classNames = data[cab.id_a + "_className"] ?? cab.className;
  return (
    //<div style={{ textAlign: "center"}}>
    <div id={id_elemento} style={{ flex: "1 0 100%" }}>
      <div
        className={"vista_label_select " + classNames}
        //style={{ fontWeight: "bold", display: "flex", width: "100%" }}
      >
        {cab.nombre ? (
          <p style={{ flexShrink: 0, flexWrap: "wrap" }}>{cab.nombre}:</p>
        ) : (
          <></>
        )}
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
