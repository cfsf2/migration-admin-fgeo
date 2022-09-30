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
  GET_TRANSFERS,
  GET_LABORATORIOS,
  GET_DROGUERIAS,
} from "../../../redux/actions/transfersActions";

class TransfersAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transfer: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.GET_TRANSFERS();
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      transfer: {
        ...this.state.transfer,
        [name]: value,
      },
    });
  }

  render() {
    const { transfers } = this.props.tranfersReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de transfers</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar transfer..."
                          name="filtro"
                        />
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>Código</th>
                            <th>Estado</th>
                            <th>Email destinatario</th>
                            <th>Fecha</th>
                            <th>Farmacia</th>
                            <th>Farmacia codigo</th>
                            <th>Laboratorio</th>
                            <th>Drogueria</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transfers.map((obj, index) => {
                            return (
                              <tr key={index}>
                                <td>{obj.codigo_transfer}</td>
                                <td>{obj.estado}</td>
                                <td>{obj.email_destinatario}</td>
                                <td>{obj.fecha.substring(0, 10)}</td>
                                <td>{obj.farmacia_nombre}</td>
                                <td>{obj.farmacia_id}</td>
                                <td>{obj.laboratorio_id}</td>
                                <td>{obj.drogueria_id}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() => {
                                      this.setState({ transfer: obj });
                                    }}
                                  >
                                    ver
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
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
                          {this.state.transfer === null ? null : (
                            <Row>
                              <Col xs="12" md="12">
                                <Card>
                                  <CardHeader>
                                    <Row>
                                      <Col>
                                        Transfer:{" "}
                                        {this.state.transfer.codigo_transfer}
                                      </Col>
                                      <Col>
                                        <Button
                                          className="close"
                                          data-dismiss="modal"
                                        >
                                          {" "}
                                          X{" "}
                                        </Button>
                                      </Col>
                                    </Row>
                                  </CardHeader>
                                  <CardBody>
                                    <Row className="my-2">
                                      <div className="table-responsive">
                                        <table className="table table-striped">
                                          <thead className="bg-dark">
                                            <tr>
                                              <th>sku</th>
                                              <th>Producto</th>
                                              <th>Cantidad</th>
                                              <th>Presentacion</th>
                                              <th>Observación</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {this.state.transfer
                                              .productos_solicitados.length > 0
                                              ? this.state.transfer.productos_solicitados.map(
                                                  (linea, index) => {
                                                    console.log(linea);
                                                    return (
                                                      <tr>
                                                        <td>
                                                          {
                                                            linea.codigo_producto
                                                          }
                                                        </td>
                                                        <td>{linea.nombre}</td>
                                                        <td>
                                                          {linea.cantidad}
                                                        </td>
                                                        <td>
                                                          {linea.presentacion}
                                                        </td>
                                                        <td>
                                                          {linea.observaciones}
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </tbody>
                                        </table>
                                      </div>
                                    </Row>
                                    <hr />
                                    <br />
                                    <Row>
                                      <Col className="mt-3">
                                        <Button
                                          className="close"
                                          data-dismiss="modal"
                                        >
                                          {" "}
                                          X{" "}
                                        </Button>
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {
  GET_TRANSFERS,
  GET_LABORATORIOS,
  GET_DROGUERIAS,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersAdmin);
