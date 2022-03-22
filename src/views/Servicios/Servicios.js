import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import { UPDATE_FARMACIA } from "../../redux/actions/farmaciaActions";
import { connect } from "react-redux";

class Servicios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmaciaProfile: null,
      servicios: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.checkServicios = this.checkServicios.bind(this);
  }

  componentDidMount() {
    this.setState({
      farmaciaProfile: this.props.authReducer.userprofile,
      servicios: this.props.authReducer.userprofile?.servicios,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.farmaciaProfile?.__v !== this.props.authReducer.userprofile.__v
    ) {
      this.setState({
        farmaciaProfile: this.props.authReducer.userprofile,
        servicios: this.props.authReducer.userprofile?.servicios,
      });
    }
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (value) {
      await this.setState({
        servicios: this.state.servicios.concat({ tipo: name, dato: "" }),
      });
    } else {
      await this.setState({
        servicios: this.state.servicios.filter((s) => {
          return s.tipo !== name;
        }),
      });
    }
  }

  checkServicios(_tipo) {
    var found = false;
    for (var i = 0; i < this.state.servicios.length; i++) {
      if (this.state.servicios[i].tipo === _tipo) {
        found = true;
        break;
      }
    }
    return found;
  }

  async handleEditProfile() {
    try {
      await this.props.UPDATE_FARMACIA({
        ...this.state.farmaciaProfile,
        servicios: this.state.servicios,
      });
    } catch (err) {
      alert("error");
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Servicios</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <Row>
                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/vacuna.jpg")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>
                            Campaña Anti Gripal 2022
                          </p>
                          <input
                            type="checkbox"
                            id="campanaantigripal"
                            name="campanaantigripal"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("campanaantigripal")}
                          />
                        </div>
                      </Col>
                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/de_turno.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>De turno</p>
                          <input
                            type="checkbox"
                            id="deturno"
                            name="deturno"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("deturno")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/injection.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>Inyectables</p>
                          <input
                            type="checkbox"
                            id="inyectables"
                            name="inyectables"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("inyectables")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/blood-pressure.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>Toma de presión</p>
                          <input
                            type="checkbox"
                            id="presion"
                            name="presion"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("presion")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/punto-amarillo.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>Puntos Amarillos</p>
                          <input
                            type="checkbox"
                            id="amarillos"
                            name="amarillos"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("amarillos")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/004-whatsapp.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>WhatsApp</p>
                          <input
                            type="checkbox"
                            id="whatsapp"
                            name="whatsapp"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("whatsapp")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/farmacia-violeta.png")}
                            style={{ width: 90, marginTop: 10 }}
                          />
                          <p style={{ marginTop: 10 }}>Farmacia Violeta</p>
                          <input
                            type="checkbox"
                            id="violeta"
                            name="violeta"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("violeta")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/icons/recetas-magistrales.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>Recetas magistrales</p>
                          <input
                            type="checkbox"
                            id="recetas-magistrales"
                            name="recetas-magistrales"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("recetas-magistrales")}
                          />
                        </div>
                      </Col>

                      <Col className="my-3" xs="6" md="3">
                        <div align="center">
                          <img
                            src={require("../../assets/images/covidtest.png")}
                            style={{ width: 50 }}
                          />
                          <p style={{ marginTop: 10 }}>Test de Covid</p>
                          <input
                            type="checkbox"
                            id="testcovid"
                            name="testcovid"
                            onChange={this.handleInputChange}
                            checked={this.checkServicios("testcovid")}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="mb-3 mr-5"
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

export default connect(mapStateToProps, mapDispatchToProps)(Servicios);
