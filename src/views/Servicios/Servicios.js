import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { farmageo_api } from "../../config";

import { UPDATE_FARMACIA } from "../../redux/actions/farmaciaActions";
import { connect } from "react-redux";
import axios from "axios";

import de_turno from "../../assets/images/icons/de_turno.png";
import injection from "../../assets/images/icons/injection.png";
import blood_pressure from "../../assets/images/icons/blood_pressure.png";
import punto_amarillo from "../../assets/images/icons/punto_amarillo.png";
import whatsapp from "../../assets/images/icons/004_whatsapp.png";
import farmacia_violeta from "../../assets/images/icons/farmacia_violeta.png";
import recetas_magistrales from "../../assets/images/icons/recetas_magistrales.png";
import covidtest from "../../assets/images/covidtest.png";
import vacuna from "../../assets/images/vacuna.jpg";
import panales_pami from "../../assets/images/panales_pami.png";
import corazon from "../../assets/images/corazon.jpg";

const imageImport = {
  de_turno,
  injection,
  blood_pressure,
  punto_amarillo,
  whatsapp,
  farmacia_violeta,
  recetas_magistrales,
  covidtest,
  vacuna,
  panales_pami,
  corazon,
};

class Servicios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmaciaProfile: null,
      servicios: [],
      serviciosList: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.checkServicios = this.checkServicios.bind(this);
  }

  async componentDidMount() {
    this.setState({
      farmaciaProfile:
        this.props.authReducer.userprofile ??
        JSON.parse(localStorage.getItem("userprofile")),
      servicios:
        this.props.authReducer.userprofile?.servicios ??
        JSON.parse(localStorage.getItem("userprofile")).servicios,
    });

    await axios
      .post(farmageo_api + "/farmacias/servicios/", {
        destino: "Es para el admin",
      })
      .then((r) => {
        this.setState({ serviciosList: r.data });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.farmaciaProfile?.__v !== this.props.authReducer.userprofile?.__v
    ) {
      this.setState({
        farmaciaProfile: JSON.parse(localStorage.getItem("userprofile")),
        servicios: JSON.parse(localStorage.getItem("userprofile")).servicios,
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
    for (var i = 0; i < this.state.servicios?.length; i++) {
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
                      {this.state?.serviciosList?.map((s) => {
                        return (
                          <Col
                            key={s.nombre_corto}
                            className="my-3"
                            xs="6"
                            md="3"
                          >
                            <div align="center">
                              <img
                                src={`${
                                  imageImport[
                                    s.url_img.split("/").pop().split(".")[0]
                                  ]
                                }`}
                                style={{ width: "50px" }}
                                alt={s.nombre}
                              />
                              <p style={{ marginTop: 10 }}>{s.nombre_corto}</p>
                              <input
                                type="checkbox"
                                id={s.nombre}
                                disabled={s.auto_asignable !== "s"}
                                name={s.nombre}
                                onChange={this.handleInputChange}
                                checked={this.checkServicios(s.nombre)}
                              />
                            </div>
                          </Col>
                        );
                      })}
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
