import axios from "axios";
import { farmageo_api } from "../../config";

export const GET_DEBITOS = (periodo,id) => {
  return (dispatch) => {
    axios.get(farmageo_api + "/debitos/"+periodo+"/"+id,)
      .then(function (response) {
        dispatch({ type: 'GET_DEBITOS', payload: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
