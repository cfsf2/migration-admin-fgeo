import React from "react";
import Guardar from "./botonera/Guardar";
import Cancelar from "./botonera/Cancelar";

const Botonera = ({
  handleSubmit,
  loading,
  handleCancelar,
  id,
  className,
  buscar,
  cancelar,
  acciones,
  opciones,
}) => {
  return (
    <div className={className}>
      <Guardar
        handleSubmit={handleSubmit}
        loading={loading}
        id={id}
        texto_confirmar={opciones.abm_texto_boton_confirmar}
      />
      {opciones.abm_boton_cancelar === "s" ? (
        <Cancelar handleCancelar={handleCancelar} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Botonera;
