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
  GET_LABORATORIOS_ADMIN,
  ADD_LABORATORIO,
  UPDATE_LABORATORIO,
} from "../../../redux/actions/transfersActions";
import { image_path_server } from "../../../config";
import FormularioLaboratorio from "./FormularioLaboratorio";
import "./laboratorio.scss";
const labinit = {
  _id: "",
  nombre: "",
  habilitado: true,
  transfer_farmageo: true,
  url: "",
  novedades: "",
  condiciones_comerciales: "",
  imagen: undefined,
};

class Laboratorios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laboratorio: {
        _id: "",
        nombre: "",
        habilitado: true,
        transfer_farmageo: true,
        url: "",
        novedades: "",
        condiciones_comerciales: "",
        imagen: undefined,
      },
      laboratorioEdit: {},
    };
  }

  componentDidMount() {
    this.props.GET_LABORATORIOS_ADMIN();
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
                              laboratorio: labinit,
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
              <FormularioLaboratorio
                laboratorio={this.state.laboratorio}
                {...this.props}
              />
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
  GET_LABORATORIOS_ADMIN,
  ADD_LABORATORIO,
  UPDATE_LABORATORIO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Laboratorios);
