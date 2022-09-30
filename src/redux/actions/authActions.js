import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { wp_api, farmageo_api, wp_api_auth } from "../../config";
import { GET_ALL_PEDIDOS_ADMIN, GET_PEDIDOS } from "./pedidosActions";
import { ALERT } from "./alertActions";
import store from "../store/index";
import { GET_NOVEDADES_FARMACIA } from "./publicidadesActions";
import { GET_USUARIO } from "./userActions";

export const RESET_ERROR = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_ERROR" });
  };
};

export const CHECK_TOKEN = async () => {
  return (dispatch) =>
    axios.post(farmageo_api + "/checkToken").then((res) => {
      console.log(res);
      if (res.status > 300) {
        dispatch(LOGOUT());
      }
      return res;
    });
};

export const TRYREGISTER = (body) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/farmacias/register-try", {
        email: body,
        destinatario: "soporte@farmageo.com.ar",
        version: "2",
      })
      .then((r) => alert(JSON.stringify(r.data)));
  };
};

export const LOGIN = (user, password) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/users/loginwp", {
        username: user,
        password: password,
      })
      .then(function (response) {
        if (response.status == 500) {
          ALERT(
            "Error",
            "Usuario y/o contraseña incorrectos",
            "error",
            "OK"
          ).then(() => {
            store.dispatch(LOGOUT());
            window.location.replace(`${process.env.PUBLIC_URL}/#/login`);
          });
        }
        if (parseInt(response.status) < 300) {
          dispatch({ type: "authenticated", payload: user });
          dispatch({ type: "LOGIN_OK", payload: response.data });
          dispatch({ type: "GET_USER_ROLES" });

          localStorage.setItem("login", JSON.stringify(response.data));
          localStorage.setItem("authenticated", JSON.stringify(true));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("loginId", user);

          // hasta que resuelva lo del token
          localStorage.setItem("user", user);
          localStorage.setItem("pass", password);

          if (response.data.user_rol.includes("admin")) {
            //dispatch(GET_ALL_PEDIDOS_ADMIN(response.data.token));
          } else {
            dispatch(LOADPROFILE(user.toUpperCase(), response.data.token));
          }
        }
      })
      .catch(function (error) {
        ALERT(
          "Error",
          "Usuario y/o contraseña incorrectos",
          "error",
          "OK"
        ).then(() => {
          store.dispatch(LOGOUT());
          window.location.replace(`${process.env.PUBLIC_URL}/#/login`);
        });
        dispatch(LOGOUT());
        dispatch({ type: "LOGIN_ERROR", error: errorParser(error) });
        return window.location.replace(`${process.env.PUBLIC_URL}/#/login`);
      });
  };
};

export const LOADPROFILE = (username, token) => {
  return (dispatch) => {
    return axios
      .get(farmageo_api + "/farmacias/login/" + username?.toUpperCase(), {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (response.data.usuario) {
          dispatch(GET_USUARIO(response.data.usuario));
        }
        dispatch({ type: "LOADPROFILE_OK", payload: response.data });
        if (response.data.farmaciaid) {
          dispatch(GET_PEDIDOS(response.data.farmaciaid));
          dispatch(
            GET_NOVEDADES_FARMACIA(
              response.data._id,
              response.data.instituciones
            )
          );
        }
      })
      .catch(function (error) {
        dispatch({
          type: "LOADPROFILE_ERROR",
          error: errorParser(error),
        });
        console.log("No hay Login");
      });
  };
};

export const LOGOUT = () => {
  return (dispatch) => {
    localStorage.removeItem("login");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loginId");
    localStorage.removeItem("user");
    localStorage.removeItem("pass");
    dispatch({ type: "LOGOUT" });
  };
};

//TODO: AQUI SE DEBERIA CONSULTAR OTRA VEZ A LA API PARA PEDIS LOS ROLES: ARREGLAR ESTO PRONTO
export const GET_USER_ROLES = () => {
  return (dispatch) => {
    dispatch({ type: "GET_USER_ROLES" });
  };
};

export const IS_USER = () => {
  return (dispatch) => {
    dispatch({ type: "ISUSER" });
  };
};

export const GET_SESSION = () => {
  return async (dispatch) => {
    var authenticated = await localStorage.getItem("authenticated");
    var user = await localStorage.getItem("user");
    var pass = await localStorage.getItem("pass");

    if (authenticated) {
      dispatch({
        type: "authenticated",
        payload: user,
      });
      dispatch(LOGIN(user, pass));
    }
  };
};
