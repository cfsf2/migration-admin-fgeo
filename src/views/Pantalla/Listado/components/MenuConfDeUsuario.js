import React from "react";
import SubPantalla from "../../SubPantalla/SubPantalla";

export const MenuConfDeUsuario = ({ contenedor }) => {
  if (!contenedor.opciones) return <></>;
  return (
    <div id={contenedor.opciones.id_a} style={{ position: "fixed" }}>
      <SubPantalla configuracion={contenedor} nollamar />
    </div>
  );
};

export const MemoizeMenuConfDeUsuario = React.memo(MenuConfDeUsuario);

export default MenuConfDeUsuario;
