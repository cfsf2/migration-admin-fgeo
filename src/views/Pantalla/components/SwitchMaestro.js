import React, { useContext } from "react";
import SubPantalla from "../SubPantalla/SubPantalla";
import { ListadoProvider } from "../Listado/Listado";
import ConfigListado from "../Listado/components/ConfigListado";
import Vista from "../Vista/Vista";
import ABMProvider from "../ABM/ABMProvider";
import ABM from "../ABM/ABM";
import { Redirect } from "react-router";
import Modal from "./Modal";
import ModalesContext from "../context/ModalContext";
import PantallaContext from "../context/PantallaContext";

//cabeceras data opciones
const SwitchMaestro = ({ configuracion, id, _key, nollamar, idx }) => {
  const modalContext = useContext(ModalesContext);
  const pantallaContext = useContext(PantallaContext);
  const Componente = (() => {
    // console.log("opciones",configuracion.opciones    );
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
          >
            <ConfigListado />
          </ListadoProvider>
        );
      //Vista
      case 6:
        return (
          <Vista
            key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={nollamar}
            idx={idx}
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
          />
        );

      case 1:
        return (
          <SubPantalla
            key={_key}
            configuracion={configuracion}
            id={id}
            nollamar={true}
            idx={idx}
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
          >
            <ABM />
          </ABMProvider>
        );
      case 11:
        const { enlace } = configuracion.opciones;

        return (
          <Redirect
            to={{
              pathname: enlace,
            }}
          />
        );
      default:
        return <></>;
    }
  })();

  if (configuracion.opciones.modal) {
    const { getModal, cerrarModal } = modalContext;
    const { PantallaDispatch } = pantallaContext;
    const modal = getModal(configuracion.opciones.id_a);
    return (
      <Modal
        open={modal.open}
        modalContainerStyle={{
          top: "150px",
          left: "250px",
          width: "max-content",
          maxWidth: "calc(100% - 400px)",
          margin: "0 calc((100% - 400px)/20)",
          padding: "0",
          border: "2px white solid",
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
      >
        {Componente}
      </Modal>
    );
  }

  return Componente;
};

export default SwitchMaestro;
