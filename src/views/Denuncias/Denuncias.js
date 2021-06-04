import React, { Component } from "react";
import {
  //Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  //FormGroup,
  Input,
  //Label,
  //CardFooter,
  //CardImg
} from "reactstrap";

import { connect } from "react-redux";
import { GET_ALL_DENUNCIAS } from "../../redux/actions/denunciasActions";
class Denuncias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.props.GET_ALL_DENUNCIAS();
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toLowerCase();
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    const { lista_denuncias } = this.props.denunciasReducer;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Denuncias</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="12">
                    <Input
                      type="text"
                      placeholder="buscar denunciado..."
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
                        <th>Denunciado</th>
                        <th>Motivo</th>
                        <th>¿Quién denuncia?</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lista_denuncias.length === 0
                        ? null
                        : lista_denuncias.map((d, index) => {
                            return d.nombre_denunciado
                              .toLowerCase()
                              .includes(this.state.filtro) ? (
                              <tr key={index}>
                                <td>
                                  {d.tipodenuncia === "farmacia-usuario"
                                    ? ""
                                    : "Farmacia "}
                                  <b>{d.nombre_denunciado}</b>
                                </td>
                                <td>{d.motivo}</td>
                                <td>{d.username_denunciante}</td>
                                <td>{d.fecha.substring(0, 10)}</td>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    denunciasReducer: state.denunciasReducer,
  };
};
const mapDispatchToProps = {
  GET_ALL_DENUNCIAS,
};

export default connect(mapStateToProps, mapDispatchToProps)(Denuncias);
