import React, { useEffect, useCallback, useContext } from "react";
import ABMContext from "../context/ABMContext";
import InputText from "./inputs/InputText";
import Fecha from "./inputs/Fecha";
import InputSelect from "./inputs/InputSelect";
import InputCheckbox from "./inputs/InputCheckbox";
import InputRadio from "./inputs/RadioButton";
import InputFile from "../../components/InputFile";
import AutocompletarABM from "./inputs/AutocompletarABM";
import InputPassword from "./inputs/InputPassword";

const SwitchABM = (props) => {
  const { ABMDispatch, valorFormulario } = useContext(ABMContext);

  const { cab, _key } = props;

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
      case "input_number_editable":
        return (
          <InputText
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
            number
          />
        );
      case "password":
        return (
          <InputPassword
            {...props}
            setValor={setFormularioValor}
            valor={valorFormulario[id_a]}
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
  
  return (
    <div key={_key} id={cab.id_a} style={{ gridColumn: cab.grid_span }}>
      {Componente}
    </div>
  );
};

export default SwitchABM;
