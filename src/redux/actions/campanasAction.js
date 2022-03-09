import axios from "axios";
import { wp_api, farmageo_api, wp_api_auth } from "../../config";

export const GET_REQUERIMIENTOS = ({ id_campana, id_usuario, finalizado }) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOADING_REQ",
      payload: true,
    });
    axios
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
      });
  };
};

export const UPDATE_REQUERIMIENTO = (id, finalizado) => {
  console.log(id, finalizado);
  return (dispatch) =>
    axios
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
      })
      .catch((err) => {
        console.log(err);
      });
};

export const GET_CAMPANAS = (idCampana) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/campana/activas", {
        params: {
          idCampana: idCampana,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "CAMPANAS",
          payload: res.data,
        });
      });
  };
};

export const SET_REQUERIMIENTOS_FILTRO = (filtro) => {
  console.log("SET_REQUERIMIENTOS_FILTRO");
  console.log(filtro);
  return (dispatch) => {
    dispatch({ type: "SET_REQUERIMIENTOS_FILTRO", payload: filtro });
  };
};
