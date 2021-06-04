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
  GET_PASSWORDS_FARMACIAS,
} from "../../redux/actions/FarmaciasAdminActions";
import ItemFarmacia from "./components/ItemFarmacia";

import { image_path_server } from "../../config";
import FlatList, { PlainList } from "flatlist-react";

class FarmaciasAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro: "",
      farmacia: {
        nombre: "farmacia...",
        fechaalta: "",
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNombreFarmacia = this.handleNombreFarmacia.bind(this);
    this.renderFarmacia = this.renderFarmacia.bind(this);
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toUpperCase();
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleNombreFarmacia(_farmacia) {
    this.setState({ farmacia: _farmacia });
  }

  async componentDidMount() {
    await this.props.GET_PASSWORDS_FARMACIAS();
    this.props.GET_FARMACIAS();
  }

  renderFarmacia = (farmacia, idx) => {
    return farmacia.nombre.toUpperCase().includes(this.state.filtro) ? (
      <ItemFarmacia
        key={idx}
        farmacia={farmacia}
        contador={idx + 1}
        handleVer={this.handleNombreFarmacia}
      />
    ) : null;
  };

  render() {
    const { listaFarmacias } = this.props.farmaciasAdminReducer;
    return (
      <div>
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Farmacias</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="4">
                    <Input
                      type="text"
                      placeholder="buscar farmacia..."
                      name="filtro"
                      onChange={this.handleInputChange}
                      value={this.state.filtro}
                    />
                  </Col>
                </Row>
                <hr />
                <div className="table-responsive table-fix">
                  <table className="table table-striped ">
                    <thead className="bg-secondary">
                      <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Venta online Farmageo</th>
                        <th>Usuario</th>
                        <th>Password</th>
                        <th>Último acceso</th>
                        <th>Detalle</th>
                        <th>Estado</th>
                        <th>Bloqueo</th>
                        <th>Descubrir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*listaFarmacias.map((f, index) => {
                        return f.nombre
                          .toUpperCase()
                          .includes(this.state.filtro) ? (
                          <ItemFarmacia
                            key={index}
                            farmacia={f}
                            contador={index + 1}
                            handleVer={this.handleNombreFarmacia}
                          />
                        ) : null;
                      })*/}
                      <PlainList
                        list={listaFarmacias}
                        renderItem={this.renderFarmacia}
                        renderWhenEmpty={() => (
                          <div className="mt-4">
                            <h3>Cargando...</h3>
                          </div>
                        )}
                        sortBy={["nombre", { key: "_id", descending: true }]}
                        //groupBy={f => f.info.age > 18 ? 'Over 18' : 'Under 18'}
                        renderOnScroll
                      />
                    </tbody>
                  </table>
                </div>

                <div
                  className="modal fade bd-example-modal-lg"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col xs="12" md="6" className="my-1">
                              <b>Nombre: </b> {this.state.farmacia.nombre}
                            </Col>
                            <Col xs="12" md="6" className="my-1">
                              <b>Fecha alta: </b>{" "}
                              {this.state.farmacia.fechaalta !==
                              (undefined || null || "")
                                ? this.state.farmacia.fechaalta.substring(0, 10)
                                : ""}
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <Row>
                            <Col xs="12" md="3" className="my-1">
                              <CardImg
                                src={
                                  this.state.farmacia.imagen !== null
                                    ? image_path_server +
                                      this.state.farmacia.imagen
                                    : null
                                }
                              />
                            </Col>

                            <Col xs="12" md="3" className="my-1">
                              <b>Usuario:</b> {this.state.farmacia.usuario}
                            </Col>

                            <Col xs="12" md="3" className="my-1">
                              <b>Nombre farmacéutico:</b>{" "}
                              {this.state.farmacia.nombrefarmaceutico}
                            </Col>

                            <Col xs="12" md="3" className="my-1">
                              <b>Matrícula:</b> {this.state.farmacia.matricula}
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col xs="12" md="4" className="my-1">
                              <b>Provincia:</b> {this.state.farmacia.provincia}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>Localidad:</b> {this.state.farmacia.localidad}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>CP:</b> {this.state.farmacia.cp}
                            </Col>
                          </Row>
                          <hr />

                          <Row>
                            <Col xs="12" md="4" className="my-1">
                              <b>Calle:</b> {this.state.farmacia.calle}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>Nº:</b> {this.state.farmacia.numero}
                            </Col>
                            <Col xs="12" md="4"></Col>
                          </Row>

                          <hr />
                          <Row>
                            <Col xs="12" md="4" className="my-1">
                              <b>Farmacia id:</b>{" "}
                              {this.state.farmacia.farmaciaid}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>MAPA lat:</b> {this.state.farmacia.lat}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>MAPA long:</b> {this.state.farmacia.log}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
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
    authReducer: state.authReducer,
    farmaciasAdminReducer: state.farmaciasAdminReducer,
  };
};

const mapDispatchToProps = {
  GET_FARMACIAS,
  GET_PASSWORDS_FARMACIAS,
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmaciasAdmin);
