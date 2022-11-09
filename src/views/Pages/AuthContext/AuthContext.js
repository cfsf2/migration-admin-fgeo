import Axios from "axios";
import React, { createContext, useEffect, useState, useMemo } from "react";
import { farmageo_api } from "../../../config";

import { Redirect, Route } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const [authenticated, setAuthenticated] = useLocalStorage(
    "authenticated",
    false
  );

  const login = async (data) => {
    setUser(data);
    return <Redirect to="/dashboard" />;
  };

  const logout = () => {
    setUser(null);
    return <Redirect to="/login" />;
  };

  const check = async () => {
    return await Axios.post(farmageo_api + "/checkToken").then(async (res) => {
      await setAuthenticated(res.data.authenticated);
      if (!res.data.authenticated) {
        window.location.replace(`${process.env.PUBLIC_URL}/#/login`);
      }
      return res.data.authenticated;
    });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      check,
      authenticated,
    }),
    [user, authenticated]
  );

  useEffect(() => {
    Axios.post(farmageo_api + "/checkToken").then(async (res) => {
      await setAuthenticated(res.data.authenticated);
    });
  }, [window.location.href]);

  return (
    <AuthContext.Provider value={value}>
      {authenticated ? (
        children
      ) : (
        <Route
          render={({ location }) => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )}
        />
      )}
    </AuthContext.Provider>
  );
};

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      //console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      //console.log(error);
    }
  };
  return [storedValue, setValue];
}
