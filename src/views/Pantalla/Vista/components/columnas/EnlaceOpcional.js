import React, { useContext } from "react";
import FuncionesContext from "../../../context/FuncionesContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Default from "./Default";

const EnlaceOpcional = ({
  data,
  cab,
  id,
  campokey,
  hijos,
  id_elemento,
  qsBody,
}) => {
  const { escupirModal } = useContext(FuncionesContext);
  const enlace_id_a = data[cab.id_a + "_enlace_id_a"] ?? cab.enlace_id_a;
  if (!enlace_id_a) {
    return (
      <Default
        key={cab.id_a}
        data={data}
        cab={cab}
        hijos={hijos}
        campokey={campokey}
      />
    );
  }

  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();
  let paramObj = {};
  const parametros = (() => {
    let parametros_keys = [];
    let parametros_valores = [];

    if (cab.enlace_parametros_nombres_alias) {
      parametros_keys = cab.enlace_parametros_nombres_alias
        .split(",")
        .map((alias) => data[alias])
        .filter((e) => e);
    }
    if (!cab.enlace_parametros_nombres_alias) {
      parametros_keys = cab.enlace_parametros_nombres
        ?.split(",")
        .filter((e) => e);
    }
    if (cab.enlace_parametros_alias) {
      parametros_valores = cab.enlace_parametros_alias
        .split(",")
        .map((alias) => data[alias])
        .filter((e) => e);
    }
    if (!cab.enlace_parametros_alias) {
      parametros_valores = cab.enlace_parametros?.split(",").filter((e) => e);
    }

    let parametros = "?";

    // eslint-disable-next-line no-unused-expressions
    parametros_keys?.forEach((key, i) => {
      if (parametros_valores[i]) {
        parametros = parametros.concat(`&${key}=${parametros_valores[i]}`);
        paramObj[key] = parametros_valores[i];
      }
    });
    return parametros;
  })();

  if (cab.target === "modal") {
    return (
      <div
        onClick={() =>
          escupirModal(
            enlace_id_a,
            paramObj,
            { min_width_modal: cab.min_width_modal },
            qsBody
          )
        }
        className={cab.className}
        id={id_elemento}
        title={cab.tooltip_texto}
        style={{ display: "flex" }}
      >
        {nombre ? (
          <div className="vista_label" style={{ fontWeight: "bold" }}>
            {nombre}:{" "}
          </div>
        ) : (
          <></>
        )}
        <div>
          <ContenidoDeEnlace
            texto={
              data[campokey] ?? data[cab.boton_texto_alias] ?? cab.boton_texto
            }
            imagen={cab.imagen_url}
          />
        </div>
      </div>
    );
  }

  if (cab.target === "_blank") {
    return (
      <div
        id={id_elemento}
        className={cab.className}
        style={{ display: "flex" }}
        title={data[cab.id_a + "_tooltip_texto"] ?? cab.tooltip_texto}
      >
        {" "}
        {nombre ? (
          <div className="vista_label" style={{ fontWeight: "bold" }}>
            {nombre}:{" "}
          </div>
        ) : (
          <></>
        )}
        <a
          target="_blank"
          href={
            process.env.PUBLIC_URL +
            "/#" +
            cab.enlace +
            enlace_id_a +
            parametros
          }
          rel="noopener noreferrer"
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <ContenidoDeEnlace
              texto={
                data[campokey] ?? data[cab.boton_texto_alias] ?? cab.boton_texto
              }
              imagen={cab.imagen_url}
            />
            {hijos}
          </div>
        </a>
      </div>
    );
  }

  return (
    <div id={id_elemento} style={{ display: "flex" }} title={cab.tooltip_texto}>
      {nombre ? (
        <div className="vista_label" style={{ fontWeight: "bold" }}>
          {nombre}:{" "}
        </div>
      ) : (
        <></>
      )}
      <div className="vista_dato">
        <Link
          to={{
            pathname: cab.enlace + enlace_id_a,
            search: parametros,
          }}
        >
          <ContenidoDeEnlace
            texto={
              data[campokey] ?? data[cab.boton_texto_alias] ?? cab.boton_texto
            }
            imagen={cab.imagen_url}
          />
        </Link>
      </div>
    </div>
  );
};
export default EnlaceOpcional;

function ContenidoDeEnlace({ texto, imagen }) {
  if (imagen && imagen !== "") {
    switch (imagen.toLowerCase()) {
      case "historial":
        return <FontAwesomeIcon icon={faBook} />;

      default:
        return (
          <img
            style={{ cursor: "pointer" }}
            height={"40px"}
            src={imagen}
            alt="imagen"
          />
        );
    }
  }

  if (texto && texto !== "") {
    return texto;
  }
  return <></>;
}
