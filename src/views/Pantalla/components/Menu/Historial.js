import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import VistaContext from "../../Vista/context/VistaContext";

const Historial = () => {
  const { id, opciones } = useContext(VistaContext);
  const tabla = opciones.tabla;

  return (
    <div className="flex_acciones_vista_email">
      <Link
        to={{
          pathname: process.env.PUBLIC_URL + "/Vista/PANTALLA_HISTORIAL",
          state: {
            filtros: { FILTRO_HISTORIAL_ID: id, FILTRO_HISTORIAL_TABLA: tabla },
          },
        }}
        title="Ver historial de cambios"
        className="link_historial"
      >
        <FontAwesomeIcon icon={faBook} />
      </Link>
    </div>
  );
};

export default Historial;
