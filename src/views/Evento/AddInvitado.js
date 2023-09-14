import React, { useState } from "react";
import "./evento.scss";
import { v4 } from "uuid";

import Paper from "@mui/material/Paper";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export const AddInvitado = ({ addInvitado }) => {
  const [invitado, setInvitado] = useState({ token: v4() });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    if (event.target.type === "checkbox") {
      newValue = event.target.checked ? "s" : "n";
    }
    setInvitado({
      ...invitado,
      [name]: newValue,
    });
  };

  const handleOnClick = () => {
    if (
      invitado.nombre &&
      invitado.documento &&
      invitado.nombre !== "" &&
      invitado.docuemnto !== ""
    ) {
      addInvitado(invitado);
      setInvitado({ nombre: "", documento: "", token: v4(), menor: "n" });
      return setError(false);
    }
    return setError(true);
  };
  return (
    <Paper className="evento_addInvitado">
      <div className="evento_addInvitado_titulo">Agregar Invitado</div>
      <form className="evento_addInvitado_form">
        <TextField
          onChange={handleChange}
          value={invitado.nombre}
          defaultValue={invitado.nombre}
          name="nombre"
          size="small"
          label="Nombre Completo"
          required
          error={error}
          autoComplete="off"
          className="evento_addInvitado_form_textfield"
        />

        <TextField
          onChange={handleChange}
          value={invitado.documento}
          defaultValue={invitado.documento}
          name="documento"
          size="small"
          label="Documento"
          required
          type="number"
          error={error}
          autoComplete="off"
          className="evento_addInvitado_form_textfield"
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                name="menor"
                checked={invitado.menor === "s"}
              />
            }
            label="Es Menor"
          />
          <AddCircleIcon className="evento_aniadir" onClick={handleOnClick} />
        </div>
      </form>
    </Paper>
  );
};
