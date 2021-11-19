import React from "react";

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

const initpermisos = [
  { nombre: "Usuarios", permiso: "usuarios" },
  { nombre: "Comunicados", permiso: "comunicados" },
  { nombre: "Denuncias", permiso: "denuncias" },
  { nombre: "Reporte de OOSS", permiso: "reporteooss" },
  { nombre: "Farmacias", permiso: "farmacias" },
  { nombre: "Packs de Productos", permiso: "packsdeproductos" },
  { nombre: "Banners", permiso: "banners" },
  { nombre: "Transfer", permiso: "transfer" },
];

export default function AsignarPermisos(props) {
  const { usuario, setUsuario } = props;

  const permisos = usuario.permisos;

  const handlePermitChange = (e) => {
    const value = e.target.name;

    if (permisos.includes(value)) {
      const newPermisos = permisos.filter((per) => per !== value);
      setUsuario(() => {
        return { ...usuario, permisos: newPermisos };
      });
      return;
    }
    const newPermisos = usuario.permisos.concat(value);
    setUsuario(() => {
      return { ...usuario, permisos: newPermisos };
    });
  };

  return (
    <Card>
      <CardHeader>Permisos</CardHeader>
      <div className="createuser_asignarPermisos">
        {initpermisos.map((permiso) => {
          return (
            <Checkbox
              key={permiso.permiso}
              label={permiso.nombre}
              checked={permisos?.includes(permiso.permiso)}
              onChange={handlePermitChange}
              name={permiso.permiso}
              className="permisoCheckbox"
            />
          );
        })}
      </div>
    </Card>
  );
}
