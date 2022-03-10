import axios from "axios";
import { wp_api, farmageo_api, wp_api_auth } from "../../config";

import { ALERT } from "./alertActions";

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
    dispatch(
      ALERT("Esta seguro?", "", "warning", "Continuar", 50000, "Cancelar").then(
        async ({ isConfirmed }) => {
          if (isConfirmed) {
            try {
              const res = await axios.post(
                farmageo_api + "/campana/requerimiento",
                {
                  id: id,
                  finalizado: finalizado,
                }
              );
              console.log(res.data);
              dispatch(ALERT("Exito", res.data, "success", "OK"));
              dispatch({
                type: "UPDATE_REQUERIMIENTO",
                payload: {
                  id: id,
                  finalizado: finalizado,
                },
              });
              return res;
            } catch (err) {
              dispatch(
                ALERT("Ha Ocurrido un error", err, "danger", "Oh... :(", 60000)
              );
              console.log(err);
            }
          } else {
            return;
          }
        }
      )
    );
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
