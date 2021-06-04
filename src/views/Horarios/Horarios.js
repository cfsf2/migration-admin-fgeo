import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Label,
} from "reactstrap";

import { UPDATE_FARMACIA } from "../../redux/actions/farmaciaActions";
import { connect } from "react-redux";
class Horarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmaciaProfile: null,
      //cambiar 'promociones' por 'horarios' cuando sea agregado en la api
      horarios: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.AddBloq2 = this.AddBloq2.bind(this);
    this.DelBloq2 = this.DelBloq2.bind(this);
  }

  componentDidMount() {
    if (this.props.authReducer.userprofile.horarios.length === 0) {
      console.log("horarios default");
      this.setState({
        //default
        horarios: [
          {
            dia: "Lunes",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
          {
            dia: "Martes",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
          {
            dia: "Miércoles",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
          {
            dia: "Jueves",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
          {
            dia: "Viernes",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
          {
            dia: "Sábado",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
          {
            dia: "Domingo",
            habilitado: true,
            bloques: [{ bloq: 1, desde: "00:00", hasta: "23:59" }],
          },
        ],
      });
    } else {
      console.log("horarios definidos");
      this.setState({
        horarios: this.props.authReducer.userprofile.horarios,
      });
    }
    this.setState({ farmaciaProfile: this.props.authReducer.userprofile });
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      horarios: this.state.horarios.map((p) => {
        return p.dia == name ? { ...p, habilitado: value } : p;
      }),
    });
  }
  AddBloq2(dia) {
    this.setState({
      horarios: this.state.horarios.map((p) => {
        return p.dia == dia
          ? {
              ...p,
              bloques: p.bloques.concat({
                bloq: 2,
                desde: "00:00",
                hasta: "23:59",
              }),
            }
          : p;
      }),
    });
  }
  DelBloq2(dia) {
    this.setState({
      horarios: this.state.horarios.map((p) => {
        return p.dia == dia
          ? {
              ...p,
              bloques: p.bloques.filter((x) => {
                return x.bloq != 2;
              }),
            }
          : p;
      }),
    });
  }

  async handleTime(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;

    const arr = name.split("-"); // lunes-desde-1
    const dia = arr[0]; // lunes, martes, mier...
    const bloque = arr[2]; // bloq 1 o 2
    const limite = arr[1]; // desde o hasta

    await this.setState({
      horarios: this.state.horarios.map((p) =>
        p.dia == dia
          ? {
              ...p,
              bloques: p.bloques.map((b) =>
                b.bloq == bloque ? { ...b, [limite]: value } : b
              ),
            }
          : p
      ),
    });
  }
  handleEditProfile() {
    this.props.UPDATE_FARMACIA({
      ...this.state.farmaciaProfile,
      horarios: this.state.horarios,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Horarios</b>
              </CardHeader>
              <CardBody>
                {this.state.horarios.map((p, index) => {
                  return (
                    <Fragment key={index}>
                      <Row style={{ marginTop: 10 }}>
                        <Col md="6" xs="12">
                          <Row>
                            <Col align="center" md="4" xs="12" className="my-3">
                              <Input
                                type="checkbox"
                                id={p.dia}
                                name={p.dia}
                                onChange={this.handleInputChange}
                                checked={p.habilitado}
                              />
                              <b>{p.dia.toUpperCase()}</b>
                            </Col>

                            <Col
                              align="center"
                              md="1"
                              xs="1"
                              className="my-3"
                            ></Col>

                            <Col
                              align="center"
                              md="6"
                              xs="10"
                              className="py-3 ml-3 bg-secondary"
                            >
                              <Row>
                                <Col>Bloque 1</Col>
                              </Row>
                              <Row>
                                <Col xs="6">
                                  <Label>
                                    <b>Desde</b>
                                  </Label>
                                  <Input
                                    type="time"
                                    name={p.dia + "-desde-1"}
                                    onChange={this.handleTime}
                                    value={p.bloques[0].desde}
                                  />
                                </Col>
                                <Col xs="6">
                                  <Label>
                                    <b>Hasta</b>
                                  </Label>
                                  <Input
                                    type="time"
                                    name={p.dia + "-hasta-1"}
                                    onChange={this.handleTime}
                                    value={p.bloques[0].hasta}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>

                        {p.bloques[1] == null ? (
                          <Col md="6" xs="12">
                            <Row>
                              <Col align="left" md="1" xs="1" className="my-4 ">
                                <Button
                                  className="btn-sm"
                                  onClick={() => this.AddBloq2(p.dia)}
                                >
                                  +
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        ) : (
                          <Col md="6" xs="12">
                            <Row>
                              <Col align="left" md="1" xs="1" className="my-4 ">
                                {p.bloques[1] == null ? (
                                  <Button
                                    className="btn-sm"
                                    onClick={() => this.AddBloq2(p.dia)}
                                  >
                                    +
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn-sm btn-danger"
                                    onClick={() => this.DelBloq2(p.dia)}
                                    style={{ marginTop: 25 }}
                                  >
                                    -
                                  </Button>
                                )}
                              </Col>

                              <Col
                                align="center"
                                md="6"
                                xs="10"
                                className="py-3 mt-1 ml-3 bg-secondary"
                              >
                                <Row>
                                  <Col>Bloque 2</Col>
                                </Row>
                                <Row>
                                  <Col xs="6">
                                    <Label>
                                      <b>Desde</b>
                                    </Label>
                                    <Input
                                      type="time"
                                      name={p.dia + "-desde-2"}
                                      value={p.bloques[1].desde}
                                      onChange={this.handleTime}
                                    />
                                  </Col>
                                  <Col xs="6">
                                    <Label>
                                      <b>Hasta</b>
                                    </Label>
                                    <Input
                                      type="time"
                                      name={p.dia + "-hasta-2"}
                                      value={p.bloques[1].hasta}
                                      onChange={this.handleTime}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        )}
                      </Row>
                      <hr />
                    </Fragment>
                  );
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              style={{
                float: "right",
                backgroundColor: "#00D579",
                color: "white",
              }}
              onClick={this.handleEditProfile}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = {
  UPDATE_FARMACIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(Horarios);
