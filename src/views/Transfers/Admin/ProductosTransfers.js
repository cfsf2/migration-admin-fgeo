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

import AsignarInstitucion from "../../FarmaciasAdmin/components/AsignarInstituciones";

import { connect } from "react-redux";
import {
  GET_PRODUCTOS_TRANSFERS,
  ADD_PRODUCTO_TRANSFER,
  GET_LABORATORIOS,
  UPDATE_PRODUCTO_TRANSFER,
  DELETE_PRODUCTO_TRANSFER,
} from "../../../redux/actions/transfersActions";
import Uploader from "../../../components/Uploader";
import { image_path_server } from "../../../config";
class ProductosTransfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: null,
      labFilter: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditImagen = this.handleEditImagen.bind(this);
    this.handleBlanquear = this.handleBlanquear.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleListadoPapelera = this.handleListadoPapelera.bind(this);
  }

  async handleListadoPapelera() {
    const { productos } = this.props.tranfersReducer;
    const filter = await productos.filter((p) => {
      return p.laboratorioid === this.state.labFilter;
    });
    filter.map((f) => {
      this.props.DELETE_PRODUCTO_TRANSFER(f);
    });
  }

  componentDidMount() {
    this.props.GET_LABORATORIOS();
    this.props.GET_PRODUCTOS_TRANSFERS();
  }

  async handleEditImagen(urlImagen) {
    await this.setState({
      producto: {
        ...this.state.producto,
        imagen: urlImagen,
      },
    });
  }
  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    //console.log([name] + ": " + value);
    this.setState({
      producto: {
        ...this.state.producto,
        [name]: value,
      },
    });
  }

  handleFilter(event) {
    const target = event.nativeEvent.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleBlanquear() {
    this.setState({
      producto: null,
    });
  }

  render() {
    const { productos, laboratorios } = this.props.tranfersReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de productos</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="labFilter"
                          name="labFilter"
                          value={
                            this.state.labFilter !== null
                              ? this.state.labFilter
                              : ""
                          }
                          onChange={this.handleFilter}
                        >
                          <option value={null}>Laboratorio...</option>
                          {laboratorios.map((lab, index) => {
                            return (
                              <option value={lab._id} key={index}>
                                {lab.nombre}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar producto..."
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
                              producto: null,
                            })
                          }
                        >
                          + Nuevo Producto
                        </Button>
                        <Button
                          className="btn btn-danger"
                          onClick={this.handleListadoPapelera}
                        >
                          Enviar Listado a papelara
                        </Button>
                      </Col>
                    </Row>

                    <hr />

                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>Código</th>
                            <th>Laboratorio</th>
                            <th>Producto / Presentación</th>
                            <th>Imagen</th>
                            <th>Cantidad Mínima</th>
                            <th>%</th>
                            <th>Habilitado</th>
                            <th>Última modificación</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((obj, index) => {
                            return this.state.labFilter === null ||
                              this.state.labFilter === obj.laboratorioid ? (
                              <tr key={index}>
                                <td>{obj.codigo}</td>
                                <td>
                                  {laboratorios.map((lab, index) => {
                                    return lab._id === obj.laboratorioid
                                      ? lab.nombre
                                      : null;
                                  })}
                                </td>
                                <td>
                                  {obj.nombre} / {obj.presentacion}{" "}
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
                                <td>{obj.cantidad_minima}</td>
                                <td>{obj.descuento_porcentaje}</td>
                                <td>{obj.habilitado ? "Si" : "No"}</td>
                                <td>{obj.fechaalta.substring(0, 10)}</td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      this.setState({
                                        editar: true,
                                        producto: obj,
                                      })
                                    }
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      this.props.DELETE_PRODUCTO_TRANSFER(obj)
                                    }
                                  >
                                    Enviar a Papelera
                                  </Button>
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
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          {this.state.editar ? (
                            <b>Editar producto</b>
                          ) : (
                            <b>Nuevo producto</b>
                          )}
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Habilitado</Label>
                            <Input
                              type="select"
                              id="habilitado"
                              name="habilitado"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.habilitado
                                  : ""
                              }
                              onChange={this.handleInputChange}
                            >
                              <option value={null}>Seleccionar...</option>
                              <option value={true}>SI</option>
                              <option value={false}>NO</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label htmlFor="titulo">Código</Label>
                                <Input
                                  type="text"
                                  id="codigo"
                                  name="codigo"
                                  onChange={this.handleInputChange}
                                  value={
                                    this.state.producto !== null
                                      ? this.state.producto.codigo
                                      : ""
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label htmlFor="titulo">Precio</Label>
                                <Input
                                  type="Number"
                                  id="precio"
                                  name="precio"
                                  onChange={this.handleInputChange}
                                  value={
                                    this.state.producto !== null
                                      ? this.state.producto.precio
                                      : ""
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <p>
                            <b>Imagen</b>
                          </p>
                          <CardImg
                            src={
                              this.state.producto
                                ? this.state.producto.imagen !== undefined
                                  ? image_path_server +
                                    this.state.producto.imagen
                                  : null
                                : null
                            }
                          />
                          <Uploader
                            handleEditImagen={this.handleEditImagen}
                            isPerfil={false}
                          />
                        </Col>
                      </Row>

                      <hr />
                      <FormGroup>
                        <Row>
                          <Col>
                            <Label htmlFor="titulo">Nombre</Label>
                            <Input
                              type="text"
                              id="nombre"
                              name="nombre"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.nombre
                                  : ""
                              }
                            />
                          </Col>
                          <Col>
                            <Label htmlFor="titulo">Presentación</Label>
                            <Input
                              type="text"
                              id="presentacion"
                              name="presentacion"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.presentacion
                                  : ""
                              }
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col>
                            <Label htmlFor="titulo">Laboratorio</Label>
                            <Input
                              type="select"
                              id="laboratorioid"
                              name="laboratorioid"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.laboratorioid
                                  : ""
                              }
                              onChange={this.handleInputChange}
                            >
                              <option value={null}>Seleccionar...</option>
                              {laboratorios.map((lab, index) => {
                                return (
                                  <option value={lab._id} key={index}>
                                    {lab.nombre}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        </Row>
                      </FormGroup>

                      <hr />
                      <FormGroup>
                        <Row>
                          <Col>
                            <Label htmlFor="titulo">Cantidad Mínima</Label>
                            <Input
                              type="Number"
                              id="cantidad_minima"
                              name="cantidad_minima"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.cantidad_minima
                                  : ""
                              }
                            />
                          </Col>
                          <Col>
                            <Label htmlFor="titulo">
                              Porcentaje de Descuento
                            </Label>
                            <Input
                              type="Number"
                              id="descuento_porcentaje"
                              name="descuento_porcentaje"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.descuento_porcentaje
                                  : ""
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="productotransfer_asignar p-3">
                          <AsignarInstitucion
                            obj={
                              this.state.producto
                                ? this.state.producto
                                : undefined
                            }
                            setObj={this.setState.bind(this)}
                          />
                        </Row>
                      </FormGroup>
                      <hr />
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col>
                          {" "}
                          <Button
                            className="btn btn-warning"
                            onClick={this.handleBlanquear}
                          >
                            Blanquear
                          </Button>
                        </Col>

                        <Col>
                          {this.state.editar ? (
                            <Button
                              className="btn btn-success"
                              data-dismiss="modal"
                              onClick={() => {
                                this.props.UPDATE_PRODUCTO_TRANSFER(
                                  this.state.producto
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
                                this.props.ADD_PRODUCTO_TRANSFER(
                                  this.state.producto,
                                  this.state.instituciones
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
  GET_PRODUCTOS_TRANSFERS,
  ADD_PRODUCTO_TRANSFER,
  GET_LABORATORIOS,
  UPDATE_PRODUCTO_TRANSFER,
  DELETE_PRODUCTO_TRANSFER,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductosTransfers);
