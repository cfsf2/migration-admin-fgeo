import React, { useContext } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import { Link } from "react-router-dom";
import Default from "./Default";

const EnlaceOpcional = ({ data, cab, campokey, hijos, indiceData }) => {
  const { escupirModal } = useContext(FuncionesContext);
  if (!cab.enlace_id_a) {
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
        .map((alias) => data[alias]);
    }
    if (!cab.enlace_parametros_nombres_alias) {
      parametros_keys = cab.enlace_parametros_nombres.split(",");
    }
    if (cab.enlace_parametros_alias) {
      parametros_valores = cab.enlace_parametros_alias
        .split(",")
        .map((alias) => data[alias]);
    }
    if (!cab.enlace_parametros_alias) {
      parametros_valores = cab.enlace_parametros.split(",");
    }

    let parametros = "?";

    parametros_keys.forEach((key, i) => {
      parametros = parametros.concat(`&${key}=${parametros_valores[i]}`);
      paramObj[key] = parametros_valores[i];
    });

    return parametros;
  })();

  if (cab.target === "modal") {
    return (
      <div
        onClick={() => escupirModal(cab.enlace_id_a, paramObj)}
        id="Listado_Switch_Enlace" className="Listado_Switch_Enlace"
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
      </div>
    );
  }

  if (cab.target === "_blank") {
    return (
      <div id="Listado_Switch_Enlace" className="Listado_Switch_Enlace">
        <a
          target="_blank"
          href={
            process.env.PUBLIC_URL +
            "/#" +
            cab.enlace +
            cab.enlace_id_a +
            parametros
          }
          rel="noopener noreferrer"
        >
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
        </a>
      </div>
    );
  }

  const id = JSON.stringify(data) + JSON.stringify(cab) + indiceData;

  return (
    <div id={id} style={{ display: "flex", justifyContent: "center" }} className="Listado_Switch_Enlace">
      <div className="vista_dato">
        <Link
          to={{
            pathname: cab.enlace + cab.enlace_id_a,
            search: parametros,
          }}
        >
          {data[campokey]}
        </Link>
      </div>
    </div>
  );
};
export default EnlaceOpcional;
