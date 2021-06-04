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
  CardImg,
  Label,
  CardFooter,
} from "reactstrap";

import { connect } from "react-redux";
import {
  GET_LABORATORIOS,
  ADD_LABORATORIO,
  UPDATE_LABORATORIO,
} from "../../../redux/actions/transfersActions";
import Uploader from "../../../components/Uploader";
import { image_path_server } from "../../../config";
class Laboratorios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laboratorio: { nombre: "" },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditImagen = this.handleEditImagen.bind(this);
  }

  componentDidMount() {
    this.props.GET_LABORATORIOS();
  }

  async handleEditImagen(urlImagen) {
    console.log(urlImagen);
    await this.setState({
      laboratorio: {
        ...this.state.laboratorio,
        imagen: urlImagen,
      },
    });
  }
  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      laboratorio: {
        ...this.state.laboratorio,
        [name]: value,
      },
    });
  }

  render() {
    const { laboratorios } = this.props.tranfersReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de laboratorios</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar laboratorio..."
                          name="filtro"
                        />
                      </Col>

                      <Col xs="12" md="4">
                        <Button
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg"
                          onClick={() =>
                            this.setState({
                              editar: false,
                              laboratorio: null,
                            })
                          }
                        >
                          + Nuevo Laboratorio
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>#</th>
                            <th>Laboratorio</th>
                            <th>Estado</th>
                            <th>Novedades</th>
                            <th>Condiciones comerciales</th>
                            <th>Logo</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {laboratorios.map((laboratorio, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{laboratorio.nombre}</td>
                                <td>
                                  {laboratorio.habilitado ? (
                                    <span className="text-success">
                                      Habilitado
                                    </span>
                                  ) : (
                                    <span className="text-danger">
                                      Deshabilitado
                                    </span>
                                  )}
                                </td>
                                <td>{laboratorio.novedades}</td>
                                <td>{laboratorio.condiciones_comerciales}</td>
                                <td>
                                  <CardImg
                                    src={
                                      laboratorio.imagen != undefined
                                        ? image_path_server + laboratorio.imagen
                                        : null
                                    }
                                    style={{ width: 100, paddingRight: 40 }}
                                  />
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      this.setState({
                                        editar: true,
                                        laboratorio: laboratorio,
                                      })
                                    }
                                  >
                                    Editar
                                  </Button>
                                </td>
                              </tr>
                            );
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

        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <Row>
                <Col xs="12" sm="12">
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col>
                          {this.state.editar ? "Editar" : "Nuevo Laboratorio"}
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                              type="text"
                              id="nombre"
                              name="nombre"
                              onChange={this.handleInputChange}
                              value={
                                this.state.laboratorio != null
                                  ? this.state.laboratorio.nombre
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Estado</Label>
                            <Input
                              type="select"
                              name="habilitado"
                              value={
                                this.state.laboratorio
                                  ? this.state.laboratorio.habilitado
                                  : undefined
                              }
                              onChange={this.handleInputChange}
                            >
                              <option value={undefined}>seleccionar...</option>
                              <option value={true}>Habilitado</option>
                              <option value={false}>Deshabilitado</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="novedades">Novedades</Label>
                            <Input
                              type="text"
                              id="novedades"
                              name="novedades"
                              onChange={this.handleInputChange}
                              value={
                                this.state.laboratorio != null
                                  ? this.state.laboratorio.novedades
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="condiciones_comerciales">
                              Condiciones comerciales
                            </Label>
                            <Input
                              type="text"
                              id="condiciones_comerciales"
                              name="condiciones_comerciales"
                              onChange={this.handleInputChange}
                              value={
                                this.state.laboratorio != null
                                  ? this.state.laboratorio
                                      .condiciones_comerciales
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <FormGroup>
                            <p>
                              <b>Imagen</b>
                            </p>
                            <CardImg
                              src={
                                this.state.laboratorio
                                  ? this.state.laboratorio.imagen !== undefined
                                    ? image_path_server +
                                      this.state.laboratorio.imagen
                                    : null
                                  : null
                              }
                            />
                            <Uploader
                              handleEditImagen={this.handleEditImagen}
                              isPerfil={false}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr />
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
                                this.props.UPDATE_LABORATORIO(
                                  this.state.laboratorio
                                );
                              }}
                            >
                              Guardar Cambios
                            </Button>
                          ) : (
                            <Button
                              className="btn btn-success"
                              data-dismiss="modal"
                              onClick={() => {
                                this.props.ADD_LABORATORIO(
                                  this.state.laboratorio
                                );
                              }}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {
  GET_LABORATORIOS,
  ADD_LABORATORIO,
  UPDATE_LABORATORIO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorios);
