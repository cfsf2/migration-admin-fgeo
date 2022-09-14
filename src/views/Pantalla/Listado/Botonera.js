import React from "react";
import Buscar from "./components/botonera/Buscar";
import "../Listado/botonera.scss";
import Cancelar from "./components/botonera/Cancelar";
import SwitchColumnas from "./components/SwitchColumnas";

const Botonera = ({
  handleSubmit,
  handleCancelar,
  loading,
  buscar,
  cancelar,
  acciones,
}) => {
  if (!buscar && !cancelar && acciones?.length === 0) return <></>;
  return (
    <div className="container_buttons">
      {buscar ? (
        <Buscar handleSubmit={handleSubmit} loading={loading} />
      ) : (
        <></>
      )}
      {cancelar ? <Cancelar handleCancelar={handleCancelar} /> : <></>}
      {acciones?.map((accion) => (
        <SwitchColumnas cab={accion} data={{}} />
      ))}
    </div>
  );
};

export default Botonera;
