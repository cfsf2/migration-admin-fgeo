import React, { useState, useContext, useEffect } from "react";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@mui/material";
import FuncionesContext from "../../../context/FuncionesContext";
import PantallaContext from "../../../context/PantallaContext";

const CheckboxC = ({ data, cab, campokey, id_elemento }) => {
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
    const valor = e.target.checked ? "s" : "n";

    //console.log("avhe", valor);

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

  return (
    <div id={id_elemento} style={{ marginLeft: "14px" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={value === "s" ? true : false}
            onChange={handleChange}
          />
        }
        label={nombre}
      />
    </div>
  );
};

export default CheckboxC;
