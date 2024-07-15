import React, { useEffect } from "react";
import { convertirANumero } from "../../../helper/funciones";
import Label from "./LabelF";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export const SelectInput = ({
  setValor,
  valor,
  cab,
  error,
  setError,
  data,
}) => {
  const {
    id_a,
    label,
    grid_span,
    opcionales_null,
    permite_null,
    margin_bottom_abm,
    width,
    // select_es_maestro,
    // select_maestro_de,
    // select_depende_de,
  } = cab;

  const disabled = (() => {
    if (data[cab.id_a + "_disabled"]) {
      return (
        data[cab.id_a + "_disabled"] === "s" ||
        data[cab.id_a + "_disabled"] === "true"
      );
    }
    if (cab.disabled) {
      return cab.disabled === "s" || cab.disabled === "true";
    }
    return false;
  })();

  // const styles = {
  //   gridColumn: grid_span,
  // };

  const style_input_abm = {
    width: width,
    marginBottom: margin_bottom_abm,
  };

  useEffect(() => {
    if (cab.default && !valor) {
      setValor(cab.default);
    }
  }, [cab.default, setValor]);

  const componerOpciones = () => {
    const value_null =
      data[cab.id_a + "_select_value_null"] ?? cab.select_value_null;
    const label_null =
      data[cab.id_a + "_select_label_null"] ?? cab.select_label_null;
    const opcion_null = {
      value: value_null ? value_null : null,
      label: label_null ? label_null : "Ninguno",
      disabled: disabled,
    };
    if (Array.isArray(cab.opciones)) return cab.opciones;
    if (data[cab.id_a + "_opciones"]) {
      const opciones_de_query_general = JSON.parse(
        data[cab.id_a + "_opciones"]
      );

      if (Array.isArray(opciones_de_query_general)) {
        if (value_null || label_null)
          opciones_de_query_general.push(opcion_null);
        return opciones_de_query_general;
      }
    }
    if (value_null || label_null) {
      return [opcion_null];
    }
    return [];
  };

  const opciones = componerOpciones();

  console.log(cab.default, data[cab.id_a+"_default"])

  return (
    <div style={style_input_abm}>
      <FormControl fullWidth>
        <Label
          label={label}
          opcionales_null={opcionales_null}
          permite_null={permite_null}
        />
        <Select
          style={{
            fontSize: "0.8rem",
          }}
          defaultValue={cab.default}
          variant="standard"
          size="small"
          onChange={(e) => {
            setValor(e.target.value);
            setError((e) => {
              const ne = { ...e };
              ne[id_a] = false;

              return ne;
            });
          }}
          value={convertirANumero(valor)}
          error={error[id_a]}
          disabled={disabled}
        >
          {opciones &&
            opciones.map((opcion) => (
              <MenuItem
                style={{
                  minWidth: "200px",
                  textAlign: "center",
                  fontSize: "0.8rem",
                }}
                value={convertirANumero(opcion.value)}
                key={opcion.value + opcion.label}
              >
                {opcion.default ? <em>{opcion.label}</em> : opcion.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
