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

export const FINALIZAR_REQUERIMIENTO = ({
  id,
  value,
  campo,
  setDatos,
  filter,
}) => {
  return (dispatch) => {
    dispatch(
      ALERT("Esta seguro?", "", "warning", "Continuar", 50000, "Cancelar").then(
        async ({ isConfirmed }) => {
          if (isConfirmed) {
            try {
              const res = await axios.put(
                farmageo_api + "/campana/finalizarrequerimiento",
                {
                  id: id,
                  [campo]: value,
                }
              );
              dispatch(ALERT("Exito", res.data, "success", "OK"));

              setDatos((state) => {
                let newState = state.map((r) =>
                  r._id === id ? { ...r, [campo]: value } : r
                );
                const filtrosArray = Object.entries(filter).filter(
                  (e) => !(e[1] === "" || e[1] === "todas")
                );

                const filtrado = newState.filter((s) => {
                  if (filtrosArray.length === 0) {
                    return true;
                  }
                  return filtrosArray.some((f) => {
                    return s[f[0]] === f[1];
                  });
                });

                const aLaBasuraSiSeFiltra = newState
                  .filter((s) => {
                    if (filtrosArray.length === 0) {
                      return true;
                    }
                    return filtrosArray.some((f) => {
                      return s[f[0]] !== f[1];
                    });
                  })
                  .map((s) => s._id);

                aLaBasuraSiSeFiltra.forEach((b) => {
                  document
                    .getElementById(b)
                    .classList.add("listado-desaparecer");
                });

                return filtrado;
              });

              dispatch({
                type: "FINALIZAR_REQUERIMIENTO",
                payload: {
                  id: id,
                  finalizado: value,
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
