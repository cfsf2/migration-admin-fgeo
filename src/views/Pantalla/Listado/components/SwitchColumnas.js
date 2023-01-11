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
import InputAreaEditable from "./columnas/InputEditableL";
import SiNoEditable from "./columnas/SiNoEditable";
import Toggle from "./columnas/Toggle";
import Autocompletar from "../../components/Autocompletar";
import InputTextEditable from "../../Vista/components/columnas/InputTextEditable";

import ListadoContext from "../context/ListadoContext";
import { withTools } from "../../helper/withTools";

const SwitchColumnas = ({ data, cab, padre, indiceData, Context, id_elemento }) => {
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
    switch (data[`${cab.id_a}_COMPONENTE`] ?? cab.componente) {
      case undefined:
        return (
          <Default
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "" || "columna_simple":
        return (
          <Default
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
          />
        );
      case "input_editable":
        return (
          <InputAreaEditable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "input_text_editable":
        return (
          <InputTextEditable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            Context={Context}
            id_elemento={id_elemento}
          />
        );
      case "input_number_editable":
        return (
          <InputAreaEditable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            type="number"
            id_elemento={id_elemento}
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
            id_elemento={id_elemento}
          />
        );
      case "autocompletar":
        return (
          <Autocompletar
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            context={ListadoContext}
            id_elemento={id_elemento}
          />
        );
      case "null":
        return <></>;
      case "div":
        return (
          <div id={id_elemento}>
            {hijos?.map((hijo) => hijo)}
          </div>
        );
      default:
        return <>{hijos?.map((hijo) => hijo)}</>;
    }
  })();

  return Componente;
};
export default withTools(SwitchColumnas);
