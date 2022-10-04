import React from "react";
import SubPantalla from "../SubPantalla/SubPantalla";
import { ListadoProvider } from "../Listado/Listado";
import ConfigListado from "../Listado/components/ConfigListado";
import Vista from "../Vista/Vista";
import ABMProvider from "../ABM/ABMProvider";
import ABM from "../ABM/ABM";

//cabeceras data opciones
const SwitchMaestro = ({ configuracion, id, _key, nollamar, idx }) => {
  const Componente = (() => {
    // console.log("opciones", configuracion.opciones);

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

      default:
        return <></>;
    }
  })();

  return Componente;
};

export default SwitchMaestro;
