import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  // FormGroup,
  Input,
  // Label,
  // CardFooter,
  // CardImg
} from "reactstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  GET_USUARIOS_APP,
  SET_HABILITADO_USUARIO,
} from "../../redux/actions/FarmaciasAdminActions";
import { DELETE_USUARIO, GET_USUARIOS } from "../../redux/actions/userActions";

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro: "",
      usuario: { nombre: "usuario..." },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleNombreUsuario = this.handleNombreUsuario.bind(this);
    this.handleHabilitado = this.handleHabilitado.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(user) {
    this.props.DELETE_USUARIO(user);
  }

  async componentDidMount() {
    await this.props.GET_USUARIOS();
    const { usuarios } = this.props.userReducer;
    // console.log(usuarios);
  }

  handleHabilitado(usuario, value) {
    var _usuario = { ...usuario, habilitado: value };
    //console.log(_usuario)
    this.props.SET_HABILITADO_USUARIO(_usuario);
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toLowerCase();
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    const { usuarios } = this.props.userReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de usuarios</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4">
                        <Input
                          type="text"
                          placeholder="buscar usuario..."
                          name="filtro"
                          onChange={this.handleInputChange}
                          value={this.state.filtro}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>#</th>
                            <th>Usuario</th>
                            <th>Último acceso</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                            <th>Recuperar password</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios === null
                            ? null
                            : usuarios.map((u, index) => {
                                return u.usuario
                                  .toLowerCase()
                                  .includes(this.state.filtro) ? (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{u.usuario}</td>
                                    <td>
                                      {u.ultimoacceso != null
                                        ? u.ultimoacceso.substring(0, 10)
                                        : ""}
                                    </td>
                                    <td>
                                      {u.habilitado ? (
                                        <p className="text-success">
                                          Habilitado
                                        </p>
                                      ) : (
                                        <p className="text-danger">
                                          Suspendido
                                        </p>
                                      )}
                                    </td>
                                    <td>
                                      {u.habilitado ? (
                                        <Button
                                          onClick={() =>
                                            this.handleHabilitado(u, false)
                                          }
                                          className="btn btn-sm btn-danger"
                                        >
                                          Bloquear
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={() =>
                                            this.handleHabilitado(u, true)
                                          }
                                          className="btn btn-sm btn-warning"
                                        >
                                          Habilitar
                                        </Button>
                                      )}
                                    </td>
                                    <td>
                                      {u.password === null ||
                                      u.password === undefined ||
                                      u.password == "" ? (
                                        <p className="text-danger mt-1">
                                          Pendiente
                                        </p>
                                      ) : (
                                        <p className="text-success mt-1">
                                          Disponible
                                        </p>
                                      )}
                                    </td>
                                    <td>
                                      <Link
                                        to={{
                                          pathname: `/EditUser`,
                                          search: `username=${u.usuario}`,
                                        }}
                                      >
                                        <Button color="primary">Edit</Button>
                                      </Link>
                                    </td>
                                    <td>
                                      <Button
                                        color="danger"
                                        onClick={() => this.handleDelete(u)}
                                      >
                                        Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ) : null;
                              })}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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
    userReducer: state.userReducer,
  };
};
const mapDispatchToProps = {
  GET_USUARIOS,
  SET_HABILITADO_USUARIO,
  DELETE_USUARIO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
