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
  GET_PRODUCTOS_PACK,
  ADD_PRODUCTO_PACK,
  GET_ENTIDADES,
  GET_CATEGORIAS,
  UPDATE_PRODUCTO_PACK,
} from "../../../redux/actions/packsproductosActions";

import ejemplo_pack_csv from "./ejemplo_importar_packs.csv";

import Uploader from "../../../components/Uploader";
import ImportarCsv from "../../../components/ImportarCsv";
import LineaImportPack from "./LineaImportPack";

class ImportProductosPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidad_id: "none",
      categoria_id: "none",
      vistaPrevia: [],
      action: "stand",
    };
    this.handleConvertToJson = this.handleConvertToJson.bind(this);
    this.handleEntidad = this.handleEntidad.bind(this);
    this.handleCategoria = this.handleCategoria.bind(this);
  }

  async handleEntidad(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    this.setState({ entidad_id: value });
  }
  async handleCategoria(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    this.setState({ categoria_id: value });
  }
  async handleConvertToJson(data) {
    // console.log(data)
    let vistaPrevia = [];
    try {
      await data.map((fila) => {
        if (
          fila.data[0] != "" &&
          fila.data[0] !== "sku" &&
          fila.data[1] != "" &&
          fila.data[1] !== "nombre" &&
          fila.data[3] != "" &&
          fila.data[4] != "" &&
          fila.data[5] != ""
        ) {
          vistaPrevia.push({
            sku: fila.data[0],
            entidad_id: this.state.entidad_id,
            categoria_id: this.state.categoria_id,
            nombre: fila.data[1],
            descripcion: fila.data[2],
            precio: fila.data[3],
            precio_con_IVA: fila.data[4],
            rentabilidad: fila.data[5],
          });
        }
        this.setState({ vistaPrevia });
      });
      //console.log(vistaPrevia);
    } catch (error) {
      console.log(error);
    }
  }
  /*
  async handleAjustarRentabilidad() {
    if (this.state.producto != null) {
      const { producto } = this.state;

      if (producto.precio_con_IVA != null && producto.precio != null) {
        const rentabilidad_pesos = await (producto.precio -
          producto.precio_con_IVA);
        const rentabilidad = await (rentabilidad_pesos /
          producto.precio_con_IVA);

        await this.setState({
          producto: {
            ...producto,
            rentabilidad: (rentabilidad * 100).toFixed(2),
          },
        });
      }
    }
    this.handleCalculoInversoDesdePVP();
  }

  async handleCalcularPVP() {
    if (this.state.producto != null) {
      if (this.state.producto.precio_con_IVA != null) {
        const precio = parseFloat(this.state.producto.precio_con_IVA);
        const rentabilidad =
          this.state.producto.rentabilidad != null
            ? this.state.producto.rentabilidad
            : 0;

        await this.setState({
          producto: {
            ...this.state.producto,
            precio: parseFloat(precio + (precio * rentabilidad) / 100).toFixed(
              2
            ),
          },
        });
      }
    }
  }

  async handleCalculoInversoDesdePVP() {
    if (this.state.producto != null) {
      if (this.state.producto.precio != null) {
        const precio = parseFloat(this.state.producto.precio);
        const rentabilidad =
          this.state.producto.rentabilidad != null
            ? this.state.producto.rentabilidad
            : 0;

        await this.setState({
          producto: {
            ...this.state.producto,
            precio_con_IVA: parseFloat(
              precio / (1 + rentabilidad / 100)
            ).toFixed(2),
          },
        });
      }
    }
  }
*/
  componentDidMount() {
    this.props.GET_ENTIDADES();
    this.props.GET_CATEGORIAS();
  }

  render() {
    const { entidades, categorias } = this.props.packsproductosReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <b>Importar packes desde csv</b>
                      </Col>
                      <Col align="right">
                        <a href={ejemplo_pack_csv} download>
                          Descargar Ejemplo csv
                        </a>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="entidad_id"
                          name="entidad_id"
                          value={
                            this.state.entidad_id !== null
                              ? this.state.entidad_id
                              : ""
                          }
                          onChange={this.handleEntidad}
                        >
                          <option value={"none"}>Todas las entidades...</option>
                          {entidades.map((entidad, index) => {
                            return (
                              <option value={entidad._id} key={index}>
                                {entidad.entidadnombre}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="categoria_id"
                          name="categoria_id"
                          value={
                            this.state.categoria_id !== null
                              ? this.state.categoria_id
                              : ""
                          }
                          onChange={this.handleCategoria}
                        >
                          <option value={"none"}>
                            Todas las categorias...
                          </option>
                          {categorias.map((categoria, index) => {
                            return (
                              <option value={categoria._id} key={index}>
                                {categoria.nombre}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <ImportarCsv
                          handleResponse={this.handleConvertToJson}
                          disabled={
                            this.state.entidad_id === "none" ||
                            this.state.categoria_id === "none"
                          }
                        />
                      </Col>
                      <Col align="right">
                        <Button
                          className="btn btn-success"
                          disabled={
                            this.state.entidad_id === "none" ||
                            this.state.categoria_id === "none"
                          }
                          onClick={() => this.setState({ action: "submit" })}
                        >
                          Confirmar
                        </Button>
                      </Col>
                      <Col align="left">
                        <Button
                          className="btn btn-danger"
                          onClick={() => this.setState({ vistaPrevia: [] })}
                        >
                          Cancelar
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>SKU</th>
                            <th>Entidad</th>
                            <th>Categoria</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>precio_con_IVA</th>
                            <th>Rentabilidad</th>
                            <th>Precio en FarmaGeo</th>
                            <th>Status</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.vistaPrevia.map((linea, index) => {
                            return (
                              <LineaImportPack
                                sku={linea.sku}
                                entidad_id={linea.entidad_id}
                                entidadNombre={
                                  entidades.filter((l) => {
                                    return l._id === linea.entidad_id;
                                  })[0].entidadnombre
                                }
                                categoria_id={linea.categoria_id}
                                categoriaNombre={
                                  categorias.filter((l) => {
                                    return l._id === linea.categoria_id;
                                  })[0].nombre
                                }
                                nombre={linea.nombre}
                                descripcion={linea.descripcion}
                                precio={linea.precio}
                                precio_con_IVA={linea.precio_con_IVA}
                                rentabilidad={linea.rentabilidad}
                                key={index}
                                action={this.state.action}
                              />
                            );
                            {
                              /*<tr>
                                <td>{linea.sku}</td>
                                <td>
                                  {
                                    entidades.filter((l) => {
                                      return l._id === linea.entidad_id;
                                    })[0].entidadnombre
                                  }
                                </td>
                                <td>
                                  {
                                    categorias.filter((c) => {
                                      return c._id === linea.categoria_id;
                                    })[0].nombre
                                  }
                                </td>
                                <td>{linea.nombre}</td>
                                <td>{linea.descripcion}</td>
                                <td>{linea.precio}</td>
                                <td>{linea.rentabilidad}</td>
                                <td></td>
                                </tr>*/
                            }
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { packsproductosReducer: state.packsproductosReducer };
};
const mapDispatchToProps = {
  GET_PRODUCTOS_PACK,
  ADD_PRODUCTO_PACK,
  GET_ENTIDADES,
  UPDATE_PRODUCTO_PACK,
  GET_CATEGORIAS,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportProductosPack);
