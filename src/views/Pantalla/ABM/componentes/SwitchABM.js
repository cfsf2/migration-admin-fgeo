import React, { useEffect, useCallback, useContext } from "react";
import ABMContext from "../context/ABMContext";
import InputText from "./inputs/InputText";
import Fecha from "./inputs/Fecha";
import InputSelect from "./inputs/InputSelect";
import InputCheckbox from "./inputs/InputCheckbox";
import InputRadio from "./inputs/RadioButton";
import InputFile from "../../components/InputFile";
import AutocompletarABM from "./inputs/AutocompletarABM";

const SwitchABM = (props) => {
  const { ABMDispatch, valorFormulario } = useContext(ABMContext);
  console.log(props);
  const { cab } = props;

  const id_a = cab.id_a;

  const setFormularioValor = useCallback(
    (valor) => {
      return ABMDispatch({
        type: "SET_FORMULARIO_VALOR",
        payload: { id_a, valor },
      });
    },
    [ABMDispatch, id_a]
  );

  const Componente = (() => {
    switch (cab.componente) {
      case "input_text":
        return (
          <InputText
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
          />
        );
      case "input_textarea":
        return (
          <InputText
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
            textarea
          />
        );
      case "input_number":
        return (
          <InputText
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
            number
          />
        );
      case "fecha":
        return <Fecha {...props} />;
      case "fecha_simple":
        return <Fecha {...props} />;
      case "input_file":
        return <InputFile {...props} />;
      case "select":
        return (
          <InputSelect
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
          />
        );
      case "checkbox":
        return (
          <InputCheckbox
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
          />
        );
      case "radio":
        return (
          <InputRadio
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
          />
        );
      case "autocompletar":
        return (
          <AutocompletarABM
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
          />
        );
      default:
        return <></>;
    }
  })();

  return <div style={{ gridColumn: cab.grid_span }}>{Componente}</div>;
};

export default SwitchABM;
