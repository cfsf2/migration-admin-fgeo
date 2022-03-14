import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router";

import {
  GET_REQUERIMIENTOS,
  FINALIZAR_REQUERIMIENTO,
  GET_CAMPANAS,
  SET_REQUERIMIENTOS_FILTRO,
} from "../../redux/actions/campanasAction";

import ConfigListado from "./components/ConfigListado";

export const Requerimientos = (props) => {
  const { loading_req } = props.campanasReducer;

  const location = useLocation();
  const history = useHistory();
  const [datos, setDatos] = useState([]);
  const [filter, setFilter] = useState([]);

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
      onChange: props.FINALIZAR_REQUERIMIENTO,
    },
    {
      nombre: "Enviar WS",
      tipo: "button",
      imagen: "https://img.icons8.com/office/344/whatsapp--v1.png",
      onClick: "enviarWS",
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
    // {
    //   nombre: "usuario",
    //   campo: "id_usuario",
    //   opciones: props.campanasReducer.requerimientos.map((r) => {
    //     return { nombre: r.usuario_nombre, value: r.usuario_id };
    //   }),
    // },
  ];

  useEffect(() => {
    props.GET_CAMPANAS();
  }, []);

  const deps = filtros.map((f) => filter[f.campo]);

  useEffect(() => {
    props.GET_REQUERIMIENTOS(filter).then((res) => setDatos(res.data));
  }, deps);

  useEffect(() => {
    const params = new URLSearchParams(window.location.href);

    let queryfiltros = {};
    filtros.forEach(
      (f) =>
        (queryfiltros[f.campo] = params.get(f.campo)
          ? params.get(f.campo)
          : "todas")
    );

    setFilter(queryfiltros);
  }, [location.search]);

  const setQueryFilter = (data) => {
    const keys = Object.keys(data);
    let query = "?";
    keys.forEach((k) => {
      query = query.concat(`&${k}=${data[k]}`);
    });
    history.push({ pathname: location.pathname, search: query });
  };

  return (
    <>
      <ConfigListado
        datos={datos}
        setDatos={setDatos}
        loading={loading_req}
        titulo={"Requerimientos"}
        cabeceras={cabeceras}
        filter={filter}
        setFilter={setQueryFilter} //props.SET_REQUERIMIENTOS_FILTRO}
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
  FINALIZAR_REQUERIMIENTO,
  GET_CAMPANAS,
  SET_REQUERIMIENTOS_FILTRO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requerimientos);
