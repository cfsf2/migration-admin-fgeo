import React, { useContext, useState } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import TextFieldEditable from "../../../components/TextFieldEditable";
import "../Vista.scss";

const InputTextEditable = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  Context,
  id_elemento
}) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { datos, Dispatch, opciones } = useContext(Context);

  const [value, setValue] = useState(data[campokey]);
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
    console.log(data[campokey]);
  };

  const handleGuardar = async (e) => {
    const valor = e.target.value;

    if (valor === null || lastValue?.toString() === valor.toString().trim())
      return;

    const update_id = data[cab.update_id_alias];
    const { id_a } = cab;

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        setLastvalue(() => valor);

        Dispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            value: result.data.id,
            indiceData,
            key: cab.update_id_alias,
          },
        });

        Dispatch({
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

 

  return (
    <div id={id_elemento} className="tarjeta_grid_item_label_item">
      {opciones.tipo.id === 6 ? (
        <div className="vista_label">
          <p
            style={{
              maxHeight: "25px",
              position: "relative",
              top: "2px",
              wordBreak: "break-all",
            }}
            className="suW"
          >
            {nombre}:
          </p>
        </div>
      ) : (
        <></>
      )}
      <TextFieldEditable
        value={value}
        setValue={setValue}
        onEnter={handleGuardar}
        maxCaracteres={parseInt(cab.maximo_caracteres)}
        id={id_elemento}
      />
    </div>
  );
};

export default InputTextEditable;
