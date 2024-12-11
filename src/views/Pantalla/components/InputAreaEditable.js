import React, { useState, useContext } from "react";
import FuncionesContext from "../context/FuncionesContext";
import TextArea from "./TextArea";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  numberComponent: {
    "& .MuiInputBase-input": {
      fontSize: "0.8rem",
      padding: "4px",
      borderRadius: "5px",
      border: "1px solid #b9b9b9",
    },
    "& .MuiInputBase-input:hover": {
      border: "1px solid #2a2a2a",
    },
    "& .MuiInputBase-input:focus": {
      border: "1px solid #0096b3",
    },
    "& .css-nnbavb": {
      display: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "&.MuiFormControl-root": {
      width: "100%",
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

  const classes = useStyle();

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
          inputProps={{
            style: {
              textAlign: cab.align ?? "right",
              display: "flex",
              alignItems: "baseline",
            },
          }}
          className={classes.numberComponent}
        />
      ) : (
        <TextArea
          value={value}
          setValue={setValue}
          onEnter={handleGuardar}
          style={style}
          id={id_elemento}
        />
      )}
    </div>
  );
};

export default InputAreaEditable;
