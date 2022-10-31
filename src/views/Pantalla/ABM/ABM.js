import React, { useState, useContext, useEffect } from "react";
import Botonera from "./componentes/Botonera";
import SwitchABM from "./componentes/SwitchABM";
import ABMContext from "./context/ABMContext";

import { useLocation } from "react-router";

import { Card } from "react-bootstrap";
import "./abm.scss";

const hashCode = function (string) {
  var hash = 0,
    i,
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const getUrlParamsToObject = (laLocation) => {
  const urlParams = {};

  const { search } = laLocation();
  const params = new URLSearchParams(search);

  const keys = params.keys();

  for (const key of keys) {
    urlParams[key] = params.get(key);
  }

  return { urlParams, params, keys, ui: hashCode(urlParams.toString()) };
};

const ABM = () => {
  const {
    datos,
    cabeceras,
    ABMDispatch,
    valorFormulario,
    formularioInicial,
    loading,
    guardarAPI,
    id,
    opciones,
    Dispatch,
  } = useContext(ABMContext);

  const [requeridos, setRequeridos] = useState([]);
  const [error, setError] = useState({});

  const { urlParams: parametros, ui } = getUrlParamsToObject(useLocation);

  useEffect(() => {
    cabeceras
      .filter((c) => c.componente !== "hidden")
      .forEach((c) => {
        if (c.permite_null === "n") {
          setRequeridos((s) => {
            const ns = s.concat(c.id_a);

            return ns;
          });
        }

        setError((s) => {
          return { ...s, [c.id_a]: false };
        });
      });

    const parametros_keys = Object.keys(parametros);
    parametros_keys.forEach((k) => {
      return Dispatch({
        type: "SET_FORMULARIO_VALOR",
        payload: {
          id_a: k,
          valor: parametros[k],
        },
      });
    });
  }, [ABMDispatch, Dispatch, cabeceras, datos, id, loading, ui]);

  const validar = () => {
    let validados = {};

    if (requeridos.length > 0) {
      requeridos.forEach((r) => {
        const campoAValidar = cabeceras.filter((f) => f.id_a === r).pop();

        if (!valorFormulario[r] || valorFormulario[r] === null) {
          validados[r] = true;
          return;
        }
        if (
          typeof valorFormulario[r] === "string" &&
          valorFormulario[r].trim() === ""
        ) {
          validados[r] = true;
          return;
        }
        if (
          campoAValidar.componente === "fecha" &&
          valorFormulario[r].filter((f) => f).length !== 2
        ) {
          validados[r] = true;
          return;
        }
        validados[r] = false;
      });
    }

    setError(() => validados);

    return Object.keys(validados).filter((f) => validados[f]).length === 0;
  };

  const handleSubmit = () => {
    if (loading) return;

    if (validar()) {
      guardarAPI({
        params: valorFormulario,
        funcion: "ABM handleSubmit",
        cab: opciones,
      });
      if (opciones.limpiar_formulario === "s") return handleCancelar();

      return;
    }
  };

  const handleCancelar = () => {
    ABMDispatch({
      type: "LIMPIAR_FORMULARIO",
      payload: id ? formularioInicial : {},
    });
  };

  const styles = {
    gridColumn: opciones?.grid_span ?? "1 / -1",
    border: "none",
    marginBottom: 0,
  };

  const gridTemplatecolumns = () => {
    if (datos.length === 1) return "repeat(12, 1fr)";

    return "repeat(auto-fill, minmax(340px, 1fr)";
  };

  const gridcolumns = () => {
    if (datos.length === 1) return "span 12";
    return undefined;
  };
  return (
    <Card id={opciones?.id_a} className="abm">
      <Card className="abm_campos" style={{ display: "grid" }}>
        {datos.length === 0
          ? cabeceras.map((cab, i) => (
              <div key={JSON.stringify(cab)} className="abm_campos_inputs_grid">
                {" "}
                <SwitchABM
                  data={{}}
                  cab={cab}
                  error={error}
                  setError={setError}
                  key={cab.id_a + i}
                />
              </div>
            ))
          : datos.map((dato, indiceData) => (
              <div
                key={JSON.stringify(dato)}
                className="abm_campos_inputs_grid"
              >
                {cabeceras
                  .sort((a, b) => a.orden - b.orden)
                  .map((cab, i) => (
                    <SwitchABM
                      key={cab.id_a + i}
                      indiceData={indiceData}
                      data={dato}
                      cab={cab}
                      error={error}
                      setError={setError}
                    />
                  ))}
              </div>
            ))}
      </Card>
      <Botonera
        className="abm_botonera"
        handleCancelar={handleCancelar}
        handleSubmit={handleSubmit}
        id={id}
        loading={loading}
        opciones={opciones}
      />
    </Card>
  );
};

export default ABM;
