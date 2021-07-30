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
// import ItemFarmacia from './components/ItemFarmacia';

class AltaFarmacia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      farmacia: {
        matricula: "",
        usuario: "",
        nombre: "",
        nombrefarmaceutico: "",
        habilitado: true,
        calle: "",
        numero: 0,
        localidad: "",
        cp: "",
        provincia: "",
        telefono: "",
        cuit: "",
        cufe: "",
        email: "",
      },
      login: {
        username: "",
        password: "",
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        roles: ["farmacia"],
      },
    };
    this.handleInputChangefarmacia = this.handleInputChangefarmacia.bind(this);
    this.handleUsuario = this.handleUsuario.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleExistencias = this.handleExistencias.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChangefarmacia(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      farmacia: { ...this.state.farmacia, [name]: value },
    });
  }
  handleUsuario(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toUpperCase();
    this.setState({
      login: { ...this.state.login, username: value },
      farmacia: { ...this.state.farmacia, usuario: value },
    });
  }
  handlePassword(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    this.setState({
      login: { ...this.state.login, password: value },
    });
  }
  handleExistencias() {
    this.props.CHEQUEAR_SI_EXISTE(this.state.farmacia.matricula);
  }
  handleSubmit() {
    this.props.ALTA_USUARIO_SUBMIT(
      this.state.farmacia,
      this.state.login,
      this.props.history
    );
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
              <CardBody>
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
                        onChange={this.handlePassword}
                        value={this.state.login.password}
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
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label>Cod PAMI</Label>
                      <Input
                        type="text"
                        name="cufe"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.cufe}
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
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label>@ Correo Electrónico </Label>
                      <Input
                        type="text"
                        name="email"
                        onChange={this.handleInputChangefarmacia}
                        value={this.state.farmacia.email}
                      />
                    </FormGroup>
                  </Col>
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
              </CardBody>
              <CardFooter>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      {yaExiste ? (
                        <Button className="btn btn-success" disabled>
                          Crear Farmacia
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-success"
                          onClick={this.handleSubmit}
                        >
                          Crear Farmacia
                        </Button>
                      )}
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
