import React, { useCallback, useContext, useMemo } from "react";
import ABMContext from "../context/ABMContext";
import InputText from "./inputs/InputText";
import Fecha from "./inputs/Fecha";
import InputSelect from "./inputs/InputSelect";
import InputCheckbox from "./inputs/InputCheckbox";
import InputRadio from "./inputs/RadioButton";
import InputFile from "./inputs/InputFile";
import AutocompletarABM from "./inputs/AutocompletarABM";
import InputPassword from "./inputs/InputPassword";
import Default from "../../Vista/components/columnas/Default";
import FechaSimple from "./inputs/Fecha_simple";
import Toggle from "./inputs/Toggle";
import InputBuscador from "./inputs/InputBuscador/InputBuscador";
import Hidden from "./inputs/Hidden";
import Obligatorio from "./inputs/ObligatorioA";
// import { ReadOnlyTextArea } from "../../components/EditorTextArea";
import Enlace from "views/Pantalla/Vista/components/columnas/Enlace";

import { ListadoProvider } from "../../Listado/Listado";

import ConfigListado from "../../Listado/components/ConfigListado";

const SwitchABM = (props) => {
  const { ABMDispatch, valorFormulario, opciones } = useContext(ABMContext);
  const { cab, data, id_elemento, qsBody, error, setError } = props;
  const campokey = cab.campo_alias ? cab.campo_alias : cab.id_a;

  const id_a = cab.id_a;

  const setFormularioValor = useCallback(
    (valor) => {
      setError((s) => {
        const ns = { ...s };
        ns[cab.id_a] = false;

        return ns;
      });

      if (cab.clave_envio && cab.clave_envio.trim() !== "") {
        ABMDispatch({
          type: "SET_FORMULARIO_VALOR",
          payload: { id_a: cab.clave_envio, valor },
        });
      }
      return ABMDispatch({
        type: "SET_FORMULARIO_VALOR",
        payload: { id_a, valor },
      });
    },
    [ABMDispatch, id_a, cab.clave_envio]
  );

  if (cab.round) {
    if (!isNaN(parseFloat(data[cab.id_a]))) {
      const val = Number.parseFloat(data[cab.id_a]).toFixed(
        parseInt(data[cab.id_a + "_round"] ?? cab.round)
      );
      data[cab.id_a] = val;
    }
  }

  const hijos =
    cab.sc_hijos?.length > 0
      ? cab.sc_hijos
          .sort((a, b) => a.orden - b.orden)
          .map((s, i) => (
            <SwitchABM
              key={s.id_a}
              data={data}
              indiceData={i}
              cab={s}
              padre={cab}
              id_elemento={s.id_a + i}
            />
          ))
      : null;

  const seleccionarDatosDeListado = useCallback(
    (rows) => {
      if (
        opciones.listado_seleccion_data &&
        opciones.listado_seleccion_data?.trim() !== ""
      ) {
        const extraer_idas = opciones.listado_seleccion_data
          .split("|")
          .map((c) => c.trim());

        const data_extraida = rows
          .map((r) => {
            const rExtraido = extraer_idas.map((e) => r[e]);
            return rExtraido;
          })
          .join("|");

        ABMDispatch({
          type: "SET_FORMULARIO_VALOR",
          payload: { id_a: "sideData", valor: [data_extraida] },
        });
      }
    },
    [opciones, ABMDispatch]
  );

  const renderListado = useMemo(() => {
    return (
      <div key={id_elemento} style={{ width: "100%", fontSize: "0.9rem" }}>
        <ListadoProvider
          key={cab.id_a}
          configuracion={cab}
          subirDatosSeleccionados={seleccionarDatosDeListado}
        >
          <ConfigListado />
        </ListadoProvider>
      </div>
    );
  }, [id_elemento, cab, seleccionarDatosDeListado]);

  const Componente = useMemo(
    () =>
      (() => {
        switch (data[`${cab.id_a}_COMPONENTE`] ?? cab.componente) {
          case "autocompletar":
            return (
              <AutocompletarABM
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "checkbox":
            return (
              <InputCheckbox
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
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
          case "enum":
            return (
              <InputSelect
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );

          case "fecha":
            return (
              <Fecha
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "fecha_simple":
            return (
              <FechaSimple
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "group_columnas":
            return (
              <div
                className={`${
                  data[cab.id_a + "_className"] ?? cab.className
                } grupo_columnas_m_p`}
              >
                {hijos?.map((hijo) => hijo)}
              </div>
            );
          case "hidden":
            return (
              <Hidden
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
                id_elemento={id_elemento}
              />
            );
          case "input_buscador":
            return (
              <InputBuscador
                key={cab.id_a}
                data={data}
                cab={cab}
                hijos={hijos}
                campokey={campokey}
                context={ABMContext}
                id_elemento={id_elemento}
                qsBody={qsBody}
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "input_file":
            return (
              <InputFile
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "input_number_editable":
            return (
              <InputText
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
                number
                context={ABMContext}
              />
            );
          case "input_text":
            return (
              <InputText
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
                context={ABMContext}
              />
            );
          case "input_textarea":
            return (
              <InputText
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
                textarea
                context={ABMContext}
              />
            );
          case "listado":
            return renderListado;
          case "password":
            return (
              <InputPassword
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "radio":
            return (
              <InputRadio
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "select":
            return (
              <InputSelect
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "si_no":
            cab.opciones = [
              { value: "s", label: "Si" },
              { value: "n", label: "No" },
            ];
            return (
              <InputSelect
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
              />
            );
          case "toggle":
            return (
              <Toggle
                {...props}
                setValor={setFormularioValor}
                valor={valorFormulario[id_a]}
                id_elemento={id_elemento}
              />
            );
          case "undefined":
          case "columna_simple":
            return (
              <Default
                key={cab.id_a}
                data={data}
                cab={cab}
                campokey={campokey}
                id_elemento={id_elemento}
              />
            );
          default:
            return <></>;
        }
      })(),
    [
      cab,
      campokey,
      data,
      hijos,
      id_a,
      id_elemento,
      props,
      qsBody,
      renderListado,
      setFormularioValor,
      valorFormulario,
    ]
  );

  if (
    data[`${cab.id_a}_COMPONENTE`] === "hidden" ||
    cab.componente === "hidden"
  ) {
    return <>{Componente}</>;
  }

  return (
    <>
      <div
        id={cab.id_a}
        style={{
          gridColumn: cab.grid_span,
          height: "100%",
          border: error[cab.id_a] ? "2px solid rgba(255,0,0,0.5)" : "",
          borderRadius: "2px",
        }}
        className="switch_abm_input_base"
      >
        {Componente}
      </div>
      <Obligatorio {...cab} />
    </>
  );
};

export default React.memo(SwitchABM);
