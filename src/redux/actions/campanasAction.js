import axios from "axios";
import { wp_api, farmageo_api, wp_api_auth } from "../../config";

export const GET_REQUERIMIENTOS = ({ id_campana, id_usuario, finalizado }) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING_REQ",
      payload: true,
    });
    return axios
      .get(farmageo_api + "/campana/requerimientos", {
        params: {
          id_campana,
          id_usuario,
          finalizado,
        },
      })
      .then((response) => {
        dispatch({
          type: "REQUERIMIENTOS",
          payload: response.data,
        });
        return response;
      });
  };
};

export const UPDATE_REQUERIMIENTO = (id, finalizado) => {
  return (dispatch) => {
    return axios
      .post(farmageo_api + "/campana/requerimiento", {
        id: id,
        finalizado: finalizado,
      })
      .then((res) => {
        alert(res.data);
        dispatch({
          type: "UPDATE_REQUERIMIENTO",
          payload: {
            id: id,
            finalizado: finalizado,
          },
        });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const GET_CAMPANAS = (idCampana) => {
  return (dispatch) => {
    return axios
      .get(farmageo_api + "/campana/activas", {
        params: {
          idCampana: idCampana,
        },
      })
      .then((res) => {
        dispatch({
          type: "CAMPANAS",
          payload: res.data,
        });
        return res;
      });
  };
};

export const SET_REQUERIMIENTOS_FILTRO = (filtro) => {
  return (dispatch) => {
    dispatch({ type: "SET_REQUERIMIENTOS_FILTRO", payload: filtro });
  };
};
