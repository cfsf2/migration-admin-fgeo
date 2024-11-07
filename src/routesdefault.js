import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Pantalla = React.lazy(() => import("./views/Pantalla/Pantalla"));

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Inicio",
    component: Dashboard,
    permiso: "inicio",
  },
  {
    path: "/Pantalla/:pantalla",
    exact: true,
    name: "Pantalla",
    component: Pantalla,
    permiso: "inicio",
  },
  {
    path: "/Listado/:pantalla",
    exact: true,
    name: "Listado",
    component: Pantalla,
    permiso: "inicio",
  },
  {
    path: "/Vista/:pantalla",
    exact: true,
    name: "Vista",
    component: Pantalla,
    permiso: "inicio",
  },
  {
    path: "/Configuracion/:pantalla",
    exact: true,
    name: "Configuracion",
    component: Pantalla,
    permiso: "inicio",
  },
];

export default routes;
