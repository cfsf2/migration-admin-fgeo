import React, { useState, useEffect } from "react";
import "./evento.scss";
import { v4 } from "uuid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "@mui/material";
export const AddInvitado = ({ addInvitado }) => {
  const [invitado, setInvitado] = useState({ token: v4() });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvitado({
      ...invitado,
      [name]: value,
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
      setInvitado({ nombre: "", documento: "", token: v4() });
      return setError(false);
    }
    return setError(true);
  };
  return (
    <form>
      <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Agregar Invitado</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>
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
              />
            </TableCell>
            <TableCell>
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
              />
            </TableCell>
            <TableCell>
              <AddCircleIcon
                className="evento_aniadir"
                onClick={handleOnClick}
              />
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};
