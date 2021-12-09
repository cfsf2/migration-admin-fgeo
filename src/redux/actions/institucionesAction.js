import axios from "axios";
import { farmageo_api } from "../../config";

export const GET_INSTITUCIONES = (limit) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/instituciones", { params: { limit: limit } })
      .then((response) =>
        dispatch({
          type: "GET_INSTITUCIONES",
          payload: response.data,
        })
      )
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SEARCH_INSTITUCIONES = (search, limit) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/instituciones/search", {
        params: { limit: limit, search: search },
      })
      .then((response) =>
        dispatch({
          type: "SEARCH_INSTITUCIONES",
          payload: response.data,
        })
      )
      .catch(function (error) {
        console.log(error);
      });
  };
};
