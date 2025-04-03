import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../AuthContext/AuthContext";

const ProtectedRoute = (props) => {
  const { authenticated } = useContext(AuthContext);
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
