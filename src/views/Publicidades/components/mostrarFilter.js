import React from "react";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export const MostrarFilter = (listado, setListado) => {
  const [state, setState] = React.useState("todas");

  React.useEffect(() => {
    if (state === "todas") setListado(() => listado);
    listado.filter((item) => item["habilitado"] === state);
  }, [state]);
  return (
    <Select
      style={{ width: "200px" }}
      defaultValue={"todas"}
      variant="standard"
      onChange={(e) => setState(e.target.value)}
    >
      <MenuItem value={true}>Si</MenuItem>
      <MenuItem value={false}>No</MenuItem>
      <MenuItem value={"todas"}>
        <em>Todas</em>
      </MenuItem>
    </Select>
  );
};
