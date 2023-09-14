import React from "react";
import "./evento.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import { Paper } from "@material-ui/core";

import { AddInvitado } from "./AddInvitado";

const darkTheme = createTheme({
  palette: {
    type: "dark", // Habilita el modo oscuro
  },
});

export function Formulario({
  usuarioInvitado,
  setUsuarioInvitado,
  handleSubmit,
  confirmarAsistencia,
  confirmoAsistencia,
  titular,
  evento,
  total,
  invitados,
  addInvitado,
  handleConfirmarPago,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuarioInvitado({
      ...usuarioInvitado,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="formulario_evento">
        {titular.id && evento ? (
          <>
            <Paper
              style={{ marginTop: "1rem", padding: "1rem" }}
              className="evento_detalles"
            >
              <div>
                Confirmar Asistencia
                <Switch
                  size="small"
                  label="Confirmar Asistencia"
                  onChange={confirmarAsistencia}
                  checked={confirmoAsistencia}
                />{" "}
              </div>
              <div>Total a Pagar: ${total}</div>
              <div>
                Forma de Pago
                <div>
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
                    style={{
                      marginLeft: "0.2rem",
                      width: "calc(50% - 0.4rem)",
                    }}
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={handleConfirmarPago}
                  >
                    Confirmar Metodo de Pago
                  </Button>
                </div>
              </div>
            </Paper>
            {confirmoAsistencia ? (
              <AddInvitado invitados={invitados} addInvitado={addInvitado} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: "1rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="CUIT"
                    variant="outlined"
                    required
                    size="small"
                    value={usuarioInvitado.cuit}
                    onChange={handleChange}
                    name="cuit"
                    // Aquí puedes agregar más propiedades según tus necesidades
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Matrícula"
                    variant="outlined"
                    className="evento_textfield"
                    required
                    size="small"
                    name="matricula"
                    onChange={handleChange}
                    value={usuarioInvitado.matricula}
                    // Aquí puedes agregar más propiedades según tus necesidades
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      </div>
    </ThemeProvider>
  );
}
