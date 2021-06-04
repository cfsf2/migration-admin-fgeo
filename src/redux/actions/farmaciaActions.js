import axios from "axios";
import { wp_api, farmageo_api } from "../../config";
import { useHistory } from "react-router-dom";
import { LOADPROFILE } from "./authActions";

export const GET_FARMACIA = (username) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/farmacias/" + username, {})
      .then(function (response) {
        dispatch({
          type: "GET_FARMACIA",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_FARMACIAS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/", {})
      .then(function (response) {
        dispatch({
          type: "GET_FARMACIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_FARMACIA = (farmaciaProfile) => {
  return (dispatch) => {
    //console.log(farmaciaProfile);
    axios
      .put(
        farmageo_api + "/farmacias/?username=" + farmaciaProfile.usuario,
        farmaciaProfile
      )
      .then(function (response) {
        if (response.status === 201) {
          /* dispatch({ 
          type: 'LOADPROFILE_OK', 
          payload: farmaciaProfile 
        })*/
          dispatch(LOADPROFILE(farmaciaProfile.usuario));
          alert("Datos actualizados correctamente");
        } else {
          alert("ha ocurrido un error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
