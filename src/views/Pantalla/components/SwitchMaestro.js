import React, { useContext } from "react";
import SubPantalla from "../SubPantalla/SubPantalla";
import { ListadoProvider } from "../Listado/Listado";
import ConfigListado from "../Listado/components/ConfigListado";
import Vista from "../Vista/Vista";
import ABMProvider from "../ABM/ABMProvider";
import ABM from "../ABM/ABM";
import { useLocation } from "react-router";
import Modal from "./Modal";
import RedirectP from "./RedirectP";
import ModalesContext from "../context/ModalContext";
import PantallaContext from "../context/PantallaContext";

//cabeceras data opciones
const SwitchMaestro = ({ configuracion, id, _key, nollamar, idx, params }) => {
  const modalContext = useContext(ModalesContext);
  const { getModal } = modalContext;

  const pantallaContext = useContext(PantallaContext);
  const calcComponente = ({
    configuracion,
    id,
    _key,
    nollamar,
    idx,
    params,
  }) => {
    switch (configuracion.opciones.tipo.id) {
      //Listado
      case 2:
        return (
          <ListadoProvider
            key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={nollamar}
            idx={idx}
            params={params}
          >
            <ConfigListado />
          </ListadoProvider>
        );
      //Vista
      case 6:
        return (
          <Vista
           // key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={nollamar}
            idx={idx}
            params={params}
          />
        );
      case 7:
        return (
          <SubPantalla
            key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={nollamar}
            idx={idx}
            params={params}
          />
        );

      case 1:
        return (
          <SubPantalla
            key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={nollamar}
            idx={idx}
            params={params}
          />
        );

      case 9:
        return (
          <ABMProvider
            key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={nollamar}
            idx={idx}
            params={params}
          >
            <ABM />
          </ABMProvider>
        );
      case 11:
        return <RedirectP configuracion={configuracion} />;
      default:
        return <></>;
    }
  };

  if (
    configuracion.opciones.modal ||
    getModal(configuracion.opciones.id_a).id_a
  ) {
    const { getModal, cerrarModal, zIndex } = modalContext;
    const { PantallaDispatch } = pantallaContext;
    const modal = getModal(configuracion.opciones.id_a);

    // const cfg = configuracion;
    // cfg.opciones.modal = false;

    const ComponenteParaModal = calcComponente({
      configuracion,
      id: modal.parametro_id,
      _key: "modal" + zIndex,
      nollamar,
      params: modal.data,
    });

    return (
      <Modal
        open={modal.open}
        modalContainerStyle={{
          top: "150px",
          left: "250px",
          width: "max-content",
          maxWidth: "calc(100% - 400px)",
          margin: "0 calc((100% - 400px)/20)",
          padding: "5px",
          background: "white",
          borderRadius: "15px",
          transform: "translate(0%, 0%)",
        }}
        zIndex={1000}
        handleClose={() => {
          PantallaDispatch({
            type: "KILL_CONFIGURACION",
            payload: configuracion.opciones.id_a,
          });
          cerrarModal(configuracion.opciones.id_a);
        }}
        data={configuracion}
      >
        {ComponenteParaModal}
      </Modal>
    );
  }
  const Componente = calcComponente({
    configuracion,
    id,
    _key,
    nollamar,
    idx,
    params,
  });
  return Componente;
};

export default SwitchMaestro;
