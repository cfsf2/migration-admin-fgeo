import React, { useState, useContext, useEffect } from "react";
import Botonera from "./componentes/Botonera";
import SwitchABM from "./componentes/SwitchABM";
import ABMContext from "./context/ABMContext";

import { Card } from "react-bootstrap";
import "./abm.scss";

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
  } = useContext(ABMContext);

  const [requeridos, setRequeridos] = useState([]);
  const [error, setError] = useState({});

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
  }, [ABMDispatch, cabeceras, datos, id, loading]);

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
      return;
    }
  };

  const handleCancelar = () => {
    ABMDispatch({
      type: "LIMPIAR_FORMULARIO",
      payload: id ? formularioInicial : {},
    });
  };

  return (
    <Card className="abm">
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
      />
    </Card>
  );
};

export default ABM;
