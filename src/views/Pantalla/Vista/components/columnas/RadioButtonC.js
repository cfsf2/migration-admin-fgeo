import React, { useState, useEffect, useContext } from "react";
import { FormControlLabel } from "@material-ui/core";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import FuncionesContext from "../../../context/FuncionesContext";
import PantallaContext from "../../../context/PantallaContext";

const RadioButtonC = ({ data, cab, campokey, id_elemento }) => {
  const { superSubmit } = useContext(FuncionesContext);
  const { configuraciones_ref } = useContext(PantallaContext);

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

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <FormControl>
      <div
        id={id_elemento}
        style={{
          display: "flex",
        }}
        className={classNames}
      >
        {nombre ? (
          <div className="vista_label vista_label_fuente">{nombre}:</div>
        ) : (
          <></>
        )}
        <div style={{ marginLeft: "10px" }}>
          <RadioGroup value={value} onChange={handleChange} row>
            {cab.radio_opciones.map((opcion) => {
              return (
                <FormControlLabel
                  key={opcion.value}
                  value={opcion.value}
                  label={opcion.label}
                  control={<Radio />}
                />
              );
            })}
          </RadioGroup>
        </div>
      </div>
    </FormControl>
  );
};

export default RadioButtonC;
