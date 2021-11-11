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
  console.log("this is actions deleting " + user.usuario);
  console.log(user);
  window.confirm();
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
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const CREATE_USER = (data) => {
  console.log("creating user" + data.username);
  return (dispatch) => {
    axios.post(farmageo_api + "/alta-usuario", {
      username: data.username,
      roles: ["farmacia", "admin"],
      password: data.password,
    });
  };
};
