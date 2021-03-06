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
import ImportarCsv from "../../../components/ImportarCsv";
import {
  ADD_PRODUCTO_TRANSFER,
  GET_LABORATORIOS,
} from "../../../redux/actions/transfersActions";
import LineaImportTransfer from "./LineaImportTransfer";
import ejemplo_transfer_csv from "./ejemplo_importar_transfers.csv";
import AsignarInstituciones from "../../FarmaciasAdmin/components/AsignarInstituciones";

class ImportProductosTransfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laboratorioid: "none",
      vistaPrevia: [],
      action: "stand",
      instituciones: [],
    };
    this.handleConvertToJson = this.handleConvertToJson.bind(this);
    this.handleLaboratorio = this.handleLaboratorio.bind(this);
  }

  async handleLaboratorio(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    this.setState({ laboratorioid: value });
  }

  async handleConvertToJson(data) {
    // console.log(data)
    let vistaPrevia = [];
    try {
      await data.map((fila) => {
        if (
          fila.data[0] != "" &&
          fila.data[0] !== "codigo" &&
          fila.data[1] != "" &&
          fila.data[1] !== "nombre" &&
          fila.data[3] != "" &&
          fila.data[4] != "" &&
          fila.data[5] != "" &&
          fila.data[6] != ""
        ) {
          vistaPrevia.push({
            codigo: fila.data[0],
            laboratorioid: this.state.laboratorioid,
            nombre: fila.data[1],
            presentacion: fila.data[2],
            cantidad_minima: fila.data[3],
            descuento_porcentaje: fila.data[4],
            precio: fila.data[5],
            habilitado: fila.data[6],
          });
        }
        this.setState({ vistaPrevia });
      });
      //console.log(vistaPrevia);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.props.GET_LABORATORIOS();
  }

  render() {
    const { laboratorios } = this.props.tranfersReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col sm="9">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <b>Importar transfers desde csv</b>
                      </Col>
                      <Col align="right">
                        <a href={ejemplo_transfer_csv} download>
                          Descargar Ejemplo csv
                        </a>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          value={
                            this.state.laboratorioid !== null
                              ? this.state.laboratorioid
                              : ""
                          }
                          onChange={this.handleLaboratorio}
                        >
                          <option value={"none"}>Laboratorio...</option>
                          {laboratorios.map((lab, index) => {
                            return (
                              <option value={lab._id} key={index}>
                                {lab.nombre}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="5" style={{ marginBottom: 10 }}>
                        <ImportarCsv
                          handleResponse={this.handleConvertToJson}
                          disabled={this.state.laboratorioid === "none"}
                        />
                      </Col>
                      <Col align="right">
                        <Button
                          className="btn btn-success"
                          disabled={
                            this.state.laboratorioid === "none" ||
                            this.state.instituciones.length === 0 ||
                            this.state.vistaPrevia.length === 0
                          }
                          onClick={() =>
                            this.setState({
                              action: "submit",
                              alreadySubmitted: true,
                            })
                          }
                        >
                          Confirmar
                        </Button>
                      </Col>
                      <Col align="left">
                        <Button
                          className={
                            this.state.alreadySubmitted
                              ? "btn btn-info"
                              : "btn btn-danger"
                          }
                          onClick={() =>
                            this.setState({
                              vistaPrevia: [],
                              alreadySubmitted: false,
                              instituciones: [],
                              laboratorioid: "none",
                            })
                          }
                        >
                          {this.state.alreadySubmitted ? "Limpiar" : "Cancelar"}
                        </Button>
                      </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                      <Col>
                        <div className="table-responsive table-striped table-fix">
                          <table className="table ">
                            <thead className="bg-secondary">
                              <tr>
                                <th>C??digo</th>
                                <th>Laboratorio</th>
                                <th>Producto / Presentaci??n</th>
                                <th>Cantidad M??nima</th>
                                <th>%</th>
                                <th>Precio</th>
                                <th>Habilitado</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.vistaPrevia.map((linea, index) => {
                                return (
                                  <LineaImportTransfer
                                    codigo={linea.codigo}
                                    laboratorioid={linea.laboratorioid}
                                    laboratorioNombre={
                                      laboratorios.filter((l) => {
                                        return l._id === linea.laboratorioid;
                                      })[0].nombre
                                    }
                                    nombre={linea.nombre}
                                    presentacion={linea.presentacion}
                                    cantidad_minima={linea.cantidad_minima}
                                    descuento_porcentaje={
                                      linea.descuento_porcentaje
                                    }
                                    habilitado={linea.habilitado}
                                    key={index}
                                    action={this.state.action}
                                    precio={linea.precio}
                                    instituciones={this.state.instituciones}
                                  />
                                );
                                {
                                  /*<tr>
                            <td>{linea.codigo}</td>
                            <td>{laboratorios.filter(l=>{return l._id === linea.laboratorioid})[0].nombre}</td>
                            <td>{linea.nombre+" / "+linea.presentacion}</td>
                            <td></td>
                            <td>{linea.cantidad_minima}</td>
                            <td>{linea.descuento_porcentaje}</td>
                            <td>{linea.habilitado}</td>
                          </tr>*/
                                }
                              })}
                            </tbody>
                          </table>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="3">
                <AsignarInstituciones
                  key="f3qw4erf"
                  obj={this.state}
                  setObj={this.setState.bind(this)}
                  compacto
                />
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
  ADD_PRODUCTO_TRANSFER,
  GET_LABORATORIOS,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportProductosTransfers);
