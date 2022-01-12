import React from "react";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export const MostrarFilter = (props) => {
  const { listado, setListado } = props;
  const [state, setState] = React.useState("todas");

  React.useEffect(() => {
    const filteredListado = listado.filter((item) => {
      return item["habilitado"] === state;
    });
    setListado(() => filteredListado);
    if (state === "todas") {
      setListado(() => listado);
    }
  }, [state]);

  return (
    <Select
      style={{ width: "200px" }}
      defaultValue={"todas"}
      variant="standard"
      onChange={(e) => setState(e.target.value)}
    >
      <MenuItem style={{ width: "100%", textAlign: "left" }} value={true}>
        Si
      </MenuItem>
      <MenuItem style={{ width: "100%", textAlign: "left" }} value={false}>
        No
      </MenuItem>
      <MenuItem style={{ width: "100%", textAlign: "left" }} value={"todas"}>
        <em>Todas</em>
      </MenuItem>
    </Select>
  );
};
