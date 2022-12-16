import React from "react";
import { Link } from "react-router-dom";
import Default from "./Default";

const EnlaceOpcional = ({ data, cab, id, campokey, hijos }) => {
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
    });

    return parametros;
  })();
  console.log(cab.id_a);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
