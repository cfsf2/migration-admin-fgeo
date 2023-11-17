import React, { useState, useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/es";
import VistaContext from "../../context/VistaContext";
import FuncionesContext from "../../../context/FuncionesContext";
registerLocale("ar", ar);

function parseISOString(s) {
  if (!s) return;
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const InputDate = ({ data, cab, campokey, indiceData, id_elemento }) => {
  const {
    guardarSinConfirmar,
    guardarConConfirmacion,
    insertarConConfirmacion,
    insertarSinConfirmar,
  } = useContext(FuncionesContext);
  const { datos, VistaDispatch } = useContext(VistaContext);

  const [value, setValue] = useState(parseISOString(data[campokey]));
  const [lastValue, setLastvalue] = useState(parseISOString(data[campokey]));

  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

  const handleCancelar = () => {
    setValue(parseISOString(data[campokey]));
    setLastvalue(parseISOString(data[campokey]));
  };

  const handleGuardar = async (date) => {
    const valor = date;

    if (valor === null || lastValue?.toDateString() === valor?.toDateString())
      return;

    const valorParseado = valor
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    setValue(valor);
    const update_id = data[cab.update_id_alias];
    const { id_a } = cab;

    if (!update_id) {
      const insert_ids = data[cab.insert_ids_alias];

      if (cab.alerta_confirmar === "s") {
        return await insertarConConfirmacion({
          valor: valorParseado,
          id_a,
          insert_ids,
          handleCancelar,
          refrescar: cab.refrescarConfiguracion,
        })
          .then((result) => {
            setLastvalue(value);

            VistaDispatch({
              type: "SET_DATO_ESPECIFICO",
              payload: {
                valor: result.data.id,
                indiceData,
                key: cab.update_id_alias,
              },
            });

            VistaDispatch({
              type: "SET_DATO_ESPECIFICO",
              payload: {
                valor: value
                  ?.toISOString()
                  .replace(/T/, " ")
                  .replace(/\..+/, ""),
                indiceData,
                key: cab.campo_alias ? cab.campo_alias : id_a,
              },
            });

            return result;
          })
          .catch((err) => {
            console.log("Cancelado ", err);
          });
      }
      return await insertarSinConfirmar({
        valor: valorParseado,
        insert_ids,
        id_a,
        handleCancelar,
        refrescar: cab.refrescarConfiguracion,
      }).then((result) => {
        setLastvalue(value);

        VistaDispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            valor: result.data.id,
            indiceData,
            key: cab.update_id_alias,
          },
        });

        VistaDispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            valor: valorParseado,
            indiceData,
            key: cab.campo_alias ? cab.campo_alias : id_a,
          },
        });
        return result;
      });
    }

    if (cab.alerta_confirmar === "s") {
      return await guardarConConfirmacion({
        valor: valorParseado,
        update_id,
        id_a,
        handleCancelar,
        refrescar: cab.refrescarConfiguracion,
      }).then((result) => {
        setLastvalue(value);
        return result;
      });
    }

    return await guardarSinConfirmar({
      valor: valorParseado,
      update_id,
      id_a,
      handleCancelar,
      refrescar: cab.refrescarConfiguracion,
    }).then(() => {
      setLastvalue(value);
    });
  };

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <div
      id={id_elemento}
      className={"tarjeta_grid_item_label_item " + classNames}
    >
      {nombre ? <label className="vista_label">{nombre}:</label> : <></>}
      <DatePicker
        selected={value}
        onChange={handleGuardar}
        isClearable
        dateFormat="dd-MMMM-yyyy"
        locale="ar"
        placeholderText=" sin fecha "
      />
    </div>
  );
};

export default InputDate;
