import React from "react";
import "./evento.scss";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";

import Swal from "sweetalert2";

export const BloquePago = ({
  usuarioInvitado,
  setUsuarioInvitado,
  evento,
  total,
  cleanState,
  handleConfirmarPago,
}) => {
  const history = useHistory();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuarioInvitado({
      ...usuarioInvitado,
      [name]: value,
    });

    handleConfirmarPago(value);
  };

  const handleFinalizar = () => {
    if (
      usuarioInvitado.id_evento_forma_pago &&
      usuarioInvitado.id_evento_forma_pago !== ""
    ) {
      Swal.fire({
        title: "Debe confirmar una forma de pago!",
        icon: "warning",
        timer: 3000,
      });
    }
    if (usuarioInvitado.id_evento_forma_pago > 0) {
      Swal.fire({
        title:
          "Sus datos han sido confirmados. Nos comunicaremos con usted a la brevedad. Gracias!",
        icon: "success",
        timer: 3000,
      }).finally(() => {
        history.push("/evento");
        cleanState();
      });
    }
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
              Seleccione una forma de pago
            </option>
          </select>
          {/* <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleConfirmarPago}
            className="evento_detalles_confirmar_metodo_pago"
          >
            Confirmar Metodo de Pago
          </Button> */}
          <div className="evento_detalles_total">Total a Pagar: ${total}</div>
        </div>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleFinalizar}
          className="evento_finalizar"
        >
          Finalizar
        </Button>
      </div>
    </Paper>
  );
};
