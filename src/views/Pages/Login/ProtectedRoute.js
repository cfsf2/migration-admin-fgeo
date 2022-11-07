import React, { useContext, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../AuthContext/AuthContext";

const ProtectedRoute = (props) => {
  const { check, authenticated } = useContext(AuthContext);
  const { Component } = props;

  return (
    <Route
      path={props.path}
      name={props}
      render={
        authenticated
          ? (props) => <Component {...props} />
          : (location) => (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            )
      }
    />
  );
};

export default ProtectedRoute;
