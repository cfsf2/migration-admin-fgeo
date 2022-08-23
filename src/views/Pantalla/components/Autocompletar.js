import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FuncionesContext from "../context/FuncionesContext";

const Autocompletar = ({ cab, data, context, indiceData }) => {
  const { superSubmit } = useContext(FuncionesContext);

  const { Dispatch } = useContext(context);

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");

  const handleCancelar = () => {};

  const handleChangeValue = async (newValue) => {
    const valor = newValue.value; //newValue { value, label }
    setValue(valor);
    const update_id = data[cab.update_id_alias];
    const { id_a } = cab;

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        Dispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            key: cab.update_id_alias,
            indiceData: indiceData,
            value: result.data.id,
          },
        });
      })
      .catch((err) => {
        console.log("Cancelado ", err);
      });
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
