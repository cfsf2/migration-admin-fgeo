export default {
  items: [
    {
      name: "Inicio",
      url: "/dashboard",
      icon: "icon-home",
      perfil_farmageo: [],
    },

    //Venta online
    {
      title: true,
      name: "Venta online",
      wrapper: {
        element: "",
        attributes: {},
      },
      perfil_farmageo: ["vender_online"],
    },
    {
      name: "Productos",
      icon: "icon-user",
      children: [
        {
          name: "Administrar productos",
          url: "/SeleccionarPanel",
        },
        {
          name: "Papelera de productos",
          url: "/papeleraproductos",
        },
      ],
      perfil_farmageo: ["vender_online"],
    },

    // Todos los perfiles debe mostrarse
    {
      name: "Proveeduría",
      //url: "/NuevaSolicitudProveeduria",
      children: [
        {
          name: "-  Nuevo pedido",
          url: "/NuevaSolicitudProveeduria",
        },
        {
          name: "-  Mis Pedidos",
          url: "/MisSolicitudesProveeduria",
        },
      ],
      perfil_farmageo: [],
    },

    {
      name: "Promociones",
      url: "/promociones",
      icon: "icon-wallet",
      perfil_farmageo: ["vender_online"],
    },
    {
      name: "Pedidos",
      url: "/pedidos",
      icon: "icon-briefcase",
      perfil_farmageo: ["vender_online"],
    },

    //Mi Farmacia
    {
      title: true,
      name: "Mi Farmacia",
      wrapper: {
        element: "",
        attributes: {},
      },
      perfil_farmageo: [],
    },
    {
      name: "Perfil",
      url: "/perfil",
      icon: "icon-user",
      perfil_farmageo: [],
    },
    {
      name: "Medios de pago",
      url: "/mediospagos",
      icon: "icon-wallet",
      perfil_farmageo: ["solo_visible"],
    },
    {
      name: "Servicios",
      url: "/servicios",
      icon: "icon-briefcase",
      perfil_farmageo: ["solo_visible"],
    },
    {
      name: "Horarios",
      url: "/horarios",
      icon: "icon-clock",
      perfil_farmageo: ["solo_visible"],
    },
    {
      title: true,
      name: "Transfers",
      wrapper: {
        element: "",
        attributes: {},
      },
      perfil_farmageo: [],
    },
    {
      name: "Mis Transfers",
      url: "/Pantalla/PANTALLA_TRANSFER",
      perfil_farmageo: [],
    },
    {
      name: "Nuevo Transfer",
      url: "/NuevoTransfer",
      perfil_farmageo: [],
    },
    {
      title: true,
      name: "Soporte",
      wrapper: {
        element: "",
        attributes: {},
      },
      perfil_farmageo: [],
    },
    {
      name: "Soporte",
      url: "/soporte",
      icon: "icon-support",
      perfil_farmageo: [],
    },
  ],
};
