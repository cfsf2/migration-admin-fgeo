import axios from "axios";
import { wp_api, farmageo_api, wp_api_auth } from "../../config";

export const GET_USUARIO = (userid) => {
  return (dispatch) => {
    axios
      .get(wp_api + "/users/" + userid, {})
      .then(function (response) {
        dispatch({
          type: "GET_PRODUCTO",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_USER = (userid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(farmageo_api + "/users/" + userid, {})
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

export const GET_USUARIOS = (token) => {
  return (dispatch) => {
    axios
      .get(wp_api + "/users", {})
      .then(function (response) {
        dispatch({
          type: "GET_USUARIOS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const DELETE_USUARIO = (user) => {
  // console.log("this is actions deleting " + user.usuario);
  // console.log(user);
  if (window.confirm("Realmente desea eliminar el usuario?")) {
    return (dispatch) => {
      axios({
        method: "delete",
        url: farmageo_api + "/users/",
        headers: { "Content-Type": "application/json" },
        params: { username: user.usuario },
        data: { deleted: true },
      })
        .then((response) => {
          GET_USUARIOS();
          dispatch({
            type: "DELETE_USER",
            payload: null,
          });
          alert("Usuario " + user.usuario + " Eliminado");
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  return (dispatch) => {
    dispatch({
      type: "CANCEL",
    });
  };
};

export const CREATE_USER = (data) => {
  const { first_name, last_name, username, password, roles, farmaciaId } = data;

  return axios({
    method: "post",
    url: farmageo_api + "/users/alta-usuario",
    headers: { "Content-Type": "application/json" },
    data: { first_name, last_name, username, password, roles, farmaciaId },
  })
    .then((res) => {
      GET_USUARIOS();

      return res.data.body;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const UPDATE_USER = (data, userId) => {
  return axios({
    method: "put",
    url: farmageo_api + "/users/",
    headers: { "Content-Type": "application/json" },
    data: { data },
    params: {
      id: userId,
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const UPDATE_PASSWORD = (data, userId) => {
  return axios({
    method: "put",
    url: farmageo_api + "/users/newpassword",
    headers: { "Content-Type": "application/json" },
    data: { data },
    params: {
      id: userId,
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
