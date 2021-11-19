import React from "react";
import {
  GET_USER,
  UPDATE_PASSWORD,
  UPDATE_USER,
} from "../../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import { GET_FARMACIA_POR_MATRICULA } from "../../redux/actions/farmaciaActions";
import { CambiarPassword } from "./component/CambiarPassword";
import AsignarPermisos from "./component/AsignarPermisos";
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

import Checkbox from "../../components/CheckBox";
import "./createUser.scss";

export default function EditUser(props) {
  const search = useLocation().search;
  const username = new URLSearchParams(search).get("username");

  const [editableUser, setEditableUser] = React.useState({});
  const [changePass, setChangePass] = React.useState(false);
  const [newPass, setNewPass] = React.useState("");
  const [hasChanged, setHasChanged] = React.useState(false);

  const [cambios, setCambios] = React.useState({});
  const [farmaciaPorMatricula, setFarmaciaPorMatricula] = React.useState({});
  const [errors, setErrors] = React.useState([]);

  const handleChange = (e) => {
    let value;
    value = e.target.value;
    // select devuelve solo string
    if (e.target.value === "true") {
      value = true;
    }
    if (e.target.value === "false") {
      value = false;
    }
    const field = e.target.name;

    setCambios(() => {
      return { ...cambios, [field]: value };
    });

    if (e.target.value.length !== 0) {
      setErrors(() => {
        return errors.filter((thisfield) => thisfield !== field);
      });
    }
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;

    if (value === "admin") {
      setCambios({ ...cambios, admin: true, esfarmacia: false });
    }
    if (value === "farmacia") {
      setCambios({ ...cambios, admin: false, esfarmacia: true, permisos: [] });
    }
    if (value === "cliente") {
      setCambios({ ...cambios, admin: false, esfarmacia: false, permisos: [] });
    }

    setErrors(() => {
      return errors.filter((thisfield) => thisfield !== field);
    });
  };

  const mandatoryFields = ["name", "usuario", "email", "id_wp"];

  const handleValidation = () => {
    let fielderrors = errors;

    mandatoryFields.forEach((field) => {
      if (!cambios[field] || cambios[field]?.length === 0) {
        fielderrors = fielderrors.concat(field);
      }
    });

    if (cambios.admin === false && cambios.esfarmacia === false) {
      fielderrors = fielderrors.concat("roles");
    }

    if (cambios.admin === true) {
      fielderrors = fielderrors.filter((f) => f !== "id_wp");
      fielderrors = fielderrors.filter((f) => f !== "roles");
      if (cambios.permisos.length < 2) {
        fielderrors = fielderrors.concat("permisos");
      } else {
        fielderrors = fielderrors.filter((f) => f !== "permisos");
      }
    }
    if (cambios.esfarmacia === true) {
      fielderrors = fielderrors.filter((f) => f !== "roles");
      if (!farmaciaPorMatricula) {
        fielderrors = fielderrors.concat("id_wp");
      }
    }

    setErrors(fielderrors);

    return fielderrors.length === 0;
  };

  const handleSubmit = (e) => {
    if (handleValidation()) {
      if (changePass) {
        UPDATE_PASSWORD(newPass, editableUser._id);
      }
      UPDATE_USER(cambios, editableUser._id).then(() => {
        props.history.push("/usuarios");
      });
      return;
    }
    alert(`Todos los campos son obligatorios`);
  };

  React.useEffect(() => {
    GET_USER(username).then((res) => {
      setEditableUser(() => res);
      setCambios(() => res);
    });
    return;
  }, [username]);

  React.useEffect(() => {
    const farm = GET_FARMACIA_POR_MATRICULA(cambios.id_wp).then((res) => {
      setFarmaciaPorMatricula(() => res.data);
    });
    return;
  }, [cambios.id_wp]);

  React.useEffect(() => {
    setHasChanged(false);
    if (cambios !== editableUser || changePass === true) {
      setHasChanged(true);
      return;
    }
  }, [cambios, hasChanged, changePass]);

  return (
    <div className="animated fadeIn">
      <div className="createuser_container">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader className="createuser_titulo">
                <b>Nuevo Usuario</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Nombre y Apellido</Label>
                      <Input
                        type="text"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        value={cambios.name}
                        className={`${
                          errors.includes("name") ? "createuser_errorField" : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Nombre de Usuario</Label>
                      <Input
                        type="text"
                        name="usuario"
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        className={`${
                          errors.includes("usuario")
                            ? "createuser_errorField"
                            : ""
                        }`}
                        value={cambios.usuario}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="text"
                        name="email"
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        className={`${
                          errors.includes("email")
                            ? "createuser_errorField"
                            : ""
                        }`}
                        value={cambios.email}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="12" md="6">
                    <Label for="exampleSelect">
                      <b>Rol de Usuario</b>
                    </Label>
                    <Input
                      onChange={(e) => handleRoleChange(e)}
                      type="select"
                      name="roles"
                      className={`${
                        errors.includes("roles") ? "createuser_errorField" : ""
                      }`}
                      value={
                        cambios.admin
                          ? "admin"
                          : cambios.esfarmacia
                          ? "farmacia"
                          : "cliente"
                      }
                    >
                      <option value="" disabled>
                        -----Seleccione un rol-----
                      </option>
                      <option value="admin">Administrador</option>
                      <option value="farmacia">Farmacia</option>
                      <option value="cliente">Cliente</option>
                      <option disabled>Demo Farmacia</option>
                      <option disabled>Demo Laboratorio</option>
                    </Input>
                  </Col>
                </Row>
                {cambios.esfarmacia ? (
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Matricula</Label>
                        <Input
                          type="number"
                          name="id_wp"
                          autoComplete="off"
                          onChange={handleChange}
                          // onChange={(e) => setMatricula(e.target.value)}
                          value={cambios.id_wp}
                          className={`${
                            errors.includes("id_wp")
                              ? "createuser_errorField"
                              : ""
                          }`}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <Label>Nombre de la Farmacia</Label>
                      <div className="createuser_farmacia">
                        {farmaciaPorMatricula.nombre}
                      </div>
                    </Col>
                    <Col xs="6" md="3">
                      <Label>Direccion</Label>
                      <div>
                        {farmaciaPorMatricula
                          ? farmaciaPorMatricula.calle +
                            " " +
                            farmaciaPorMatricula.numero
                          : null}
                      </div>
                    </Col>
                    <Col xs="6" md="3">
                      <Label>CUIT</Label>
                      <div>{farmaciaPorMatricula.cuit}</div>
                    </Col>
                  </Row>
                ) : null}

                <Row xs="12">
                  <Col>
                    <FormGroup>
                      <Label>Habilitado</Label>
                      <select
                        className="ml-2 mt-3"
                        onChange={handleChange}
                        name="habilitado"
                        value={cambios.habilitado}
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Suscrito al NewsLetter</Label>
                      <select
                        className="ml-2 mt-3"
                        onChange={handleChange}
                        name="newsletter"
                        value={cambios.newsletter}
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col className="centerContent">
                    <Checkbox
                      name="deleted"
                      label="Eliminado"
                      onChange={() =>
                        setCambios(() => {
                          return {
                            ...cambios,
                            deleted: !cambios.deleted,
                          };
                        })
                      }
                      checked={cambios.deleted}
                    />
                  </Col>
                  <Col className="centerContent">
                    <Checkbox
                      name="confirmado"
                      label="Confirmado"
                      onChange={() =>
                        setCambios(() => {
                          return {
                            ...cambios,
                            confirmado: !cambios.confirmado,
                          };
                        })
                      }
                      checked={cambios.confirmado}
                    />
                  </Col>
                </Row>
                {cambios.admin ? (
                  <div
                    className={`${
                      errors.includes("permisos") ? "createuser_errorField" : ""
                    }`}
                  >
                    <AsignarPermisos
                      usuario={cambios}
                      setUsuario={setCambios}
                    />
                    {errors.includes("permisos") ? (
                      <div style={{ color: "red", textAlign: "right" }}>
                        Debe elegir al menos un permiso
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <Row xs="1" md="1">
                  <CambiarPassword
                    handleChange={handleChange}
                    errors={errors}
                    setErrors={setErrors}
                    newPass={newPass}
                    setNewPass={setNewPass}
                    allowChange={changePass}
                    setAllowChange={setChangePass}
                  />
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Button
                        className="btn btn-success"
                        onClick={() => handleSubmit()}
                        disabled={!hasChanged}
                      >
                        Guardar Cambios
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
