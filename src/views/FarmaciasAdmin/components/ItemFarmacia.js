import React, { Component, Fragment } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { UPDATE_FARMACIA_ADMIN } from "../../../redux/actions/FarmaciasAdminActions";

const getClassPerfil = (perfil) => {
  if (perfil) {
    switch (perfil) {
      case "vender_online":
        return "bg-success";
      case "solo_visible":
        return "bg-warning";
      case "no_visible":
        return "bg-danger";
      default:
        return "";
    }
  } else {
    return "";
  }
};

class ItemFarmacia extends Component {
  constructor(props) {
    super(props);
    this.state = { password: null };
    this.getPassword = this.getPassword.bind(this);
    this.handleHabilitado = this.handleHabilitado.bind(this);
    this.handleDescubrir = this.handleDescubrir.bind(this);
  }

  getPassword() {
    var usuario = this.props.farmacia.usuario;
    var pass = this.props.farmaciasAdminReducer.passwordsFarmacias.filter(
      (p) => {
        return p.usuario === usuario;
      }
    );

    if (pass.length > 0) {
      this.setState({
        password: pass[0].password,
      });
    }
  }

  handleHabilitado(farmacia, value) {
    var _farmacia = { ...farmacia, habilitado: value };
    this.props.UPDATE_FARMACIA_ADMIN(_farmacia);
  }

  handleDescubrir(farmacia, value) {
    var _farmacia = { ...farmacia, descubrir: value };
    this.props.UPDATE_FARMACIA_ADMIN(_farmacia);
  }

  render() {
    const { farmacia, contador } = this.props;
    return (
      <tr>
        <td>{contador}</td>
        <td>{farmacia.farmaciaid}</td>
        <td>{farmacia.nombre}</td>
        <td className={getClassPerfil(farmacia.perfil_farmageo)} align="center">
          {farmacia.perfil_farmageo}
        </td>
        <td>{farmacia.usuario}</td>
        <td>
          {this.state.password === null ? (
            <Button onClick={this.getPassword}>Ver Password</Button>
          ) : (
            this.state.password
          )}
        </td>
        <td>
          {farmacia.ultimoacceso ? farmacia.ultimoacceso.substring(0, 10) : ""}
        </td>
        <td>
          <Button
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
            onClick={() => this.props.handleVer(farmacia)}
          >
            Ver
          </Button>
        </td>
        <td>
          {farmacia.habilitado ? (
            <p className="text-success">Habilitado</p>
          ) : (
            <p className="text-danger">Suspendido</p>
          )}
        </td>
        <td>
          {farmacia.habilitado ? (
            <Button
              onClick={() => this.handleHabilitado(farmacia, false)}
              className="btn btn-sm btn-danger"
            >
              Bloquear
            </Button>
          ) : (
            <Button
              onClick={() => this.handleHabilitado(farmacia, true)}
              className="btn btn-sm btn-warning"
            >
              Habilitar
            </Button>
          )}
        </td>
        <td>
          {farmacia.descubrir ? (
            <Button
              onClick={() => this.handleDescubrir(farmacia, false)}
              className="btn btn-sm btn-warning"
            >
              Desactivar
            </Button>
          ) : (
            <Button
              onClick={() => this.handleDescubrir(farmacia, true)}
              className="btn btn-sm btn-info"
              title="Activar para que se muestre en el home como farmacia a descubrir"
            >
              Activar
            </Button>
          )}
        </td>
      </tr>
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
  UPDATE_FARMACIA_ADMIN,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemFarmacia);
