import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { wp_api, farmageo_api, wp_api_auth } from "../../config";
import { GET_ALL_PEDIDOS_ADMIN, GET_PEDIDOS } from "./pedidosActions";

export const RESET_ERROR = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_ERROR" });
  };
};

export const TRYREGISTER = (body)=>{
  return dispatch=>{
    axios.post(farmageo_api+"/farmacias/register-try",{
      email:body,
      destinatario:"soporte@farmageo.com.ar",
      version: "2"
    }).then(r=>alert(JSON.stringify(r.data)))
  }
}

export const LOGIN = (user, password) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/users/loginwp", {
        username: user,
        password: password,
      })
      .then(function (response) {
        if (response.data === "") {
          dispatch({
            type: "LOGIN_ERROR",
            error: {
              code: 404,
              title: "Error",
              message: "Usuario o password incorrectos",
            },
          });
        } else {
          /*if (!response.data.user_rol.includes("usuario")) {
            return dispatch({
              type: "LOGIN_ERROR",
              error: {
                code: 503,
                title: "Error",
                message: "Usuario o password incorrectos",
              },
            });
          }*/
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
            dispatch(GET_ALL_PEDIDOS_ADMIN());
          } else {
            dispatch(LOADPROFILE(user.toUpperCase()));
          }
        }
      })
      .catch(function (error) {
        dispatch({ type: "LOGIN_ERROR", error: errorParser(error) });
      });
  };
};

export const LOADPROFILE = (username) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/farmacias/login/" + username.toUpperCase())
      .then(function (response) {
        dispatch({ type: "LOADPROFILE_OK", payload: response.data });
        dispatch(GET_PEDIDOS(response.data.farmaciaid));
      })
      .catch(function (error) {
        dispatch({
          type: "LOADPROFILE_ERROR",
          error: errorParser(error),
        });
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

/*const ckeck_version_app = () => {
  axios
    .get(wp_api_auth + "/version/")
    .then(async function (response) {
      // console.log(response);
      if (response.data.version == 1616) {
        // document.location.reload(true);
        console.log("versión ok");
      } else {
        console.log("no coincide la versión");
        alert(
          "Hay una actualización en la aplicación. Se refrescará el navegador"
        );
        document.location.reload(true);
      }
    })
    .catch(function (error) {
      //document.location.reload(true);
      console.log(error);
      document.location.reload(true);
    });
};
*/
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
