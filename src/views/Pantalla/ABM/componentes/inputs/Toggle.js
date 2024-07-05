import React, { useState, useContext, useEffect } from "react";
import PantallaContext from "../../../context/PantallaContext";
import Label from "./LabelF";
import Switch from '@material-ui/core/Switch';
import { esMinuscula } from "../../../helper/funciones";

const Toggle = ({
  setValor,
  valor,
  cab,
  error,
  setError,
  data,
  id_elemento,
}) => {
  const { configuraciones_ref } = useContext(PantallaContext);

  const [value, setValue] = useState(valor);
  const [lastValue, setLastvalue] = useState(valor);

  const usarValores = cab.usar_valores?.split(",") ?? [];
  let s = usarValores[0]?.toString().trim() ?? "s";
  let n = usarValores[1]?.toString().trim() ?? "n";

  if (valor && !cab.usar_valores) {
    // habria que reemplazar esto por atributo usar_valores
    s = esMinuscula(valor) ? "s" : "S";
    n = esMinuscula(valor) ? "n" : "N";
  }

  const handleCancelar = () => {
    setValue(valor);
    setLastvalue(valor);
  };

  const handleChange = async (e) => {
    const _valor = e.target.checked ? s : n;
    setValor(_valor);
  };

  useEffect(() => {
    if (configuraciones_ref[cab.id_a] === 1) return;
  }, [configuraciones_ref[cab.id_a]]);

  useEffect(() => {
    if (!valor) {
      setValor(n);
    }
  }, [n, setValor, valor]);

  return (
    <>
      <div
        id={id_elemento}
        className="tarjeta_grid_item_label_item"
        style={{
          justifyContent: "end",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {cab.nombre ? (
          <Label
            label={data[cab.id_a + "_nombre"] ?? cab.nombre}
            opcionales_null={cab.opcionales_null}
            permite_null={cab.permite_null}
          />
        ) : (
          <></>
        )}
        <Switch
          color="primary"
          className="list-toggle"
          checked={
            valor === null
              ? false
              : valor?.toString() === s?.toString()
              ? true
              : false
          }
          onChange={handleChange}
          label={data[cab.id_a + "_label"] ?? cab.label}
          style={{ alignSelf: "flex-end" }}
        />
      </div>
    </>
  );
};

export default Toggle;
