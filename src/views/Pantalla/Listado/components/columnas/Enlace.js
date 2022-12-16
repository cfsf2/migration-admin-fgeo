import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ModalesContext from "../../../context/ModalContext";

const Enlace = ({ data, cab, hijos, campokey }) => {
  const { abrirModal } = useContext(ModalesContext);

  const e = cab.enlace
    ? cab.enlace_alias
      ? data[cab.enlace_alias]
        ? data[cab.enlace_alias]
        : cab.enlace
      : cab.enlace
    : "";

  const parametros_valores = cab.enlace_parametros_alias
    ? data[cab.enlace_parametros_alias]
      ? data[cab.enlace_parametros_alias]?.toString().split(",")
      : cab.enlace_parametros?.toString().split(",")
    : undefined;

  const en = cab.enlace_parametros_nombres_alias
    ? data[cab.enlace_parametros_nombres_alias]
      ? data[cab.enlace_parametros_nombres_alias]?.toString().split(",")
      : cab.enlace_parametros_nombres?.toString().split(",")
    : cab.enlace_parametros_nombres?.toString().split(",");

  const id_a = data[cab.enlace_id_a_alias]
    ? data[cab.enlace_id_a_alias]
    : cab.enlace_id_a
    ? cab.enlace_id_a
    : "";

  let parametros = "";
  let paramObj = {};
  if (parametros_valores && en) {
    parametros = "?";
    parametros_valores.forEach((qP, i) => {
      parametros = parametros.concat("&" + en[i] + "=" + qP);
      paramObj[en[i]] = qP;
    });
  }

  // if (cab.enlace_id_a) {
  //   return process.env.PUBLIC_URL + e + id_a + parametros;
  // }
  console.log("Enlace de Listado", cab.id_a);
  return (
    <div
      onClick={() => abrirModal("UN_MODAL", paramObj)}
      id="Listado_Switch_Enlace"
    >
      {cab.boton_texto_alias ? data[cab.boton_texto_alias] : cab.boton_texto}
    </div>
  );
  return (
    <div id="Listado_Switch_Enlace">
      <Link to={{ pathname: `${e + id_a}`, search: parametros }}>
        <div
          style={{
            textAlign: "center",
          }}
        >
          {cab.imagen_url ? (
            <img
              style={{ cursor: "pointer" }}
              height={"40px"}
              src={cab.imagen_url}
              alt="imagen"
            />
          ) : (
            <>
              {cab.boton_texto_alias
                ? data[cab.boton_texto_alias]
                : cab.boton_texto}
            </>
          )}

          {hijos}
        </div>
      </Link>
    </div>
  );
};

export default Enlace;
