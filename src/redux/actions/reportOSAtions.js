import axios from "axios";
import { LOADPROFILE } from "./authActions";
import { farmageo_api } from "../../config";

export const GET_REPORTE_OOSS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/repooss", {})
      .then(function (response) {
        dispatch({
          type: "GET_REPORTE_OOSS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const NEW_REPORT_OOSS = (file, oossInactivas, alerta) => {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("file", file);
    oossInactivas.forEach((os) => {
      formData.append("oossInactivas", os);
    });
    formData.append("alert", alerta);

    axios
      .post(farmageo_api + "/repooss", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status == "201" || response.status == "200") {
          alert("Se modifico correctamente");
          dispatch({
            type: NEW_REPORT_OOSS,
            payload: response.data,
          });
        } else {
          console.log("Ha ocurrido un error");
          alert("Ha ocurrido un error");
        }
      })
      .catch((error) => {
        if (error.message) {
          console.log(error.message);
          alert("Ha ocurrido un error");
        }
      });
  };
};
