import { TextField } from "@mui/material";

import Button from "@mui/material/Button";
import React, { useState } from "react";

export const Telefono = ({
  titular,
  confirmarTelefono,
}) => {
  const [telefono, setTelefono] = useState(titular.telefono);
  const handleClick = (e) => {
    confirmarTelefono(telefono);
  };
  return (
    <div className="evento_container_telefono">
      <div>
        <TextField
          label="Telefono"
          size="small"
          value={telefono}
          type="number"
          className="evento_telefono_intput"
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <div className="evento_telefono_disclaimer">
          (*) obligatorio para poder enviar las entradas por QR
        </div>
      </div>
      <Button
        variant="contained"
        color="success"
        size="small"
        className="evento_telefono_confirmar"
        onClick={handleClick}
      >
        Confirmar Telefono
      </Button>
    </div>
  );
};
