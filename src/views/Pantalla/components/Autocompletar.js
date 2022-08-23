import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FuncionesContext from "../context/FuncionesContext";

const Autocompletar = ({ cab, data, context }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { Dispatch } = useContext(context);

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");

  const handleChangeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => handleChangeValue(newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        sx={{ width: 400 }}
        options={cab.opciones}
        renderInput={(params) => (
          <TextField {...params} label={cab.select_label_null} />
        )}
      />
    </>
  );
};

export default Autocompletar;
