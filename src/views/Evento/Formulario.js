import React from "react";
import "./evento.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import { Paper } from "@material-ui/core";

import { AddInvitado } from "./AddInvitado";
import { Telefono } from "./Telefono";
import { Titular } from "./Titular";

const darkTheme = createTheme({
  palette: {
    type: "dark", // Habilita el modo oscuro
  },
});

export function Formulario({
  usuarioInvitado,
  setUsuarioInvitado,
  confirmoTelefono,
  setConfirmoTelefono,
  handleSubmit,
  confirmarAsistencia,
  confirmoAsistencia,
  titular,
  evento,
  invitados,
  addInvitado,
  setTitular,
  confirmarTelefono,
  error,
  setError,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuarioInvitado({
      ...usuarioInvitado,
      [name]: value,
    });
    if (name === "cuit" && value.toString().length >= 7) {
      setError(false);
    }
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
              <Titular titular={titular} />
              <Telefono
                confirmoTelefono={confirmoTelefono}
                setConfirmoTelefono={setConfirmoTelefono}
                confirmarTelefono={confirmarTelefono}
                usuarioInvitado={usuarioInvitado}
                setUsuarioInvitado={setUsuarioInvitado}
                titular={titular}
                setTitular={setTitular}
              />
            </Paper>

            {confirmoTelefono && (
              <Paper
                style={{ marginTop: "1rem", padding: "1rem" }}
                className="evento_detalles"
              >
                <div
                  className="evento_container_confirmar_asistencia"
                  onClick={(e) => {
                    confirmarAsistencia({
                      target: { checked: !confirmoAsistencia },
                    });
                  }}
                >
                  Confirmar Asistencia
                  <Switch
                    size="small"
                    label="Confirmar Asistencia"
                    onChange={confirmarAsistencia}
                    onClick={(e) => {
                      confirmarAsistencia({
                        target: { checked: !confirmoAsistencia },
                      });
                    }}
                    checked={confirmoAsistencia}
                  />{" "}
                </div>
                <div style={{ display: confirmoAsistencia ? "none" : "block" }}>
                  Aun no confirmaste tu asistencia!
                </div>
              </Paper>
            )}

            {titular.titular === "s" &&
            confirmoTelefono &&
            confirmoAsistencia ? (
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
                    label="CUIT o Documento"
                    variant="outlined"
                    required
                    size="small"
                    value={usuarioInvitado.cuit}
                    onChange={handleChange}
                    name="cuit"
                    helperText="Ingrese al menos 7 numeros"
                    error={error}
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
