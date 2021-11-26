import React from "react";
import axios from "axios";
import { farmageo_api } from "../../../config";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  CardImg,
  CardFooter,
} from "reactstrap";
import Checkbox from "../../../components/CheckBox";
import { GET_PERFILES_ADMIN } from "../../../redux/actions/userActions";

const initpermisos = [
  { nombre: "Usuarios", permiso: "usuarios" },
  { nombre: "Comunicados", permiso: "comunicados" },
  { nombre: "Denuncias", permiso: "denuncias" },
  { nombre: "Reporte de OOSS", permiso: "reporteooss" },
  { nombre: "Farmacias", permiso: "farmacia" },
  { nombre: "Packs de Productos", permiso: "packsdeproductos" },
  { nombre: "Banners", permiso: "banners" },
  { nombre: "Transfer", permiso: "transfer" },
  { nombre: "Pedidos", permiso: "pedidos" },
];

export default function AsignarPermisos(props) {
  const { usuario, setUsuario, tipo } = props;
  const [perfiles, setPerfiles] = React.useState([]);
  const [descripcion, setDescripcion] = React.useState("");

  const permisos = usuario.permisos;

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
        perfil: "",
      };
    });
  }, [tipo]);

  return (
    <Card>
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
