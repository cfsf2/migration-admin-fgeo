import React from "react";
import ReporteOOSSAdmin from "./views/ReporteOOSSAdmin/ReporteOOSSAdmin";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
const Productos = React.lazy(() => import("./views/Productos/Productos"));
const Papelera = React.lazy(() =>
  import("./views/Productos/PapeleraProductos")
);
const Promociones = React.lazy(() => import("./views/Promociones/Promociones"));
const Pedidos = React.lazy(() => import("./views/Pedidos/Pedidos"));
const Perfil = React.lazy(() => import("./views/Perfil/Perfil"));
const Mediospagos = React.lazy(() => import("./views/Mediospagos/Mediospagos"));
const Servicios = React.lazy(() => import("./views/Servicios/Servicios"));
const Horarios = React.lazy(() => import("./views/Horarios/Horarios"));
const Soporte = React.lazy(() => import("./views/Soporte/Soporte"));
const ReporteOOSS = React.lazy(() => import("./views/ReporteOOSS/ReporteOOSS"));
const VideoCD = React.lazy(() => import("./views/Videos/VideoCD.js"));
const DebitosPami = React.lazy(() => import("./views/DebitosPami/DebitosPami"));

const Tableropami = React.lazy(() => import("./views/Tableropami/Tableropami"));
const DisplayPDF = React.lazy(() => import("./components/DisplayPdf"));

const PedidosAdmin = React.lazy(() => import("./views/Pedidos/pedidosAdmin"));
const Novedades = React.lazy(() => import("./views/Publicidades/Novedades"));
const InfoInteres = React.lazy(() =>
  import("./views/Publicidades/Infointeres")
);
const Mutual = React.lazy(() => import("./views/Publicidades/Mutual"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

//****************** CONFIGURACIONES ************************************/
const Pantalla = React.lazy(() => import("./views/Pantalla/Pantalla"));

//*********TRANSFERS */
const NuevoTransfer = React.lazy(() =>
  import("./views/Transfers/Farmacia/NuevoTranfer")
);
const NuevoTransfer2 = React.lazy(() =>
  import("./views/Transfers/Farmacia/NuevoTransferTEST")
);
const MisTransfers = React.lazy(() =>
  import("./views/Transfers/Farmacia/MisTransfers")
);
const FinalizarTransfer = React.lazy(() =>
  import("./views/Transfers/Farmacia/FinalizarTransfer")
);
const Checkout = React.lazy(() =>
  import("./views/Transfers/Farmacia/components/Checkout")
);
const ConfirmacionPedido = React.lazy(() =>
  import("./views/Transfers/Farmacia/ConfirmacionPedido")
);

//*********PACK DE PRODUCTOS */
const SeleccionarPanel = React.lazy(() =>
  import("./views/PacksDeProductos/Farmacia/SeleccionarPanel")
);
const PacksDeProductosFarmacia = React.lazy(() =>
  import("./views/PacksDeProductos/Farmacia/PacksDeProductos")
);
const NuevaSolicitudProveeduria = React.lazy(() =>
  import("./views/Proveeduria/Farmacia/NuevaSolicitudProveeduria")
);
const MisSolicitudesProveeduria = React.lazy(() =>
  import("./views/Proveeduria/Farmacia/MisSolicitudesProveeduria")
);
const FinalizarSolicitudProveeduria = React.lazy(() =>
  import("./views/Proveeduria/Farmacia/FinalizarSolicitudProveeduria")
);
const ConfirmacionSolicitudProveeduria = React.lazy(() =>
  import("./views/Proveeduria/Farmacia/ConfirmacionSolicitudProveeduria")
);
const TareasMantenimiento = React.lazy(() =>
  import("./views/TareasMantenimiento")
);
const VentaOnlineSelect = React.lazy(() =>
  import("./views/Dashboard/components/VentaOnlineSelect")
);

const routes = [
  { path: "/", exact: true, name: "" },
  { path: "/dashboard", name: "Inicio", component: Dashboard },

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/productos", name: "Productos", component: Productos },
  { path: "/promociones", name: "Promociones", component: Promociones },
  { path: "/pedidos", name: "Pedidos", component: Pedidos },
  { path: "/perfil", name: "Perfil", component: Perfil },
  { path: "/mediospagos", name: "Medios de pago", component: Mediospagos },
  { path: "/servicios", name: "Servicios", component: Servicios },
  { path: "/horarios", name: "Horarios", component: Horarios },
  {
    path: "/papeleraproductos",
    name: "Papelera productos",
    component: Papelera,
  },
  { path: "/soporte", name: "Soporte", component: Soporte },
  {
    path: "/reporteObras",
    name: "Reporte de Obras Sociales",
    component: ReporteOOSS,
  },

  {
    path: "/videosInstitucional",
    name: "Video Institucional",
    component: VideoCD,
  },

  { path: "/NuevoTransfer", name: "Nuevo Transfer", component: NuevoTransfer },
  // { path: "/MisTransfers", name: "Mis Transfers", component: MisTransfers },
  {
    path: "/FinalizarTransfer",
    name: "Finalizar Transfer",
    component: FinalizarTransfer,
  },
  {
    path: "/CarritoTransfer",
    name: "Carrito Transfer",
    component: Checkout,
  },
  {
    path: "/ConfirmacionPedido",
    name: "Confirmación Pedido",
    component: ConfirmacionPedido,
  },
  {
    path: "/SeleccionarPanel",
    name: "Seleccionar Panel de productos",
    component: SeleccionarPanel,
  },
  {
    path: "/PacksDeProductosFarmacia",
    name: "Packs De Productos Farmageo",
    component: PacksDeProductosFarmacia,
  },

  {
    path: "/NuevaSolicitudProveeduria",
    name: "Nueva Solicitud Proveeduría",
    component: NuevaSolicitudProveeduria,
  },
  {
    path: "/MisSolicitudesProveeduria",
    name: "Mis Solicitudes Proveeduria",
    component: MisSolicitudesProveeduria,
  },
  {
    path: "/FinalizarSolicitudProveeduria",
    name: "Finalizar Solicitud Proveeduria",
    component: FinalizarSolicitudProveeduria,
  },
  {
    path: "/ConfirmacionPedidoProveeduria",
    name: "Confirmación Pedido",
    component: ConfirmacionSolicitudProveeduria,
  },
  {
    path: "/SeleccionarPanel",
    name: "Seleccionar Panel de productos",
    component: SeleccionarPanel,
  },
  {
    path: "/perfilfarmageo",
    name: "perfilfarmageo",
    component: VentaOnlineSelect,
  },
  {
    path: "/debitosPami",
    name: "debitosPami",
    component: DebitosPami,
  },

  { path: "/tableropami", name: "Tablero Pami", component: Tableropami },
  {
    path: "/pdf",
    name: "DisplayPDF",
    component: DisplayPDF,
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

  /*
  { path: '/pedidosadmin', exact: true, name: 'Pedidos Admin', component: PedidosAdmin },
  { path: '/publicidadesadmin/novedades', exact: true, name: 'Novedades Farmacias', component: Novedades },
  { path: '/publicidadesadmin/infointeres', exact: true, name: 'Información de interés', component: InfoInteres },
  { path: '/publicidadesadmin/mutual', exact: true, name: 'banner mutual', component: Mutual },
*/

  {
    path: "/TEST/NuevoTransfer",
    name: "Nuevo Transfer Test",
    component: NuevoTransfer2,
  },
];

export default routes;
