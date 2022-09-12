import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import GestorCampanas from "./views/gestorCampanas/GestorCampanas";
import { useDispatch, useSelector } from "react-redux";
import { LOADPROFILE } from "./redux/actions/authActions";

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

class App extends Component {
  render() {
    const testing = window.location.origin;
    return (
      <HashRouter>
        {testing !== "https://admin.farmageo.com.ar/" ? (
          <div className="leyendatesting">
            <h1
              style={{
                fontSize: "1rem",
                textAlign: "center",
                color: "black",
                backgroundColor: "lightgray",
                fontWeight: "bold",
                letterSpacing: "10px",
              }}
            >
              ENTORNO MySQL
            </h1>
          </div>
        ) : null}
        <React.Suspense fallback={loading()}>
          <GestorCampanas />
          <Switch>
            <Route
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
            <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
