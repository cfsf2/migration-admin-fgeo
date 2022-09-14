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
}) => {
  return (
    <div className={className}>
      <Guardar handleSubmit={handleSubmit} loading={loading} id={id} />
      <Cancelar handleCancelar={handleCancelar} />
    </div>
  );
};

export default Botonera;
