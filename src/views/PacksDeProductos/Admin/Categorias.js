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
  GET_CATEGORIAS_ADMIN,
  ADD_CATEGORIA,
  UPDATE_CATEGORIA,
} from "../../../redux/actions/packsproductosActions";
// import Uploader from "../../../components/Uploader";

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: { nombre: "" },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.GET_CATEGORIAS_ADMIN();
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      categoria: {
        ...this.state.categoria,
        [name]: value,
      },
    });
  }

  render() {
    const { categorias } = this.props.packsproductosReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de categorías</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar categoría..."
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
                              categoria: null,
                            })
                          }
                        >
                          + Nueva categoria
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>#</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                            <th>Destacado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categorias.map((categoria, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{categoria.nombre}</td>
                                <td>
                                  {categoria.habilitado ? (
                                    <p className="text-success">Habilitado</p>
                                  ) : (
                                    <p className="text-danger">Deshabilitado</p>
                                  )}
                                </td>
                                <td>
                                  {categoria.destacada ? (
                                    <p className="text-success">Si</p>
                                  ) : (
                                    <p className="text-danger">No</p>
                                  )}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      this.setState({
                                        editar: true,
                                        categoria: categoria,
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
                        <Col>Nueva Categoría</Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Nombre</Label>
                            <Input
                              type="text"
                              id="nombre"
                              name="nombre"
                              onChange={this.handleInputChange}
                              value={
                                this.state.categoria != null
                                  ? this.state.categoria.nombre
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>Estado</Label>
                            <Input
                              type="select"
                              name="habilitado"
                              value={
                                this.state.categoria
                                  ? this.state.categoria.habilitado
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
                            <Label>Destacado</Label>
                            <Input
                              type="select"
                              name="destacada"
                              value={
                                this.state.categoria
                                  ? this.state.categoria.destacada
                                  : undefined
                              }
                              onChange={this.handleInputChange}
                            >
                              <option value={undefined}>seleccionar...</option>
                              <option value={true}>Si</option>
                              <option value={false}>No</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
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
                                this.props.UPDATE_CATEGORIA(
                                  this.state.categoria
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
                                this.props.ADD_CATEGORIA(this.state.categoria);
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
  return { packsproductosReducer: state.packsproductosReducer };
};

const mapDispatchToProps = {
  GET_CATEGORIAS_ADMIN,
  ADD_CATEGORIA,
  UPDATE_CATEGORIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorias);
