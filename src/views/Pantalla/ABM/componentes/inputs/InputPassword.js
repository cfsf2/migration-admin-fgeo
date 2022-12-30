import React, { useState } from "react";
import { TextField } from "@mui/material";
import Label from "./LabelF";

const InputText = ({ setValor, valor, cab, error, setError, data }) => {
  const {
    id,
    id_a,
    margin_bottom_abm,
    pass_minimo,
    pass_maximo,
    pass_req_mayuscula,
    pass_req_numero,
    pass_confirmar,
  } = cab;

  const [valueConfirmar, setValueConfirmar] = useState("");

  const handleInput = (e) => {
    let { value } = e.target;

    const requiereMayusc = /(?=.*[A-Z])/;
    const requiereNum = /(?=.*\d)/;

    if (
      value.length < pass_minimo ||
      (pass_maximo && value.length > pass_maximo) ||
      (pass_req_mayuscula === "s" && !requiereMayusc.test(value)) ||
      (pass_req_numero === "s" && !requiereNum.test(value))
    ) {
      setError((e) => {
        return { ...e, [id_a]: true };
      });
    }

    // if (pass_confirmar === "s") {
    //   if (valueConfirmar.trim() === "" || valueConfirmar !== value) {
    //     //console.log("fijate la passConfirmar amigo: ", valueConfirmar);
    //     setError((e) => {
    //       return { ...e, [id_a]: true };
    //     });
    //   }
    // }

    setValor(value);
    setError((e) => {
      return { ...e, [id_a]: false };
    });
  };

  const handleInputConfirmar = (e) => {
    const valorConfirmar = e.target.value;
    setValueConfirmar(valorConfirmar);
  };

  const style_input_abm = {
    width: "100%",
    marginBottom: margin_bottom_abm,
  };

  return (
    <>
      {cab.label ? (
        <Label
          label={cab.label}
          opcionales_null={cab.opcionales_null}
          permite_null={cab.permite_null}
        />
      ) : (
        <></>
      )}
      <TextField
        id={id}
        type="password"
        placeholder={cab.placeholder}
        onChange={handleInput}
        defaultValue={data[id_a]}
        label={cab.nombre}
        value={valor ? valor : ""}
        error={error[id_a]}
        InputProps={{
          style: {
            textTransform: cab.solo_mayus === "s" ? "uppercase" : "inherit",
          },
        }}
        style={style_input_abm}
      />
      {/* {pass_confirmar === "s" && (
        <>
          <Label>Confirme su Contraseña</Label>
          <TextField
            type="password"
            value={valueConfirmar}
            onChange={handleInputConfirmar}
          />
        </>
      )}
      {error ? (
        <p style={{ color: "white", backgroundColor: "red" }}>
          tene' algo mal maestro...
        </p>
      ) : null} */}
    </>
  );
};
export default InputText;
