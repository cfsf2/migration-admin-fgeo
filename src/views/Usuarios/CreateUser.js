import React from "react";
import "./createUser.scss";
import { CREATE_USER } from "../../redux/actions/userActions";

import CheckBox from "../../components/CheckBox";
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

const initUsuario = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  confirmpassword: "",
  roles: [],
};

export default function CreateUser() {
  const [nuevoUsuario, setNuevoUsuario] = React.useState(initUsuario);
  const [errors, setErrors] = React.useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;

    setNuevoUsuario(() => {
      return { ...nuevoUsuario, [field]: value };
    });

    if (e.target.value.length !== 0) {
      if (field === "password" || field === "confirmpassword") {
        if (
          nuevoUsuario.password.trim() === nuevoUsuario.confirmpassword.trim()
        ) {
          let error = errors.filter((thisfield) => thisfield !== "password");

          setErrors(() => {
            return error;
          });

          return;
        } else {
          const passerror = errors.concat("password");
          setErrors(() => passerror);
        }
        return;
      }
      setErrors(() => {
        return errors.filter((thisfield) => thisfield !== field);
      });
    }
  };

  const handleRoleChange = (e) => {
    const checked = e.target.checked;
    const newrole = e.target.name;
    let newRoles = nuevoUsuario.roles;

    if (!checked) {
      newRoles = nuevoUsuario.roles.filter((role) => role !== newrole);
    } else {
      if (nuevoUsuario.roles.length > 0) {
        alert("Solo puede tener un rol");
        e.target.checked = false;
        return;
      }
      newRoles = nuevoUsuario.roles.concat(newrole);
    }
    setNuevoUsuario({ ...nuevoUsuario, roles: newRoles });
  };

  const handleValidation = () => {
    let fielderrors = [];
    const fields = Object.keys(nuevoUsuario);

    fields.forEach((field) => {
      if (nuevoUsuario[field].length === 0) {
        fielderrors = fielderrors.concat(field);
      }
    });

    if (nuevoUsuario.password !== nuevoUsuario.confirmpassword) {
      fielderrors = fielderrors.concat("password");
    }

    if (nuevoUsuario.roles.length === 0) {
      fielderrors = fielderrors.concat("roles");
    }
    setErrors(() => fielderrors);

    return fielderrors.length === 0;
  };

  const handleSubmit = (e) => {
    if (handleValidation()) {
      CREATE_USER(nuevoUsuario).then((data) => {
        if (data.type === "success") {
          alert(data.msg);
          setNuevoUsuario(initUsuario);
        }
        if (data.type === "fail") {
          alert(data.msg);
        }
      });

      return;
    }
    alert(`Todos los campos son obligatorios`);
  };

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
                      <Label>Nombre</Label>
                      <Input
                        type="text"
                        name="first_name"
                        onChange={(e) => handleChange(e)}
                        value={nuevoUsuario.first_name}
                        className={`${
                          errors.includes("first_name")
                            ? "createuser_errorField"
                            : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Apellido</Label>
                      <Input
                        type="text"
                        name="last_name"
                        onChange={(e) => handleChange(e)}
                        value={nuevoUsuario.last_name}
                        className={`${
                          errors.includes("last_name")
                            ? "createuser_errorField"
                            : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Nombre de Usuario</Label>
                      <Input
                        type="text"
                        name="username"
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        value={nuevoUsuario.username}
                        className={`${
                          errors.includes("username")
                            ? "createuser_errorField"
                            : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Contraseña</Label>
                      <Input
                        type="password"
                        name="password"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={nuevoUsuario.password}
                        className={`${
                          errors.includes("password")
                            ? "createuser_errorField"
                            : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6"></Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Confirmar Contraseña</Label>
                      <Input
                        type="password"
                        name="confirmpassword"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={nuevoUsuario.confirmpassword}
                        className={`${
                          errors.includes("password")
                            ? "createuser_errorField"
                            : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <CardHeader className="createuser_titulo">
                  Roles de Usuario
                </CardHeader>

                <Row>
                  <div className="createuser_roles">
                    <FormGroup check inline>
                      <Col>
                        <CheckBox
                          label="Administrador"
                          checked={nuevoUsuario.roles.includes("admin")}
                          onChange={(e) => handleRoleChange(e)}
                          name="admin"
                        />
                      </Col>
                    </FormGroup>
                    {/* <FormGroup check inline>
                      <Col>
                        <Input
                          type="checkbox"
                          name="farmacia"
                          onChange={(e) => handleRoleChange(e)}
                        />
                        <Label>Farmacia</Label>
                      </Col>
                    </FormGroup> */}

                    <FormGroup check inline>
                      <Col>
                        <CheckBox
                          label="Demo Laboratorio"
                          checked={nuevoUsuario.roles.includes("demoLab")}
                          onChange={(e) => handleRoleChange(e)}
                          name="demoLab"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup check inline>
                      <Col>
                        <CheckBox
                          label="Demo Farmacia"
                          checked={nuevoUsuario.roles.includes("demofarm")}
                          onChange={(e) => handleRoleChange(e)}
                          name="demofarm"
                        />
                      </Col>
                    </FormGroup>
                  </div>
                </Row>

                <Row>
                  <Col xs="12" md="6"></Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Habilitado</Label>
                      <select
                        className="ml-2 mt-3"
                        //  value={this.state.farmacia.habilitado}
                        // onChange={this.handleInputChangefarmacia}
                        name="habilitado"
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Button
                        className="btn btn-success"
                        onClick={() => handleSubmit()}
                      >
                        Crear
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
