import React, { useState, useContext, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { MemoizedModal } from "../Modal";
import MenuConfDeUsuario from "../../Listado/components/MenuConfDeUsuario";
import ListadoContext from "../../Listado/context/ListadoContext";

const Configuracion = ({ opciones }) => {
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  const { opcionesListado } = useContext(ListadoContext);

  const Contenedor = useMemo(
    () =>
      opcionesListado.configuracionesDeListado
        ? opcionesListado.configuracionesDeListado[0]
        : {},
    [opcionesListado.id_a]
  );

  const handleClick = (e) => {
    e.preventDefault();
    setMostrarConfiguracion(true);
  };
  return (
    <div
      className={
        opciones.titulo
          ? "flex_acciones_vista_configuracion"
          : "flex_acciones_vista_alt_configuracion"
      }
    >
      <div
        onClick={(e) => handleClick(e)}
        style={{ cursor: "pointer" }}
        title="Ver configuración"
      >
        <FontAwesomeIcon icon={faGear} />
      </div>
      <MemoizedModal
        open={mostrarConfiguracion}
        handleClose={setMostrarConfiguracion}
        modalContainerStyle={{ top: "100px" }}
        data={{ opciones: Contenedor }}
      >
        <MenuConfDeUsuario contenedor={Contenedor} />
      </MemoizedModal>
    </div>
  );
};

export default Configuracion;
