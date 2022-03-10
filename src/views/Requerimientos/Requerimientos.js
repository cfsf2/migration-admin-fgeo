import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { connect } from "react-redux";

import {
  GET_REQUERIMIENTOS,
  UPDATE_REQUERIMIENTO,
  GET_CAMPANAS,
  SET_REQUERIMIENTOS_FILTRO,
} from "../../redux/actions/campanasAction";

import ConfigListado from "./components/ConfigListado";

export const Requerimientos = (props) => {
  const {
    loading_req,
    requerimientos_filtro: filter,
    requerimientos: datos,
  } = props.campanasReducer;

  const cabeceras = [
    { nombre: "campana_nombre", tipo: "div" },
    { nombre: "usuario_nombre", tipo: "div" },
    { nombre: "celular", tipo: "div" },
    { nombre: "codigo_promo", tipo: "div" },
    { nombre: "fecha_creacion", tipo: "fecha" },
    {
      nombre: "finalizado",
      tipo: "select",
      opciones: [
        { nombre: "SI", value: "s" },
        { nombre: "NO", value: "n" },
      ],
      onChange: props.UPDATE_REQUERIMIENTO,
    },
  ];

  const filtros = [
    {
      nombre: "Finalizado",
      campo: "finalizado",
      opciones: [
        { nombre: "SI", value: "s" },
        { nombre: "NO", value: "n" },
      ],
    },
    {
      nombre: "Campaña",
      campo: "id_campana",
      opciones: props.campanasReducer.campanas.map((c) => {
        return {
          nombre: c.nombre,
          value: c._id,
        };
      }),
    },
  ];

  useEffect(() => {
    props.GET_CAMPANAS();
  }, []);

  useEffect(() => {
    props.GET_REQUERIMIENTOS(filter);
  }, [filter.finalizado, filter.id_campana]);

  return (
    <>
      <ConfigListado
        datos={datos}
        loading={loading_req}
        titulo={"Requerimientos"}
        cabeceras={cabeceras}
        filter={filter}
        setFilter={useCallback(props.SET_REQUERIMIENTOS_FILTRO, [])}
        filtros={filtros}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    campanasReducer: state.campanasReducer,
  };
};
const mapDispatchToProps = {
  GET_REQUERIMIENTOS,
  UPDATE_REQUERIMIENTO,
  GET_CAMPANAS,
  SET_REQUERIMIENTOS_FILTRO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requerimientos);
