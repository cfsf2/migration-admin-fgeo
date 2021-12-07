import axios from "axios";
import { farmageo_api } from "../../config";

export const GET_INSTITUCIONES = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/instituciones")
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
