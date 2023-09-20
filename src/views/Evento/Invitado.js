import React, { useEffect } from "react";
import "./evento.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export const Invitados = ({
  invitados,
  addInvitado,
  eliminarInvitado,
  confirmoAsistencia,
  setConfirmoAsistencia,
  confirmarAsistencia,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Es Menor</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitados.map((row) => (
              <TableRow
                key={row.documento}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Invitado
                  invitado={row}
                  setConfirmoAsistencia={setConfirmoAsistencia}
                  confirmoAsistencia={confirmoAsistencia}
                  eliminarInvitado={eliminarInvitado}
                  confirmarAsistencia={confirmarAsistencia}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const Invitado = ({
  invitado,
  setConfirmoAsistencia,
  eliminarInvitado,
}) => {
  useEffect(() => {
    if (invitado.titular === "s") {
      setConfirmoAsistencia(invitado.confirmo_asistencia === "s");
    }
  }, [invitado.confirmo_asistencia, invitado.titular, setConfirmoAsistencia]);

  return (
    <>
      <TableCell component="th" scope="row">
        {invitado.nombre}
      </TableCell>
      <TableCell component="th" scope="row">
        {invitado.documento}
      </TableCell>
      <TableCell component="th" scope="row">
        {invitado.menor === 's' ? 'Si' : 'No'}
      </TableCell>
      <TableCell component="th" scope="row">
        <Costo invitado={invitado} />
      </TableCell>
      <TableCell>
        {invitado.titular === "s" ? (
          <></>
        ) : (
          <DeleteIcon
            className="evento_delete"
            onClick={() => eliminarInvitado(invitado.token)}
          />
        )}
      </TableCell>
    </>
  );
};

export const Costo = ({ invitado }) => {
  let costo_display = `$${invitado.costo}`;
  if (invitado.costo === 0) {
    costo_display = "sin cargo";
  }
  if (invitado.bonificada === "s") {
    costo_display = `$${invitado.costo} (50% dto)`;
  }
  return costo_display;
};
