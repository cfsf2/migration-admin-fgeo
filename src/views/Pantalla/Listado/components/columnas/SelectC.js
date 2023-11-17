import React, { useState, useContext } from "react";
import Select from "../../../components/Select";
import FuncionesContext from "../../../context/FuncionesContext";
import ListadoContext from "../../context/ListadoContext";

const SelectC = ({ data, cab, hijos, campokey, indiceData,id_elemento }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { ListadoDispatch } = useContext(ListadoContext);

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
    const valor = e.target.value;
    const update_id = data[cab.update_id_alias];

    if (valor === null || lastValue?.toString() === valor.toString().trim())
      return;

    const { id_a } = cab;

    setValue(valor);
    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        setLastvalue(valor);
        ListadoDispatch({
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

  const classNames = data[cab.id_a + "_className"] ?? cab.className;
  return (
    <div id={id_elemento} style={{ textAlign: "center" }} className={classNames}>
      <Select
        nombre={nombre}
        opciones={cab.opciones ? cab.opciones : []}
        value={value}
        onChange={handleChange}
        def={cab.default}
      />
      {hijos}
    </div>
  );
};

export default SelectC;
