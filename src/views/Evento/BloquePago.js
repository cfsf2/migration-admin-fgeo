import React from "react";
import "./evento.scss";
import Button from "@mui/material/Button";
import { Paper } from "@material-ui/core";

export const BloquePago = ({
  usuarioInvitado,
  setUsuarioInvitado,
  evento,
  total,
  handleConfirmarPago,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuarioInvitado({
      ...usuarioInvitado,
      [name]: value,
    });
  };

  return (
    <Paper style={{ padding: "1rem" }} className="evento_detalles">
      <div>
        Forma de Pago
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <select
            style={{ width: "50%" }}
            value={usuarioInvitado.id_evento_forma_pago}
            name="id_evento_forma_pago"
            onChange={handleChange}
          >
            {evento.formaPago.map((fp) => {
              return <option value={fp.id}>{fp.nombre}</option>;
            })}
            <option value="" disabled>
              Seleccione un Metodo
            </option>
          </select>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleConfirmarPago}
            className="evento_detalles_confirmar_metodo_pago"
          >
            Confirmar Metodo de Pago
          </Button>
        </div>
        <div className="evento_detalles_total">Total a Pagar: ${total}</div>
      </div>
    </Paper>
  );
};
