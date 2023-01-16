import React, { useState, useContext, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@material-ui/styles";

import Botonera from "../Botonera";
import SwitchFiltros from "./SwitchFiltros";
import ListadoContext from "../context/ListadoContext";
import "./filtros.scss";
import FuncionesContext from "../../context/FuncionesContext";

const useStyle = makeStyles({
  bloqueAccordion: {
    "& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root": {
      width: "100%",
    },
    "& .MuiAccordionSummary-root ": {
      padding: "0 16px",
    },
    "& .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "30px",
      height: "35px",
      paddingTop: "15px",
      paddingBottom: "6px",
    },
  },
});

const Filtros = () => {
  const {
    filtros,
    setFilter: aplicarFiltros,
    filtroActivo,
    loading,
    opcionesListado,
    listadoBotones,
    ListadoDispatch,
    filtrosUsuarioAlCargarPagina,
  } = useContext(ListadoContext);

  const { insertar, refrescarConfiguracion } = useContext(FuncionesContext);

  const [filtrosAAplicar, setFiltrosAAplicar] = useState(filtroActivo);
  const [expanded, setExpanded] = useState(false);
  const [requeridos, setRequeridos] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    filtros
      .filter((f) => f.componente !== "hidden")
      .forEach((f) => {
        if (f.permite_null === "n") {
          setRequeridos((s) => {
            const ns = s.concat(f.id_a);
            return ns;
          });
        }

        setError((s) => {
          return { ...s, [f.id_a]: false };
        });
      });
  }, []);

  useEffect(() => {
    setFiltrosAAplicar(() => filtroActivo);
    // console.log("filtros activos en filtros", filtroActivo) // ACA HAY UN ERROR DE LOGICA REACT Radio Button Loco viene por aca?
  }, [filtroActivo]);

  const validar = () => {
    let filtrosValidados = [];

    let opcionales = filtros
      .filter((f) => f.opcionales_null === "s")
      .map((f) => f.id_a);

    if (requeridos.length > 0) {
      requeridos.forEach((r) => {
        const filtroAValidar = filtros.filter((f) => f.id_a === r).pop();

        if (!filtrosAAplicar[r] || filtrosAAplicar[r] === null) {
          filtrosValidados[r] = true;
          return;
        }
        if (
          typeof filtrosAAplicar[r] === "string" &&
          filtrosAAplicar[r].trim() === ""
        ) {
          filtrosValidados[r] = true;
          return;
        }
        if (
          filtroAValidar.componente === "fecha" &&
          filtrosAAplicar[r].filter((f) => f).length !== 2
        ) {
          filtrosValidados[r] = true;
          return;
        }
        filtrosValidados[r] = false;
      });
    }

    const filtrosConValoresValidos = Object.keys(filtrosValidados).filter(
      (fv) => filtrosValidados[fv] === false
    );
    if (filtrosConValoresValidos.some((fcvv) => opcionales.includes(fcvv))) {
      Object.keys(filtrosValidados).forEach((k) => {
        if (opcionales.includes(k)) return (filtrosValidados[k] = false);
        return;
      });
    }

    setError(() => filtrosValidados);
    return (
      Object.keys(filtrosValidados).filter((f) => filtrosValidados[f])
        .length === 0
    );
  };

  const handleSubmit =async () => {
    if (loading) return;

    if (validar()) {
      if (opcionesListado.configuracionDeUsuario?.guardar_filtros === "s") {
        const SISTEMA_GUARDAR_FILTROS = "SISTEMA_GUARDAR_FILTROS";
        if (!opcionesListado.configuracionesDeListado) return;

        const { datos, cabeceras } =
          opcionesListado.configuracionesDeListado[0].configuraciones.find(
            (c) => c.opciones.tipo.id === 6
          );

       await insertar({
          valor: filtrosAAplicar,
          id_a: SISTEMA_GUARDAR_FILTROS,
          insert_ids: (() => {
            return datos[0][
              cabeceras.find((cab) => cab.id_a === SISTEMA_GUARDAR_FILTROS)
                .insert_ids_alias
            ];
          })(),
        });
      }
      setExpanded((s) => false);
      aplicarFiltros({ filtrosAAplicar, quienLlama: "Boton Submit Filtro" });

      return;
    }
  };

  const handleCancelar = () => {
    ListadoDispatch({
      type: "SET_FILTRO_ACTIVO",
      payload: {
        filtros: filtrosUsuarioAlCargarPagina,
        funcion: `Boton Cancelar`,
      },
    });

    return refrescarConfiguracion({
      cab: { refrescarConfiguracion: opcionesListado.id_a },
    });
  };

  const hayObligatorios =
    filtros.filter((f) => f.permite_null === "n").length > 0;

  const filtrosVisibles = filtros.filter(
    (f) => f.componente !== "hidden"
  ).length;

  const classes = useStyle();

  return (
    <div className="container_filtros">
      {filtrosVisibles > 0 ? (
        <Paper elevation="4" style={{ marginBottom: "1em" }}>
          {/* expanded true */}
          <Accordion
            defaultExpanded={false}
            expanded={expanded}
            onChange={() => setExpanded((s) => !s)}
            className={classes.bloqueAccordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel1bh-header"
            >
              <Typography>Filtros...</Typography>
            </AccordionSummary>
            <div className="filtro_grid">
              <div className="filtro_grid_inputs_grid">
                {filtros
                  ?.sort((a, b) => a.orden - b.orden)
                  .map((f) => 
                    {
                      return <SwitchFiltros
                      {...f}
                      key={f.id_a}
                      filtrosAAplicar={filtrosAAplicar}
                      setFiltrosAAplicar={setFiltrosAAplicar}
                      requeridos={requeridos}
                      setRequeridos={setRequeridos}
                      error={error}
                      setError={setError}
                    />}
                  )}
              </div>
            </div>
            {hayObligatorios ? (
              <div style={{ padding: "0.8rem", display: "flex" }}>
                <span style={{ color: "red" }}>*</span>{" "}
                <div style={{ marginRight: "0.8rem" }}>Campo requerido</div>
                <span style={{ color: "red" }}>**</span> Campo requerido
                opcional
              </div>
            ) : (
              <></>
            )}
          </Accordion>
        </Paper>
      ) : (
        <></>
      )}
      <Botonera
        handleSubmit={handleSubmit}
        handleCancelar={handleCancelar}
        loading={loading}
        buscar={filtrosVisibles > 0}
        cancelar={filtrosVisibles > 0}
        acciones={listadoBotones}
      />
    </div>
  );
};

export default Filtros;
