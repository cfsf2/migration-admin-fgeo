import React, { useContext } from "react";
// import ListadoContext from "../context/ListadoContext";
// import Select from "../../../components/Select";
// import { image_path_server } from "../../../config";
// import { lightFormat, parseJSON } from "date-fns";
import Default, { Code } from "./columnas/Default";
import FechaC from "./columnas/Fecha";
import SiNo from "./columnas/SiNo";
import Enlace from "./columnas/Enlace";
import Imagen from "./columnas/Imagen";
import Boton from "./columnas/Boton";
import SelectC from "./columnas/SelectC";
import EnlaceOpcional from "./columnas/EnlaceOpcional";
import InputEditable from "./columnas/InputEditableL";
import SiNoEditable from "./columnas/SiNoEditable";
import Toggle from "./columnas/Toggle";

const SwitchColumnas = ({ data, cab, padre, indiceData }) => {
  //const { filtroActivo, setDatos } = useContext(ListadoContext);
  if (!cab) return <></>;
  const campokey = cab.campo_alias ? cab.campo_alias : cab.id_a;

  const hijos =
    cab.sc_hijos.length > 0
      ? cab.sc_hijos.map((s) => (
          <SwitchColumnas key={s.id_a} data={data} cab={s} padre={cab} />
        ))
      : null;

  const Componente = (() => {
    switch (cab.componente) {
      case undefined:
        return (
          <Default
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "":
        return (
          <Default
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "select":
        return (
          <SelectC
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "fecha":
        return (
          <FechaC
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );

      case "si_no":
        return (
          <SiNo
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "si_no_editable":
        return (
          <SiNoEditable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "toggle":
        return (
          <Toggle
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "imagen":
        return (
          <Imagen
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "boton":
        return (
          <Boton
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );

      case "enlace":
        return (
          <Enlace
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "enlace_opcional":
        return (
          <EnlaceOpcional
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "input_editable":
        return (
          <InputEditable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "input_number_editable":
        return (
          <InputEditable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            type="number"
          />
        );
      case "code":
        return (
          <Code
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
          />
        );
      case "div":
        return <div>{hijos?.map((hijo) => hijo)}</div>;
      default:
        return <>{hijos?.map((hijo) => hijo)}</>;
    }
  })();

  return Componente;
};

export default SwitchColumnas;