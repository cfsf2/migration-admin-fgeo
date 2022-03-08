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
  GET_DROGUERIAS_ADMIN,
  ADD_DROGUERIA,
  UPDATE_DROGUERIA,
} from "../../../redux/actions/transfersActions";
// import Uploader from "../../../components/Uploader";

class Droguerias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drogueria: { nombre: "" },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.GET_DROGUERIAS_ADMIN();
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      drogueria: {
        ...this.state.drogueria,
        [name]: value,
      },
    });
  }

  render() {
    const { droguerias } = this.props.tranfersReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de droguerías</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar droguería..."
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
                              drogueria: null,
                            })
                          }
                        >
                          + Nueva drogueria
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>#</th>
                            <th>Droguería</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {droguerias.map((drogueria, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{drogueria.nombre}</td>
                                <td>
                                  {drogueria.habilitado ? (
                                    <p className="text-success">Habilitado</p>
                                  ) : (
                                    <p className="text-danger">Deshabilitado</p>
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
                                        drogueria: drogueria,
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
                        <Col>Nueva Droguería</Col>
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
                                this.state.drogueria != null
                                  ? this.state.drogueria.nombre
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
                                this.state.drogueria
                                  ? this.state.drogueria.habilitado
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
                                this.props.UPDATE_DROGUERIA(
                                  this.state.drogueria
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
                                this.props.ADD_DROGUERIA(this.state.drogueria);
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
  GET_DROGUERIAS_ADMIN,
  ADD_DROGUERIA,
  UPDATE_DROGUERIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(Droguerias);
