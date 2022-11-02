export default {
  items: [
    {
      name: "Inicio",
      url: "/dashboard",
      icon: "icon-home",
      permiso: "inicio",
    },
    {
      title: true,
      name: "Farmageo",
      icon: "icon-star",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "", // optional class names space delimited list for title item ex: "text-center",
      permiso: "inicio",
    },
    {
      name: "Pedidos",
      url: "/pedidosAdmin",
      icon: "icon-bag",
      permiso: "pedidos",
    },
    {
      name: "Comunicados",
      icon: "icon-cursor",
      permiso: "comunicados",
      children: [
        {
          name: "Novedades farmacias",
          url: "/publicidadesAdmin/novedades",
        },
        {
          name: "Agregar Novedad",
          url: "/publicidadesAdmin/abmnovedades",
        },
      ],
    },
    {
      name: "Farmacias",
      url: "/farmaciasAdmin",
      icon: "icon-plus",
      permiso: "farmacia",
      children: [
        {
          name: "Alta de Farmacias",
          url: "/AltaFarmacia",
        },
        {
          name: "Listado de Farmacias",
          url: "/farmaciasAdmin",
        },
        {
          name: "Mapa de Farmacias",
          url: "/MapaFarmacias",
        },
      ],
    },
    {
      name: "Usuarios",
      url: "/usuarios",
      icon: "icon-user",
      permiso: "usuarios",
      children: [
        {
          name: "Listado",
          url: "/usuarios",
        },
        {
          name: "Crear Usuario",
          url: "/CreateUser",
        },
      ],
    },
    {
      name: "Instituciones",
      icon: "instituciones",
      url: "/instituciones",
      permiso: "instituciones",
    },
    {
      name: "Denuncias",
      url: "/denuncias",
      permiso: "denuncias",
      icon: "icon-bell",
    },
    {
      name: "Reporte OOSS",
      url: "/reporteOOSS",
      permiso: "reporteooss",
      icon: "icon-shield",
    },
    {
      name: "Packs de Productos",
      url: "/packsdeproductos",
      permiso: "packsdeproductos",
      icon: "",
      children: [
        {
          name: "Categorías",
          url: "/packsdeproductos/categoriasproductos",
        },
        {
          name: "Entidades",
          url: "/packsdeproductos/entidadespacksproductos",
        },
        {
          name: "Productos Pack",
          url: "/packsdeproductos/adminproductos",
        },
        {
          name: "Papelera Productos",
          url: "/packsdeproductos/PapeleraProductosPack",
        },
        {
          name: "Proveeduría",
          url: "/SolicitudesProveedoresAdmin",
        },
        {
          name: "Importar .csv",
          url: "/importarcsvpacks",
        },
      ],
    },
    {
      name: "Banners",
      //url: "/ecommerce/banners-home",
      permiso: "banners",
      children: [
        {
          name: "Banners Ecommerce",
          url: "/ecommerce/banners-home",
        },
        {
          name: "Banners Mutual (app)",
          url: "/publicidadesAdmin/mutual",
        },
        {
          name: "Info de interés (app)",
          url: "/publicidadesAdmin/infointeres",
        },
      ],
    },
    {
      name: "PANTALLAS",
      //url: "/ecommerce/banners-home",
      permiso: "sistemas",
      children: [
        {
          name: "Configuracion",
          url: "/Configuracion/PANTALLA_LISTADO_CONFIGURACION",
        },
      ],
    },

    {
      name: "Recuperos",
      url: "/Configuracion/PANTALLA_RECUPERO",
      permiso: "recupero",
    },
    {
      name: "Campañas",
      //url: "/ecommerce/banners-home",
      permiso: "campanas",
      children: [
        {
          name: "Requerimientos",
          url: "/campanas/requerimientos",
        },
      ],
    },
    {
      title: true,
      name: "Transfers Farmacias",
      permiso: "transfer",
      icon: "icon-star",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "", // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Transfers ",
      permiso: "transfer",
      icon: "icon-calendar",
      children: [
        // {
        //   name: "Laboratorios",
        //   url: "/laboratorios",
        // },
        // {
        //   name: "Droguerías",
        //   url: "/droguerias",
        // },
        // {
        //   name: "Administrar Transfers",
        //   url: "/administrartranfers",
        // },
        {
          name: "Administrar Transfers",
          url: "/Configuracion/PANTALLA_TRANSFER",
          permiso: "transfer_nuevo",
        },
        {
          name: "Droguerías",
          url: "/Configuracion/PANTALLA_DROGUERIA",
          permiso: "drogueria_nuevo",
        },
        {
          name: "Laboratorios",
          url: "/Configuracion/PANTALLA_ADMIN_LABORATORIOS",
          permiso: "transfer_nuevo",
        },
        {
          name: "Productos",
          url: "/productostransfers",
        },

        {
          name: "Comunicado transfers",
          url: "/comunicadotransfers",
        },
        {
          name: "Importar .csv",
          url: "/importarcsv",
        },
      ],
    },
    {
      name: "Administrar Transfers",
      url: "/Configuracion/PANTALLA_TRANSFER",
      permiso: "transfer_nuevo",
    },

    /*{
      name: 'Productos',
      url: '/productos',
      icon: 'icon-bag',
    },
    {
      name: 'Promociones',
      url: '/promociones',
      icon: 'icon-badge',
    },
    {
      name: 'Pedidos',
      url: '/pedidos',
      icon: 'icon-bell',
    },
    {
      title: true,
      name: 'Mi Farmacia',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Perfil',
      url: '/perfil',
      icon: 'icon-user',
    },
    {
      name: 'Medios de pago',
      url: '/mediospagos',
      icon: 'icon-wallet',
    },    
    {
      name: 'Servicios',
      url: '/servicios',
      icon: 'icon-briefcase',
    },
    {
      name: 'Horarios',
      url: '/horarios',
      icon: 'icon-clock',
    },                 
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: '',
    },
    {
      name: 'Informes',
      url: '/informes',
      icon: 'icon-graph'
    },
    {
      name: 'Recursos',
      url: '/recursos',
      icon: 'icon-energy',
    },
    {
      name: 'Soporte',
      url: '/soporte',
      icon: 'icon-support',
    },    */
  ],
};
