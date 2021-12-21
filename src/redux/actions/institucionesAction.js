import axios from "axios";
import { farmageo_api } from "../../config";

export const GET_INSTITUCIONES = (limit) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    axios
      .get(farmageo_api + "/instituciones", { params: { limit: limit } })
      .then((response) => {
        dispatch({
          type: "GET_INSTITUCIONES",
          payload: response.data,
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });

        return new Promise((resolve, reject) => {
          resolve(response.data);
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      });
  };
};

export const SEARCH_INSTITUCIONES = (
  search,
  limit,
  habilitada,
  id_institucion_madre
) => {
  return (dispatch) => {
    return new Promise((resolve, rej) => {
      axios
        .get(farmageo_api + "/instituciones/search", {
          params: {
            limit: limit,
            search: search,
            habilitada: habilitada,
            id_institucion_madre: id_institucion_madre,
          },
        })
        .then((response) => {
          dispatch({
            type: "SEARCH_INSTITUCIONES",
            payload: response.data,
          });
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
};

export const CREAR_INSTITUCION = (data) => {
  const { nombre, id_institucion_madre, habilitada, limit } = data;
  return (dispatch) => {
    return new Promise((resolve, rej) => {
      axios
        .post(farmageo_api + "/instituciones", {
          nombre,
          id_institucion_madre,
          habilitada,
        })
        .then((res) => {
          alert(res.data);
          dispatch(GET_INSTITUCIONES(limit));
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
};

export const ACTUALIZAR_INSTITUCION = (data) => {
  const { nombre, id_institucion_madre, habilitada, id, limit } = data;
  return (dispatch) => {
    return new Promise((resolve, rej) => {
      axios
        .put(farmageo_api + "/instituciones", {
          data: { nombre, id_institucion_madre, habilitada },
          id: id,
        })
        .then((res) => {
          alert(res.data);
          dispatch(GET_INSTITUCIONES(limit));
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
};
