import React, { useState, useContext } from "react";
import FuncionesContext from "../context/FuncionesContext";
import TextArea from "./TextArea";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  customUnderline: {
    "& .MuiInput-underline:before": {
      content: "none",
      borderBottom: "none"
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .Mui-focused:after": {
      transform: "none",
    },
  },
  
});

const InputAreaEditable = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  type,
  context,
  id_elemento,
}) => {
  const { superSubmit } = useContext(FuncionesContext);
  const { datos, Dispatch } = useContext(context);

  const classes = useStyles(); // Usar las clases de estilo

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

  const style = (() => {
    if (data[cab.update_id_alias]) {
      return {
        borderColor: "darkgreen",
        borderWidth: "3px",
      };
    }
    return {
      borderColor: "grey",
    };
  })();

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <div
      id={id_elemento}
      className={"tarjeta_grid_item_label_item " + classNames}
    >
      {nombre ? <div className="vista_label">{nombre}:</div> : <></>}
      {type === "number" ? (
        <TextField
          id={cab.id_a}
          type="number"
          onBlur={handleGuardar}
          defaultValue={value}
          className={classes.customUnderline} // Aplica la clase personalizada
          inputProps={{
            style: {
              padding: "4px",
              textAlign: "left",
              width: "100%",
              borderRadius: "5px",
              fontWeight: 400,
              fontSize: ".8rem",
              border: "1px solid #b9b9b9",
              display: "flex",
              alignItems: "baseline",
              minWidth: "max-content",
              textAlign: cab.align ?? "right",
            },
          }}
        />
      ) : (
        <TextArea
          value={value}
          setValue={setValue}
          onEnter={handleGuardar}
          style={{
            ...style, // Conserva el estilo de borde condicional existente
            padding: "4px",
            textAlign: "left",
            width: "100%",
            borderRadius: "5px",
            fontWeight: 400,
            fontSize: ".8rem",
            border: "1px solid #b9b9b9",
          }}
          id={id_elemento}
        />
      )}
    </div>
  );
};

export default InputAreaEditable;
