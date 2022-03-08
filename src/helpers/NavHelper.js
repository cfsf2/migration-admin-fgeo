export const Filtrar_Sin_Venta_Online = (nav, userprofile) => {
  if (userprofile) {
    switch (userprofile.perfil_farmageo) {
      case "indefinido":
        return {
          ...nav,
          items: nav.items.filter((i) => {
            return (
              !i.perfil_farmageo.includes("vender_online") &&
              !i.perfil_farmageo.includes("solo_visible")
            );
          }),
        };
      case "vender_online":
        return nav;
      case "solo_visible":
        return {
          ...nav,
          items: nav.items.filter((i) => {
            return !i.perfil_farmageo.includes("vender_online");
          }),
        };
      case "no_visible":
        return {
          ...nav,
          items: nav.items.filter((i) => {
            return (
              !i.perfil_farmageo.includes("vender_online") &&
              !i.perfil_farmageo.includes("solo_visible")
            );
          }),
        };
      case "demo":
        return nav;
      default:
        return nav;
    }
  } else {
    return nav;
  }
};
