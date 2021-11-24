import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";

import axios from "axios";

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

const token = window.localStorage.getItem("token");

if (token) {
  axios.interceptors.request.use((request) => {
    request.headers.authorization = `Bearer ${token}`;
    return request;
  });
}

class App extends Component {
  render() {
    const testing = window.location.origin;
    console.log(testing);
    return (
      <HashRouter>
        {testing === "https://admin-farmageo.testingdev.ml" ? (
          <div className="leyendatesting">
            <h1
              style={{
                fontSize: "2rem",
                textAlign: "center",
                color: "yellow",
                backgroundColor: "blue",
                fontWeight: "bold",
                letterSpacing: "10px",
              }}
            >
              ENTORNO DE TESTING
            </h1>
          </div>
        ) : null}
        <React.Suspense fallback={loading()}>
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
