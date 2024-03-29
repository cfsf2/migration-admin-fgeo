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
  CardImg,
} from "reactstrap";

import { connect } from "react-redux";
import {
  ADD_PUBLICIDAD,
  UPDATE_PUBLICIDAD,
  GET_PUBLICIDADES,
} from "../../redux/actions/publicidadesActions";
import Uploader from "../../components/Uploader";
import { image_path_server } from "../../config";
class Mutual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicidad: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmar = this.handleConfirmar.bind(this);
    this.handleEditImagen = this.handleEditImagen.bind(this);
  }
  async componentDidMount() {
    this.props.GET_PUBLICIDADES();
  }
  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      publicidad: {
        ...this.state.publicidad,
        [name]: value,
      },
    });
  }
  async handleEditImagen(urlImagen) {
    console.log(urlImagen);
    await this.setState({
      publicidad: {
        ...this.state.publicidad,
        imagen: urlImagen,
      },
    });
  }
  async handleConfirmar() {
    //console.log(this.state.publicidad)
    this.props.ADD_PUBLICIDAD(
      this.props.authReducer.user.username,
      this.state.publicidad
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <Button
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                  onClick={() =>
                    this.setState({
                      editar: false,
                      publicidad: {
                        username: this.props.authReducer.user.username,
                        tipo: "mutual",
                        titulo: "sin título",
                        descripcion: "",
                        link: "",
                        imagen: "",
                        habilitado: true,
                        color: "verde",
                      },
                    })
                  }
                >
                  + Agregar información de mutual
                </Button>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <b>Listado de información de mutual</b>
                      </CardHeader>
                      <CardBody>
                        {this.props.publicidadesReducer.publicidades.map(
                          (p, index) => {
                            return p.tipo === "mutual" ? (
                              <Fragment key={index}>
                                <Row>
                                  <Col>
                                    <Row>
                                      <Col xs="12" md="6">
                                        <p
                                          style={{
                                            textJustify: "initial",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                          }}
                                          className="d-inline"
                                        >
                                          {p.titulo}
                                        </p>
                                      </Col>
                                      <Col xs="12" md="6">
                                        <p style={{ float: "right" }}>
                                          {p.fechaalta.substring(0, 10)}
                                        </p>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs="12" md="12">
                                        Link:{" "}
                                        <a
                                          href={p.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {p.link}
                                        </a>
                                      </Col>
                                    </Row>
                                    <Row style={{ marginTop: 10 }}>
                                      <Col xs="12" md="6">
                                        <CardImg
                                          src={
                                            p.imagen !== null
                                              ? image_path_server + p.imagen
                                              : null
                                          }
                                          style={{ width: "100%" }}
                                        />
                                      </Col>
                                      <Col align="center" xs="12" md="6">
                                        <Button
                                          className="btn btn-info m-2"
                                          onClick={() => {
                                            this.setState({
                                              editar: true,
                                              publicidad: p,
                                            });
                                          }}
                                          data-toggle="modal"
                                          data-target=".bd-example-modal-lg"
                                        >
                                          Editar
                                        </Button>
                                        <Button
                                          className="btn btn-danger m-2"
                                          disabled
                                        >
                                          Eliminar
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <hr />
                              </Fragment>
                            ) : null;
                          }
                        )}
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
                      {this.state.publicidad !== null ? (
                        this.state.editar ? (
                          <Row>
                            <Col xs="12" sm="12">
                              <Card>
                                <CardHeader>
                                  <Row>
                                    <Col>Agregar información de mutual</Col>
                                  </Row>
                                </CardHeader>
                                <CardBody>
                                  <FormGroup>
                                    <Row>
                                      <Col>
                                        <Label htmlFor="titulo">
                                          Título (no se mostrará en la app, es
                                          sólo para identificación)
                                        </Label>
                                        <Input
                                          type="text"
                                          id="titulo"
                                          name="titulo"
                                          onChange={this.handleInputChange}
                                          value={this.state.publicidad.titulo}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <hr />
                                  <FormGroup>
                                    <Row>
                                      <Col>
                                        <Label htmlFor="link">Link</Label>
                                        <Input
                                          type="text"
                                          id="link"
                                          name="link"
                                          onChange={this.handleInputChange}
                                          value={this.state.publicidad.link}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row>
                                      <Col>
                                        <p>
                                          <b>Imagen</b>
                                        </p>
                                        <CardImg
                                          src={
                                            this.state.publicidad.imagen !==
                                            null
                                              ? image_path_server +
                                                this.state.publicidad.imagen
                                              : null
                                          }
                                        />
                                        <Uploader
                                          handleEditImagen={
                                            this.handleEditImagen
                                          }
                                          isPerfil={false}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <hr />
                                </CardBody>
                                <CardFooter>
                                  <Row>
                                    <Col></Col>
                                    <Col>
                                      <Button
                                        className="btn btn-success"
                                        onClick={() => {
                                          this.props.UPDATE_PUBLICIDAD(
                                            this.state.publicidad
                                          );
                                        }}
                                        data-dismiss="modal"
                                      >
                                        Guardar Cambios
                                      </Button>
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
                        ) : (
                          <Row>
                            <Col xs="12" sm="12">
                              <Card>
                                <CardHeader>
                                  <Row>
                                    <Col>Agregar información de mutual</Col>
                                  </Row>
                                </CardHeader>
                                <CardBody>
                                  <FormGroup>
                                    <Row>
                                      <Col>
                                        <Label htmlFor="titulo">
                                          Título (no se mostrará en la app, es
                                          sólo para identificación)
                                        </Label>
                                        <Input
                                          type="text"
                                          id="titulo"
                                          name="titulo"
                                          onChange={this.handleInputChange}
                                          value={this.state.publicidad.titulo}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <hr />
                                  <FormGroup>
                                    <Row>
                                      <Col>
                                        <Label htmlFor="link">Link</Label>
                                        <Input
                                          type="text"
                                          id="link"
                                          name="link"
                                          onChange={this.handleInputChange}
                                          value={this.state.publicidad.link}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <FormGroup>
                                    <Row>
                                      <Col>
                                        <p>
                                          <b>Imagen</b>
                                        </p>
                                        <CardImg
                                          src={
                                            this.state.publicidad.imagen !==
                                            null
                                              ? image_path_server +
                                                this.state.publicidad.imagen
                                              : null
                                          }
                                        />
                                        <Uploader
                                          handleEditImagen={
                                            this.handleEditImagen
                                          }
                                          isPerfil={false}
                                        />
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                  <hr />
                                </CardBody>
                                <CardFooter>
                                  <Row>
                                    <Col></Col>
                                    <Col>
                                      <Button
                                        className="btn btn-success"
                                        onClick={() => {
                                          this.props.ADD_PUBLICIDAD(
                                            this.props.authReducer.user
                                              .username,
                                            this.state.publicidad
                                          );
                                        }}
                                        data-dismiss="modal"
                                      >
                                        Confirmar
                                      </Button>
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
                        )
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
  };
};
const mapDispatchToProps = {
  ADD_PUBLICIDAD,
  UPDATE_PUBLICIDAD,
  GET_PUBLICIDADES,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mutual);
