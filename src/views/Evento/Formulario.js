import React from "react";
import "./evento.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import { Paper, Select } from "@material-ui/core";

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
        {titular.id && evento ? (
          <>
            <Paper
              style={{ marginTop: "1rem", padding: "1rem" }}
              className="evento_detalles"
            >
              <div>
                Confirmar Asistencia
                <Switch
                  label="Confirmar Asistencia"
                  onChange={confirmarAsistencia}
                  checked={confirmoAsistencia}
                />{" "}
              </div>
              <div>
                Metodo de Pago
                <Select>
                  {evento.formaPago?.map((fp) => {
                    return <option value={fp.id}>{fp.nombre}</option>;
                  })}
                </Select>
              </div>
              <div>Total a Pagar: {total}</div>
            </Paper>
          </>
        ) : (
          <></>
        )}
      </div>
    </ThemeProvider>
  );
}
