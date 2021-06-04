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

import { UPDATE_FARMACIA } from "../../../redux/actions/farmaciaActions";
import { image_path_server } from "../../../config";
class ProductosPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: null,
      entidadFilter: "",
      categoriaFilter: "",
      filtro: "",
      excepcionesProdFarmageo: [],
      excepcionesEntidadesFarmageo: [],
    };
  }

  async componentDidMount() {
    const { userprofile } = this.props.authReducer;
    this.props.GET_ENTIDADES();
    this.props.GET_PRODUCTOS_PACK();
    this.props.GET_CATEGORIAS();

    await this.setState({
      excepcionesProdFarmageo: userprofile.excepcionesProdFarmageo
        ? userprofile.excepcionesProdFarmageo
        : [],
      excepcionesEntidadesFarmageo: userprofile.excepcionesEntidadesFarmageo
        ? userprofile.excepcionesEntidadesFarmageo
        : [],
    });
  }

  handleFilter = (event) => {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleEntidadesEntidades = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (!value) {
      await this.setState({
        excepcionesEntidadesFarmageo: this.state.excepcionesEntidadesFarmageo.concat(
          name
        ),
      });
    } else {
      await this.setState({
        excepcionesEntidadesFarmageo: this.state.excepcionesEntidadesFarmageo.filter(
          (item) => {
            return item !== name;
          }
        ),
      });
    }
  };

  handleExcepcionesProductos = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (!value) {
      await this.setState({
        excepcionesProdFarmageo: this.state.excepcionesProdFarmageo.concat(
          name
        ),
      });
    } else {
      await this.setState({
        excepcionesProdFarmageo: this.state.excepcionesProdFarmageo.filter(
          (excep) => {
            return excep !== name;
          }
        ),
      });
    }
  };

  handleGuardarCambios = async () => {
    const { userprofile } = this.props.authReducer;
    this.props.UPDATE_FARMACIA({
      ...userprofile,
      excepcionesProdFarmageo: this.state.excepcionesProdFarmageo,
      excepcionesEntidadesFarmageo: this.state.excepcionesEntidadesFarmageo,
    });
  };

  render() {
    const {
      productos,
      entidades,
      categorias,
    } = this.props.packsproductosReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00D579",
                    color: "white",
                  }}
                  onClick={this.handleGuardarCambios}
                >
                  Guardar Cambios
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Entidades</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col style={{ marginBottom: 10 }}>
                        {entidades
                          .filter((e) => e.habilitado)
                          .map((entidad, index) => {
                            return (
                              <div className="form-check" key={index}>
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={entidad._id}
                                    onChange={this.handleEntidadesEntidades}
                                    checked={
                                      !this.state.excepcionesEntidadesFarmageo.includes(
                                        entidad._id
                                      )
                                    }
                                  />
                                  {entidad.nombre}
                                </label>
                              </div>
                            );
                          })}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>
                      Seleccionar los productos que quieres ofrecer en la app.
                    </b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="entidadFilter"
                          name="entidadFilter"
                          value={
                            this.state.entidadFilter !== null
                              ? this.state.entidadFilter
                              : ""
                          }
                          onChange={this.handleFilter}
                        >
                          <option value={""}>Todas las entidades...</option>
                          {entidades
                            .filter((e) => e.habilitado)
                            .map((entidad, index) => {
                              return (
                                <option value={entidad._id} key={index}>
                                  {entidad.nombre}
                                </option>
                              );
                            })}
                        </Input>
                      </Col>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="categoriaFilter"
                          name="categoriaFilter"
                          value={
                            this.state.categoriaFilter !== null
                              ? this.state.categoriaFilter
                              : ""
                          }
                          onChange={this.handleFilter}
                        >
                          <option value={""}>Todas las categorias...</option>
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
                        <Input
                          type="text"
                          placeholder="buscar producto..."
                          name="filtro"
                          onChange={this.handleFilter}
                        />
                      </Col>
                    </Row>
                    <hr />

                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>
                              <input type="checkbox" />
                            </th>
                            <th>SKU</th>
                            <th>Entidad</th>
                            <th>Categoria</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio al público</th>
                            {/*<th>Habilitado</th>*/}
                            <th>Descripción</th>
                            {/*<th>fecha de alta</th>*/}
                          </tr>
                        </thead>
                        <tbody>
                          {productos
                            .filter((p) => {
                              return (
                                p.entidad_id != null && p.categoria_id != null
                              );
                            })
                            .map((obj, index) => {
                              return !this.state.excepcionesEntidadesFarmageo.includes(
                                obj.entidad_id
                              ) &&
                                obj.entidad_id.includes(
                                  this.state.entidadFilter
                                ) &&
                                obj.categoria_id.includes(
                                  this.state.categoriaFilter
                                ) &&
                                obj.nombre
                                  .toUpperCase()
                                  .includes(this.state.filtro.toUpperCase()) &&
                                obj.habilitado ? (
                                <tr key={index}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      name={obj._id}
                                      id={obj.entidad_id}
                                      checked={
                                        !this.state.excepcionesProdFarmageo.includes(
                                          obj._id
                                        )
                                      }
                                      onChange={this.handleExcepcionesProductos}
                                    />
                                  </td>
                                  <td>{obj.sku}</td>
                                  <td>
                                    {entidades.map((entidad) => {
                                      return entidad._id === obj.entidad_id
                                        ? entidad.nombre
                                        : null;
                                    })}
                                  </td>
                                  <td>
                                    {categorias.map((categoria) => {
                                      return categoria._id === obj.categoria_id
                                        ? categoria.nombre
                                        : null;
                                    })}
                                  </td>
                                  <td style={{ width: "300px" }}>
                                    {obj.nombre}
                                  </td>
                                  <td>
                                    <CardImg
                                      src={
                                        obj.imagen != undefined
                                          ? image_path_server + obj.imagen
                                          : null
                                      }
                                      style={{ width: 100, paddingRight: 40 }}
                                    />
                                  </td>
                                  <td>{obj.precio}</td>
                                  <td>
                                    <p
                                      className="text-truncate"
                                      style={{ width: "150px" }}
                                    >
                                      {obj.descripcion}
                                    </p>
                                  </td>
                                </tr>
                              ) : null;
                            })}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <Button
                  style={{
                    float: "right",
                    backgroundColor: "#00D579",
                    color: "white",
                  }}
                  onClick={this.handleGuardarCambios}
                >
                  Guardar Cambios
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packsproductosReducer: state.packsproductosReducer,
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = {
  GET_PRODUCTOS_PACK,
  ADD_PRODUCTO_PACK,
  GET_ENTIDADES,
  UPDATE_PRODUCTO_PACK,
  GET_CATEGORIAS,
  UPDATE_FARMACIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductosPack);
