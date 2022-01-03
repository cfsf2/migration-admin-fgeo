import React, { Component, Fragment } from "react";
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
import { connect } from "react-redux";
import {
  GET_FARMACIAS,
  CHEQUEAR_SI_EXISTE,
  ALTA_USUARIO_SUBMIT,
} from "../../redux/actions/FarmaciasAdminActions";
import store from "../../redux/store/index";
import { ALERT } from "../../redux/actions/alertActions";
// import ItemFarmacia from './components/ItemFarmacia';
import AsignarPermisos from "../Usuarios/component/AsignarPermisos";
import AsignarInstitucion from "./components/AsignarInstituciones";
import "./altafarmacia.scss";

class AltaFarmacia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmacia: {
        matricula: null,
        usuario: null,
        nombre: null,
        nombrefarmaceutico: null,
        habilitado: true,
        calle: null,
        numero: null,
        localidad: null,
        cp: null,
        provincia: null,
        telefono: null,
        cuit: null,
        cufe: null,
        email: null,
      },
      login: {
        username: null,
        password: null,
        roles: ["farmacia"],
      },
      permisos: [],
      perfil: "",
      instituciones: [],
      error: [],
    };
    this.handleInputChangefarmacia = this.handleInputChangefarmacia.bind(this);
    this.handleUsuario = this.handleUsuario.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleExistencias = this.handleExistencias.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleErrorChange = this.handleErrorChange.bind(this);
  }

  handleErrorChange(name, value) {
    if (value.trim() !== "") {
      const newErr = this.state.error.filter((err) => {
        return err !== name;
      });

      this.setState({
        error: newErr,
      });
      return;
    }
    const newErr = this.state.error.concat(name);
    this.setState({
      error: newErr,
    });
  }

  handleInputChangefarmacia(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      farmacia: { ...this.state.farmacia, [name]: value },
    });
    this.handleErrorChange(name, value);
  }
  handleUsuario(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toUpperCase();
    const name = target.name;
    this.setState({
      login: { ...this.state.login, username: value },
      farmacia: { ...this.state.farmacia, usuario: value },
    });
    this.handleErrorChange(name, value);
  }

  handlePassword(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      login: { ...this.state.login, password: value },
    });
    this.handleErrorChange(name, value);
  }
  handleExistencias() {
    this.props.CHEQUEAR_SI_EXISTE(this.state.farmacia.matricula);
  }
  handleSubmit() {
    this.handleValidation().then(() => {
      this.props.ALTA_USUARIO_SUBMIT(
        this.state.farmacia,
        this.state.login,
        this.props.history,
        this.state.permisos,
        this.state.perfil,
        this.state.instituciones
      );
    });
  }

  handleValidation() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.state.farmacia);
      const farmacia = this.state.farmacia;
      const instituciones = this.state.instituciones;
      const perfil = this.state.perfil;

      let errors = keys.filter((key) => {
        if (typeof farmacia[key] === "string") {
          if (farmacia[key] && farmacia[key].trim() !== "") {
            return;
          }
        }
        if (farmacia[key] && farmacia[key] !== "") {
          return;
        }
        return key;
      });
      if (this.state.instituciones.length === 0) {
        errors.push("Instituciones");
      }
      if (this.state.perfil.length === 0) {
        errors.push("Perfil");
      }
      if (this.state.login.password.trim() === "") {
        errors.push("password");
      }

      this.setState(
        {
          ...this.state,
          error: errors,
        },
        () => {
          if (errors.length !== 0) {
            reject(
              store.dispatch(
                ALERT("Todos los campos son obligatorios", "", "warning", "OK")
              )
            );
          }
          resolve();
        }
      );
    });
  }

  render() {
    const { yaExiste, msj } = this.props.farmaciasAdminReducer;
    return (
      <div>
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Nueva Farmacia</b>
              </CardHeader>
              <CardBody className="altafarmacia">
                <Row>
                  <Col md="4" xs="12">
                    <FormGroup>
                      <Label>Matrícula</Label>
                      <Input
                        type="text"
                        name="matricula"
                        onChange={this.handleInputChangefarmacia}
                        onBlur={this.handleExistencias}
                        value={this.state.farmacia.matricula}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" xs="12">
                    {yaExiste ? (
                      <p className="text-danger mt-4">{msj}</p>
                    ) : (
                      <p className="text-success mt-4">{msj}</p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Usuario</Label>
                      <Input
                        type="text"
                        name="usuario"
                        autoComplete="off"
                        onChange={this.handleUsuario}
                        value={this.state.farmacia.usuario}
                        invalid={this.state.error.includes("usuario")}
                        id={"Usuario"}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Contraseña</Label>
                      <Input
                        type="text"
                        name="password"
                        autoComplete="off"
                        onChange={this.handlePassword}
                        value={this.state.login.password}
                        invalid={this.state.error.includes("password")}
                        id="Contraseña"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Nombre Farmacia</Label>
                      <Input
                        type="text"
                        name="nombre"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.nombre}
                        invalid={this.state.error.includes("nombre")}
                        id="Nombre de Farmacia"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Nombre del Farmacéutico</Label>
                      <Input
                        type="text"
                        name="nombrefarmaceutico"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.nombrefarmaceutico}
                        invalid={this.state.error.includes(
                          "nombrefarmaceutico"
                        )}
                        id="Nombre de Farmaceutico"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label>Teléfono</Label>
                      <Input
                        type="text"
                        name="telefono"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.telefono}
                        invalid={this.state.error.includes("telefono")}
                        id="telefono"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label>Cuit</Label>
                      <Input
                        type="text"
                        name="cuit"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.cuit}
                        invalid={this.state.error.includes("cuit")}
                        id="C.U.I.T."
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label>Cod PAMI / C.U.F.E.</Label>
                      <Input
                        type="text"
                        name="cufe"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.cufe}
                        invalid={this.state.error.includes("cufe")}
                        id="C.U.F.E."
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label>Calle</Label>
                      <Input
                        type="text"
                        name="calle"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.calle}
                        invalid={this.state.error.includes("calle")}
                        id="Calle"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="2">
                    <FormGroup>
                      <Label>Número</Label>
                      <Input
                        type="text"
                        name="numero"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.numero}
                        invalid={this.state.error.includes("numero")}
                        id="Numero"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="3">
                    <FormGroup>
                      <Label>Localidad</Label>
                      <Input
                        type="text"
                        name="localidad"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.localidad}
                        invalid={this.state.error.includes("localidad")}
                        id="Localidad"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="3">
                    <FormGroup>
                      <Label>CP</Label>
                      <Input
                        type="text"
                        name="cp"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.cp}
                        invalid={this.state.error.includes("cp")}
                        id="Codigo Postal"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Provincia</Label>
                      <Input
                        type="text"
                        name="provincia"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.provincia}
                        invalid={this.state.error.includes("provincia")}
                        id="Provincia"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>@ Correo Electrónico </Label>
                      <Input
                        type="text"
                        name="email"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.email}
                        invalid={this.state.error.includes("email")}
                        id="Email"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6"></Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>Habilitado</Label>
                      <select
                        className="ml-2 mt-3"
                        value={this.state.farmacia.habilitado}
                        onChange={this.handleInputChangefarmacia}
                        name="habilitado"
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="asignar">
                  <AsignarInstitucion
                    obj={this.state}
                    setObj={this.setState.bind(this)}
                    invalid={this.state.error.includes("Instituciones")}
                  />
                  <AsignarPermisos
                    usuario={this.state}
                    setUsuario={this.setState.bind(this)}
                    tipo="farmacia"
                    invalid={this.state.error.includes("Perfil")}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Button
                        className="btn btn-success"
                        onClick={this.handleSubmit}
                        disabled={yaExiste}
                      >
                        Crear Farmacia
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    farmaciasAdminReducer: state.farmaciasAdminReducer,
  };
};
const mapDispatchToProps = {
  GET_FARMACIAS,
  CHEQUEAR_SI_EXISTE,
  ALTA_USUARIO_SUBMIT,
};

export default connect(mapStateToProps, mapDispatchToProps)(AltaFarmacia);
