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
  CardFooter,
} from "reactstrap";

import { connect } from "react-redux";
import {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
} from "../../../redux/actions/publicidadesActions";
import { GET_INSTITUCIONES } from "../../../redux/actions/institucionesAction";

import AsignarInstituciones from "../../FarmaciasAdmin/components/AsignarInstituciones";

class ComunicadoTransfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editar: null,
      novedad: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmar = this.handleConfirmar.bind(this);
  }

  async componentDidMount() {
    this.props.GET_PUBLICIDADES();
    this.props.GET_INSTITUCIONES(1000);
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      novedad: {
        ...this.state.novedad,
        [name]: value,
      },
    });
  }

  async handleConfirmar() {
    console.log(this.state.novedad);
    this.props.ADD_PUBLICIDAD(
      this.props.authReducer.user.username,
      this.state.novedad
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <b>Editar comunicado transfers</b>
                      </CardHeader>
                      <CardBody>
                        {this.props.publicidadesReducer.publicidades
                          .filter((p) => {
                            return p.tipo === "comunicadoTransfers";
                          })
                          .map((p, index) => {
                            return (
                              <Fragment key={index}>
                                <Row>
                                  <Col xs="12" md="10" className="my-2">
                                    <div
                                      style={{
                                        fontSize: 12,
                                        padding: "1rem",
                                        border: "1px solid rgba(0, 0, 0, 0.1",
                                        borderRadius: "15px",
                                        position: "relative",
                                      }}
                                    >
                                      <p
                                        style={{
                                          whiteSpace: "pre-wrap",
                                          width: "calc(100% - 230px)",
                                        }}
                                      >
                                        {p.descripcion}
                                      </p>
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "20px",
                                          right: "20px",

                                          minWidth: "200px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {p.instituciones?.map((ins) => {
                                          const instituciones =
                                            this.props.institucionesReducer.instituciones.find(
                                              (institucion) =>
                                                institucion._id === ins
                                            );

                                          return (
                                            <div
                                              key={ins}
                                              style={{
                                                marginBottom: "0.3rem",
                                                background: "darkseagreen",
                                                color: "ghostwhite",
                                                padding: "0.4rem",
                                                borderRadius: "16px",
                                              }}
                                            >
                                              {instituciones?.nombre}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs="12" md="2" className="my-2">
                                    <Button
                                      data-toggle="modal"
                                      data-target=".bd-example-modal-lg"
                                      onClick={() =>
                                        this.setState({
                                          editar: true,
                                          novedad: p,
                                        })
                                      }
                                      className="btn btn-sm btn-info"
                                    >
                                      Editar
                                    </Button>
                                  </Col>
                                </Row>
                              </Fragment>
                            );
                          })}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <div
                  className="modal fade bd-example-modal-lg"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      {this.state.novedad !== null ? (
                        <Row>
                          <Col xs="12" sm="12">
                            <Card>
                              <CardBody>
                                <FormGroup>
                                  <Row>
                                    <Col>
                                      <Label htmlFor="descripcion">
                                        Descripción
                                      </Label>
                                      <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        onChange={this.handleInputChange}
                                        style={{
                                          height: "200px",
                                          width: "100%",
                                        }}
                                        value={this.state.novedad.descripcion}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <AsignarInstituciones
                                        obj={this.state.novedad}
                                        setObj={this.setState.bind(this)}
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>
                              </CardBody>
                              <CardFooter>
                                <Row>
                                  <Col></Col>
                                  <Col>
                                    {this.state.editar ? (
                                      <Button
                                        className="btn btn-success"
                                        data-dismiss="modal"
                                        onClick={() => {
                                          this.props.UPDATE_PUBLICIDAD(
                                            this.state.novedad,
                                            this.state.instituciones
                                          );
                                        }}
                                      >
                                        Guardar Cambios
                                      </Button>
                                    ) : (
                                      <Button
                                        className="btn btn-success"
                                        onClick={this.handleConfirmar}
                                        data-dismiss="modal"
                                      >
                                        Confirmar
                                      </Button>
                                    )}
                                  </Col>
                                  <Col>
                                    <Button
                                      className="btn btn-danger"
                                      data-dismiss="modal"
                                    >
                                      Cancelar
                                    </Button>
                                  </Col>
                                  <Col></Col>
                                </Row>
                              </CardFooter>
                            </Card>
                          </Col>
                        </Row>
                      ) : null}
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
    publicidadesReducer: state.publicidadesReducer,
    institucionesReducer: state.institucionesReducer,
  };
};
const mapDispatchToProps = {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
  GET_INSTITUCIONES,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComunicadoTransfers);
