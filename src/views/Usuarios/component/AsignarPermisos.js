import React from "react";
import axios from "axios";
import { farmageo_api } from "../../../config";

import { Card, CardHeader, Input, Label } from "reactstrap";
import "../createUser.scss";

export default function AsignarPermisos(props) {
  const { usuario, setUsuario, tipo, invalid, error } = props;
  const [perfiles, setPerfiles] = React.useState([]);
  const [descripcion, setDescripcion] = React.useState("");

  const handlePermitChange = (e) => {
    const value = e.target.value;

    const perfil = perfiles.filter((perf) => perf._id === value)[0];
    setDescripcion(perfil.descripcion);
    const componentes = new Set();
    componentes.add("inicio");
    perfil.permisos.forEach((permiso) => {
      componentes.add(permiso.tipo);
    });
    setUsuario(() => {
      return {
        ...usuario,
        permisos: Array.from(componentes),
        perfil: perfil._id,
      };
    });
  };

  React.useEffect(() => {
    if (!usuario.permisos.includes("inicio")) {
      setUsuario(() => {
        return {
          ...usuario,
          permisos: usuario.permisos.concat("inicio"),
        };
      });
    }
    axios({
      method: "get",
      url: farmageo_api + "/permisos/perfiles",
      headers: { "Content-Type": "application/json" },
      params: {
        tipo,
      },
    }).then((res) => {
      setPerfiles(res.data);
      setDescripcion("");
    });
    setUsuario(() => {
      return {
        ...usuario,
        perfil: usuario.perfil ? usuario.perfil : "",
      };
    });
  }, [tipo]);

  return (
    <Card
      className={` ${
        usuario.perfil.length === 0 && (invalid || error)
          ? "createuser_error"
          : null
      }`}
    >
      <CardHeader>Permisos</CardHeader>
      <div className="createuser_asignarPermisos">
        <Label>Perfil de Usuario</Label>
        <Input
          onChange={handlePermitChange}
          type="select"
          name="perfil"
          value={usuario.perfil}
        >
          <option disabled defaultValue selected value={""}>
            ---Seleccione un Perfil----
          </option>
          {perfiles.map((perfil) => {
            return (
              <option key={perfil._id} value={perfil._id}>
                {perfil.nombre}
              </option>
            );
          })}
        </Input>
        <p>{descripcion}</p>
      </div>
    </Card>
  );
}
