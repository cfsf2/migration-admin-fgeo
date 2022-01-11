import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { farmageo_api } from "../../config";

export const ADD_PUBLICIDAD = (username, publicidad, instituciones) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/publicidades", {
        username: username,
        tipo: publicidad.tipo,
        fechaalta: publicidad.fechaalta,
        titulo: publicidad.titulo,
        descripcion: publicidad.descripcion,
        link: publicidad.link,
        imagen: publicidad.imagen,
        habilitado: publicidad.habilitado,
        color: publicidad.color,
        instituciones: instituciones,
      })
      .then(function (response) {
        dispatch(GET_PUBLICIDADES());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_PUBLICIDAD = (publicidad, instituciones) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/publicidades?id=" + publicidad._id, {
        username: publicidad.username,
        tipo: publicidad.tipo,
        fechaalta: publicidad.fechaalta,
        titulo: publicidad.titulo,
        descripcion: publicidad.descripcion,
        link: publicidad.link,
        imagen: publicidad.imagen,
        habilitado: publicidad.habilitado,
        color: publicidad.color,
        instituciones: instituciones,
      })
      .then(function (response) {
        dispatch(GET_PUBLICIDADES());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_PUBLICIDADES = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      //
      axios
        .get(farmageo_api + "/publicidades")
        .then(function (response) {
          dispatch({
            type: "GET_PUBLICIDADES",
            payload: response.data,
          });
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }); //
  };
};

export const GET_NOVEDADES_RELACIONES = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(farmageo_api + "/instituciones/novedades/" + id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("this is err");
          console.log(err);
          reject();
        });
    });
  };
};

export const DELETE_PUBLICIDAD = (data) => {
  return (dispatch) => {
    console.log(data._id);
    axios
      .delete(farmageo_api + "/publicidades?id=" + data._id)
      .then(function (response) {
        console.log(response);
        dispatch(GET_PUBLICIDADES());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
