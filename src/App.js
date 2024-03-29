import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import GestorCampanas from "./views/gestorCampanas/GestorCampanas";
import { AuthProvider } from "./views/Pages/AuthContext/AuthContext";
import ProtectedRoute from "./views/Pages/Login/ProtectedRoute";

import store from "./redux/store/index";
import { LOGOUT } from "./redux/actions/authActions";
import { ALERT } from "./redux/actions/alertActions";
import axios from "axios";

import Terminos from "./views/Pages/Terminos";

axios.interceptors.request.use((request) => {
  request.headers.authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return request;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    switch (err.response.status) {
      case 409:
        return store.dispatch(
          ALERT(
            "Hubo un Problema con su solicitud",
            err.response.data.error.message,
            "error",
            "OK"
          )
        );
      case 401:
        // alert("Denegado: No tiene permiso para realizar esta accion");
        store.dispatch(
          ALERT(
            "ACCESO DENEGADO",
            err.response.data.error.message,
            "error",
            "OK"
          ).finally(() => {
            // window.location = process.env.PUBLIC_URL;
          })
        );

        break;
      case 440:
        //alert("Su sesion ha expirado, debe loguearse de nuevo");
        store.dispatch(
          ALERT(
            "SESION EXPIRADA",
            "Su sesion ha expirado debe loguearse nuevamente",
            "info",
            "OK"
          ).finally(() => {
            store.dispatch(LOGOUT());
            // window.location.replace(`${process.env.PUBLIC_URL}/#/login`);
          })
        );
        break;
      case 404:
        console.log("404");

        return window.location.replace(`${process.env.PUBLIC_URL}/#/404`);

      case 500:
        return store.dispatch(
          ALERT(
            "Ha Ocurrido un Error",
            "consulte con el administrador",
            "error",
            "Volver a Log In"
          ).finally(() => {
            store.dispatch(LOGOUT());
            window.location.replace(`${process.env.PUBLIC_URL}/#/login`);
          })
        );

      // return window.location.replace(`${process.env.PUBLIC_URL}/#/500`);
      default:
        break;
    }

    return err.response;
  }
);

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Cargando...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));
const Evento = React.lazy(() => import("./views/Evento/Evento"));

function App() {
  const testing = window.location.origin;

  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <GestorCampanas />

        <Switch>
          <Route
            index
            exact
            path="/login"
            name="Entrar al sistema"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/Terminos-y-Condiciones"
            name="Terminos y condiciones"
            render={() => <Terminos />}
          />
          <Route exact path="/Evento" name="Evento" render={() => <Evento />} />
          <AuthProvider>
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <ProtectedRoute
              path="/"
              name="Home"
              Component={DefaultLayout}
              // render={(props) => <DefaultLayout {...props} />}
            />
          </AuthProvider>
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
