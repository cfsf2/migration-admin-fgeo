import React from "react";
import "./evento.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import { Paper } from "@material-ui/core";

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
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuarioInvitado({
      ...usuarioInvitado,
      [name]: value,
    });
  };

  return (
    <form className="formulario_evento" onSubmit={handleSubmit}>
      <ThemeProvider theme={darkTheme}>
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
        <Paper style={{ marginTop: "1rem" }}>
          <Switch
            label="Confirmar Asistencia"
            onChange={confirmarAsistencia}
            checked={confirmoAsistencia}
          />{" "}
          "Confirmar Asistencia"
        </Paper>
      </ThemeProvider>
    </form>
  );
}
