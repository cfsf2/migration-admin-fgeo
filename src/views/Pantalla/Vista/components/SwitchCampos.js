import React, { useContext, useEffect } from "react";
// import ListadoContext from "../context/ListadoContext";
// import Select from "../../../components/Select";
// import { image_path_server } from "../../../config";
// import { lightFormat, parseJSON } from "date-fns";
import Default from "./columnas/Default";
import FechaC from "./columnas/Fecha";
import SiNo from "./columnas/SiNo";
import Enlace from "./columnas/Enlace";
import Imagen from "./columnas/Imagen";
import Boton from "./columnas/Boton";
import SelectC from "./columnas/SelectC";
import SelectEnlazable from "../../components/SelectP";
import EnlaceOpcional from "./columnas/EnlaceOpcional";
import InputAreaEditable from "../../components/InputAreaEditable";
import SiNoEditable from "./columnas/SiNoEditable";
import RadioButtonC from "./columnas/RadioButtonC";
import CheckboxC from "./columnas/CheckboxC";
import InputDate from "./columnas/InputDate";
import InputPassword from "./columnas/InputPassword";
import Toggle from "./columnas/Toggle";
import InputText from "../../components/InputText";
import InputFile from "../../components/InputFile";
import Autocompletar from "../../components/Autocompletar";
import InputTextEditable from "./columnas/InputTextEditable";
import { withTools } from "../../helper/withTools";

import VistaContext from "../context/VistaContext";

const SwitchCampos = ({
  data,
  cab,
  padre,
  indiceData,
  Context,
  id_elemento,
}) => {
  //const { filtroActivo, setDatos } = useContext(ListadoContext);
  const campokey = cab.campo_alias ? cab.campo_alias : cab.id_a;

  const hijos =
    cab.sc_hijos?.length > 0
      ? cab.sc_hijos.map((s, i) => (
          <SwitchCampos
            key={s.id_a}
            data={data}
            indiceData={i}
            cab={s}
            padre={cab}
            id_elemento={s.id_a + i}
          />
        ))
      : null;

  const Componente = () => {
    switch (data[`${cab.id_a}_COMPONENTE`] ?? cab.componente) {
      case undefined || "columna_simple":
        return (
          <Default
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            id_elemento={id_elemento}
          />
        );
      case "select":
        return (
          <SelectEnlazable
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            context={Context}
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
            context={VistaContext}
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
            context={VistaContext}
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
      case "radio_button":
        return (
          <RadioButtonC
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "checkbox":
        return (
          <CheckboxC
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "input_fecha":
        return (
          <InputDate
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "password":
        return (
          <InputPassword
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "input_text_number":
        return (
          <InputText
            key={cab.id_a}
            data={data}
            cab={cab}
            hijos={hijos}
            campokey={campokey}
            indiceData={indiceData}
            id_elemento={id_elemento}
          />
        );
      case "input_file":
        return (
          <InputFile
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
            context={VistaContext}
            id_elemento={id_elemento}
          />
        );
      case "null":
        return <></>;
      case "botonera":
        return (
          <div
            id={id_elemento}
            style={{ display: "flex", alignItems: "center" }}
          >
            {cab.nombre ? (
              <div className="vista_label" style={{ fontWeight: "bold" }}>
                {cab.nombre}:
              </div>
            ) : (
              <></>
            )}
            {hijos?.map((hijo) => hijo)}
          </div>
        );
      default:
        return <> {hijos?.map((hijo) => hijo)}</>;
    }
  };

  return (
    <div id={cab.id_a} className="tarjeta_grid_item_componente_campo">
      {Componente()}
    </div>
  );
};

export default withTools(SwitchCampos);
