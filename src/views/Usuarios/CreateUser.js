import React from "react";
import "./createUser.scss";
import { CREATE_USER } from "../../redux/actions/userActions";
import { GET_FARMACIA_POR_MATRICULA } from "../../redux/actions/farmaciaActions";
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
  farmaciaId: "",
};

export default function CreateUser() {
  const [nuevoUsuario, setNuevoUsuario] = React.useState(initUsuario);
  const [farmaciaPorMatricula, setFarmaciaPorMatricula] = React.useState({});
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
    const value = e.target.value;
    const field = e.target.name;
    let newRoles = [e.target.value];

    setErrors(() => {
      return errors.filter((thisfield) => thisfield !== field);
    });

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

  React.useEffect(() => {
    const farm = GET_FARMACIA_POR_MATRICULA(nuevoUsuario.farmaciaId).then(
      (res) => {
        setFarmaciaPorMatricula(() => res.data);
      }
    );
    return;
  }, [nuevoUsuario.farmaciaId]);

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
                    >
                      <option value="" defaultValue selected disabled>
                        -----Seleccione un rol-----
                      </option>
                      <option value="admin">Administrador</option>
                      <option value="farmacia">Farmacia</option>
                      <option disabled>Demo Farmacia</option>
                      <option disabled>Demo Laboratorio</option>
                    </Input>
                  </Col>
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

                <Row>
                  <Col xs="6" md="3">
                    <FormGroup>
                      <Label>Matricula de Farmacia</Label>
                      <Input
                        type="number"
                        name="farmaciaId"
                        autoComplete="off"
                        onChange={handleChange}
                        // onChange={(e) => setMatricula(e.target.value)}
                        value={nuevoUsuario.farmaciaId}
                        className={`${
                          errors.includes("farmaciaId")
                            ? "createuser_errorField"
                            : ""
                        }`}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6" md="3">
                    <Label>Nombre de la Farmacia</Label>
                    <div className="createuser_farmacia">
                      {farmaciaPorMatricula.nombre}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" md="3">
                    {farmaciaPorMatricula
                      ? farmaciaPorMatricula.calle +
                        " " +
                        farmaciaPorMatricula.numero
                      : null}
                  </Col>
                  <Col xs="6" md="3">
                    {farmaciaPorMatricula.cuit}
                  </Col>
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
