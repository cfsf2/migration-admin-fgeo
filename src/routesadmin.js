import React from "react";
import store from "./redux/store";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
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

const PedidosAdmin = React.lazy(() => import("./views/Pedidos/pedidosAdmin"));
const Novedades = React.lazy(() => import("./views/Publicidades/Novedades"));
const InfoInteres = React.lazy(() =>
  import("./views/Publicidades/Infointeres")
);
const Mutual = React.lazy(() => import("./views/Publicidades/Mutual"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const FarmaciasAdmin = React.lazy(() =>
  import("./views/FarmaciasAdmin/FarmaciasAdmin")
);
const AltaFarmacia = React.lazy(() =>
  import("./views/FarmaciasAdmin/AltaFarmacia")
);
const Usuarios = React.lazy(() => import("./views/Usuarios/Usuarios"));
const CrearUsuario = React.lazy(() => import("./views/Usuarios/CreateUser"));
const EditUser = React.lazy(() => import("./views/Usuarios/EditUser"));
const Denuncias = React.lazy(() => import("./views/Denuncias/Denuncias"));

const Laboratorios = React.lazy(() =>
  import("./views/Transfers/Admin/Laboratorios")
);

const Droguerias = React.lazy(() =>
  import("./views/Transfers/Admin/Droguerias")
);
const TransfersAdmin = React.lazy(() =>
  import("./views/Transfers/Admin/TranfersAdmin")
);

const ProductosTransfers = React.lazy(() =>
  import("./views/Transfers/Admin/ProductosTransfers")
);

const Entidades = React.lazy(() =>
  import("./views/PacksDeProductos/Admin/Entidades")
);

const Categorias = React.lazy(() =>
  import("./views/PacksDeProductos/Admin/Categorias")
);

const ProductosPack = React.lazy(() =>
  import("./views/PacksDeProductos/Admin/ProductosPack")
);

const PapeleraProductosPack = React.lazy(() =>
  import("./views/PacksDeProductos/Admin/PapeleraProductosPack")
);

const ComunicadoTransfers = React.lazy(() =>
  import("./views/Transfers/Admin/ComunicadoTransfers")
);

const SolicitudesProveedoresAdmin = React.lazy(() =>
  import("./views/Proveeduria/SolicitudesProveedoresAdmin")
);

const TareasMantenimiento = React.lazy(() =>
  import("./views/TareasMantenimiento")
);

const MapaFarmacias = React.lazy(() =>
  import("./views/MapaFarmacias/MapaFarmacias")
);

const ImportProductosTransfers = React.lazy(() =>
  import("./views/Transfers/Admin/ImportProductosTransfers")
);

const ImportProductosPack = React.lazy(() =>
  import("./views/PacksDeProductos/Admin/ImportProductosPack")
);

const BannersEcommerce = React.lazy(() =>
  import("./views/Publicidades/BannersEcommerce/BannersEcommerce")
);
const ReporteOOSSAdmin = React.lazy(() =>
  import("./views/ReporteOOSSAdmin/ReporteOOSSAdmin")
);

const routes = [
  { path: "/", exact: true, name: "", component: Dashboard, permiso: "inicio" },
  {
    path: "/dashboard",
    exact: true,
    name: "Inicio",
    component: Dashboard,
    permiso: "inicio",
  },
  /*{ path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },*/

  /*
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/productos', name: 'Productos', component: Productos },
  { path: '/promociones', name: 'Promociones', component: Promociones },
  { path: '/pedidos', name: 'Pedidos', component: Pedidos },
  { path: '/perfil', name: 'Perfil', component: Perfil },
  { path: '/mediospagos', name: 'Medios de pago', component: Mediospagos },
  { path: '/servicios', name: 'Servicios', component: Servicios },
  { path: '/horarios', name: 'Horarios', component: Horarios },
  { path: '/papeleraproductos', name: 'Papelera productos', component: Papelera },
*/
  {
    path: "/pedidosadmin",
    exact: true,
    name: "Pedidos Admin",
    component: PedidosAdmin,
    permiso: "pedidos",
  },

  {
    path: "/reporteOOSS",
    name: "Reporte de Obras Sociales",
    component: ReporteOOSSAdmin,
    permiso: "reporteooss",
  },
  {
    path: "/publicidadesadmin/novedades",
    exact: true,
    name: "Novedades Farmacias",
    component: Novedades,
    permiso: "comunicados",
  },
  {
    path: "/publicidadesadmin/infointeres",
    exact: true,
    name: "Información de interés",
    component: InfoInteres,
    permiso: "banners",
  },
  {
    path: "/publicidadesadmin/mutual",
    exact: true,
    name: "banner mutual",
    component: Mutual,
    permiso: "banners",
  },
  {
    path: "/farmaciasAdmin",
    exact: true,
    name: "Farmacias",
    component: FarmaciasAdmin,
    permiso: "farmacia",
  },
  {
    path: "/AltaFarmacia",
    exact: true,
    name: "Alta de Farmacias",
    component: AltaFarmacia,
    permiso: "farmacia",
  },
  {
    path: "/usuarios",
    exact: true,
    name: "Administración de usuarios",
    component: Usuarios,
    permiso: "usuarios",
  },
  {
    path: "/CreateUser",
    exact: true,
    name: "Administración de usuarios",
    component: CrearUsuario,
    permiso: "usuarios",
  },
  {
    path: "/EditUser",
    exact: true,
    name: "Editar usuario",
    component: EditUser,
    permiso: "usuarios",
  },
  {
    path: "/denuncias",
    exact: true,
    name: "Administración de denuncias",
    component: Denuncias,
    permiso: "denuncias",
  },
  {
    path: "/laboratorios",
    exact: true,
    name: "Laboratorios",
    component: Laboratorios,
    permiso: "transfer",
  },
  {
    path: "/droguerias",
    exact: true,
    name: "Droguerias",
    component: Droguerias,
    permiso: "transfer",
  },
  {
    path: "/administrartranfers",
    exact: true,
    name: "Administrar Transfers",
    component: TransfersAdmin,
    permiso: "transfer",
  },
  {
    path: "/productostransfers",
    exact: true,
    name: "Productos Transfers",
    component: ProductosTransfers,
    permiso: "transfer",
  },
  {
    path: "/packsdeproductos/entidadespacksproductos",
    exact: true,
    name: "Entidades",
    component: Entidades,
    permiso: "packsdeproductos",
  },
  {
    path: "/packsdeproductos/categoriasproductos",
    exact: true,
    name: "Categorias",
    component: Categorias,
    permiso: "packsdeproductos",
  },
  {
    path: "/packsdeproductos/adminproductos",
    exact: true,
    name: "Productos Pack",
    component: ProductosPack,
    permiso: "packsdeproductos",
  },
  {
    path: "/packsdeproductos/PapeleraProductosPack",
    exact: true,
    name: "PapeleraProductosPack",
    component: PapeleraProductosPack,
    permiso: "packsdeproductos",
  },

  {
    path: "/comunicadotransfers",
    exact: true,
    name: "Comunicado Transfers",
    component: ComunicadoTransfers,
    permiso: "transfer",
  },
  {
    path: "/SolicitudesProveedoresAdmin",
    exact: true,
    name: "Solicitudes Proveedores Admin",
    component: SolicitudesProveedoresAdmin,
    permiso: "packsdeproductos",
  },
  {
    path: "/MapaFarmacias",
    exact: true,
    name: "Mapa Farmacias",
    component: MapaFarmacias,
    permiso: "farmacia",
  },
  {
    path: "/importarcsv",
    exact: true,
    name: "csv",
    component: ImportProductosTransfers,
    permiso: "transfer",
  },
  {
    path: "/importarcsvpacks",
    exact: true,
    name: "csv",
    component: ImportProductosPack,
    permiso: "packsdeproductos",
  },
  {
    path: "/ecommerce/banners-home",
    exact: true,
    name: "csv",
    component: BannersEcommerce,
    permiso: "banners",
  },
];

export default routes;
