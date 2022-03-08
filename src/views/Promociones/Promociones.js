import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  //FormText,
  CardImg,
  CardFooter,
  CardTitle,
  Input,
  Label,
  //Label
} from "reactstrap";
import { connect } from "react-redux";
import Uploader from "../../components/Uploader";
import {
  GET_FARMACIA,
  UPDATE_FARMACIA,
} from "../../redux/actions/farmaciaActions";
import { LOADPROFILE } from "../../redux/actions/authActions";
import starBlue from "../../../src/assets/images/icons/star-blue.png";
import starWhite from "../../../src/assets/images/icons/star-white.png";
import { image_path_server } from "../../config";
class Promociones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_producto: {},
      editar_producto: {},
      editar: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditImagen = this.handleEditImagen.bind(this);
    this.SubmitNewProducto = this.SubmitNewProducto.bind(this);

    this.handleInputChangeEDIT = this.handleInputChangeEDIT.bind(this);
    this.handleEditImagenEDIT = this.handleEditImagenEDIT.bind(this);
    this.SubmitEDITProducto = this.SubmitEDITProducto.bind(this);

    this.handleEliminarProducto = this.handleEliminarProducto.bind(this);
  }

  //ALTAS
  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      new_producto: {
        ...this.state.new_producto,
        [name]: value,
      },
    });
  }
  async handleEditImagen(urlImagen) {
    await this.setState({
      new_producto: { ...this.state.new_producto, imagen: urlImagen },
    });
  }
  async SubmitNewProducto() {
    const { userprofile } = this.props.authReducer;
    this.props.UPDATE_FARMACIA({
      ...userprofile,
      productos: userprofile.productos.concat(this.state.new_producto),
    });
  }
  //Fin ALTAS

  //EDITAR
  async handleInputChangeEDIT(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      editar_producto: { ...this.state.editar_producto, [name]: value },
    });
  }
  async handleEditImagenEDIT(urlImagen) {
    await this.setState({
      editar_producto: { ...this.state.editar_producto, imagen: urlImagen },
    });
  }
  async SubmitEDITProducto() {
    const { userprofile } = this.props.authReducer;
    this.props.UPDATE_FARMACIA({
      ...userprofile,
      productos: userprofile.productos.map((p) => {
        return p._id === this.state.editar_producto._id
          ? this.state.editar_producto
          : p;
      }),
    });
  }
  //fin metodos editar

  //Eliminar producto
  async handleEliminarProducto(producto) {
    const { userprofile } = this.props.authReducer;
    this.props.UPDATE_FARMACIA({
      ...userprofile,
      productos: userprofile.productos.filter((p) => p._id !== producto._id),
      papeleraProductos:
        userprofile.papeleraProductos !== undefined
          ? userprofile.papeleraProductos.concat(producto)
          : [producto],
    });
  }

  render() {
    const { userprofile } = this.props.authReducer;
    return (
      <div>
        <Row>
          <Col>
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              onClick={() => {
                this.setState({
                  editar: false,
                  new_producto: {
                    imagen: null,
                    nombre: "",
                    sku: "",
                    inventario: "hayexistencias",
                    precio: "",
                    favorito: false,
                    esPromocion: true,
                    orden_perfil: 0,
                  },
                });
              }}
            >
              Agregar Promoción +
            </button>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Mis Promociones</b>
              </CardHeader>
              <div className="table-responsive table-fix">
                <table className="table table-striped">
                  <thead className="bg-dark">
                    <tr>
                      <th>Orden</th>
                      <th>Título de promoción</th>
                      <th>Fechas</th>
                      <th>Imagen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userprofile.productos.map((p, index) => {
                      return !p.esPromocion ? null : (
                        <tr key={index}>
                          <td>{p.orden_perfil}</td>
                          <td>
                            <Row>
                              <Col>
                                <p style={{ fontSize: 20 }}>{p.nombre}</p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary"
                                  data-toggle="modal"
                                  data-target=".bd-example-modal-lg"
                                  onClick={() => {
                                    this.setState({
                                      editar: true,
                                      editar_producto: p,
                                    });
                                  }}
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => {
                                    this.handleEliminarProducto(p);
                                  }}
                                >
                                  Enviar a la papelera
                                </button>
                              </Col>
                            </Row>
                          </td>
                          <td>
                            <Row>
                              <Col>
                                <b>Fecha Publicación</b>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                {p.fecha_publicacion
                                  ? p.fecha_publicacion.substring(0, 10)
                                  : null}
                              </Col>
                            </Row>
                            <Row className="mt-1">
                              <Col>
                                <b>Fecha Límite</b>
                              </Col>
                            </Row>
                            <Row>
                              {" "}
                              <Col>
                                {" "}
                                {p.fecha_limite
                                  ? p.fecha_limite.substring(0, 10)
                                  : null}
                              </Col>
                            </Row>
                          </td>
                          <td style={{ width: "300px" }}>
                            <CardImg src={image_path_server + p.imagen} />
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
                    <Row>
                      <Col xs="12" sm="12">
                        {this.state.editar ? ( //Debería separarse en 2 componentes
                          <Card>
                            <CardHeader>
                              <Row>
                                <Col md="6" xs="12" className="my-2">
                                  <b>Editar Promoción: </b>{" "}
                                </Col>
                                <Col md="6" xs="12" className="my-2">
                                  {this.state.editar_producto.nombre}
                                </Col>
                              </Row>
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Título</b>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="nombre"
                                    value={this.state.editar_producto.nombre}
                                    onChange={this.handleInputChangeEDIT}
                                  />
                                </Col>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Imagen</b>
                                  </Label>
                                  <CardImg
                                    src={
                                      this.state.editar_producto.imagen !== null
                                        ? image_path_server +
                                          this.state.editar_producto.imagen
                                        : null
                                    }
                                  />
                                  <Uploader
                                    handleEditImagen={this.handleEditImagenEDIT}
                                    isPerfil={false}
                                  />
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Inventario</b>
                                  </Label>
                                  <Input
                                    type="select"
                                    name="inventario"
                                    value={
                                      this.state.editar_producto.inventario
                                    }
                                    onChange={this.handleInputChangeEDIT}
                                  >
                                    <option value="hayexistencias">
                                      Hay existencias
                                    </option>
                                    <option value="pocasexistencias">
                                      Pocas existencias
                                    </option>
                                    <option value="sinexistencias">
                                      Sin existencias
                                    </option>
                                  </Input>
                                </Col>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Orden en el perfil</b>
                                  </Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="50"
                                    step="1"
                                    name="orden_perfil"
                                    value={
                                      this.state.editar_producto.orden_perfil
                                    }
                                    onChange={this.handleInputChangeEDIT}
                                  />
                                </Col>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Precio</b>
                                  </Label>
                                  <Input
                                    type="number"
                                    min="0.00"
                                    max="10000.00"
                                    step="0.01"
                                    name="precio"
                                    value={this.state.editar_producto.precio}
                                    onChange={this.handleInputChangeEDIT}
                                  />
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Fecha de publicación</b>
                                  </Label>
                                  <Input
                                    type="date"
                                    name="fecha_publicacion"
                                    value={
                                      this.state.editar_producto
                                        .fecha_publicacion
                                    }
                                    onChange={this.handleInputChangeEDIT}
                                  />
                                </Col>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Fecha límite de publicación</b>
                                  </Label>
                                  <Input
                                    type="date"
                                    name="fecha_limite"
                                    value={
                                      this.state.editar_producto.fecha_limite
                                    }
                                    onChange={this.handleInputChangeEDIT}
                                  />
                                </Col>
                              </Row>
                            </CardBody>
                            <CardFooter>
                              <Row>
                                <Col>
                                  <Button
                                    onClick={this.SubmitEDITProducto}
                                    className="mb-1 mr-2 btn btn-success"
                                  >
                                    Confirmar
                                  </Button>
                                  <Button
                                    color="danger"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    className={"mb-1"}
                                  >
                                    Cancelar
                                  </Button>
                                </Col>
                              </Row>
                            </CardFooter>
                          </Card>
                        ) : (
                          <Card>
                            <CardHeader>
                              <Row>
                                <Col>
                                  <b>Nueva Promoción</b>
                                </Col>
                              </Row>
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Título de la promoción</b>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="nombre"
                                    value={this.state.new_producto.nombre}
                                    onChange={this.handleInputChange}
                                  />
                                </Col>
                                <Col md="6" xs="12" className="mt-2">
                                  <Label>
                                    <b>Imagen</b>
                                  </Label>
                                  <CardImg
                                    src={
                                      this.state.new_producto.imagen !== null
                                        ? image_path_server +
                                          this.state.new_producto.imagen
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
                              <Row>
                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Inventario</b>
                                  </Label>
                                  <Input
                                    type="select"
                                    name="inventario"
                                    value={this.state.new_producto.inventario}
                                    onChange={this.handleInputChange}
                                  >
                                    <option value="hayexistencias">
                                      Hay existencias
                                    </option>
                                    <option value="pocasexistencias">
                                      Pocas existencias
                                    </option>
                                    <option value="sinexistencias">
                                      Sin existencias
                                    </option>
                                  </Input>
                                </Col>

                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Orden en el perfil</b>
                                  </Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="50"
                                    step="1"
                                    name="orden_perfil"
                                    value={this.state.new_producto.orden_perfil}
                                    onChange={this.handleInputChange}
                                  />
                                </Col>

                                <Col md="6" xs="12" className="my-2">
                                  <Label>
                                    <b>Precio</b>
                                  </Label>
                                  <Input
                                    type="number"
                                    min="0.00"
                                    max="10000.00"
                                    step="0.01"
                                    name="precio"
                                    value={this.state.new_producto.precio}
                                    onChange={this.handleInputChange}
                                  />
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col className="my-2">
                                  <Label>
                                    <b>Fecha de publicación</b>
                                  </Label>
                                  <Input
                                    type="date"
                                    name="fecha_publicacion"
                                    onChange={this.handleInputChange}
                                    value={
                                      this.state.new_producto.fecha_publicacion
                                    }
                                  />
                                </Col>
                                <Col className="my-2">
                                  <Label>
                                    <b>Fecha límite de publicación</b>
                                  </Label>
                                  <Input
                                    type="date"
                                    name="fecha_limite"
                                    onChange={this.handleInputChange}
                                    value={this.state.new_producto.fecha_limite}
                                  />
                                </Col>
                              </Row>
                            </CardBody>
                            <CardFooter>
                              <Row>
                                <Col>
                                  <Button
                                    color="primary"
                                    onClick={this.SubmitNewProducto}
                                    className="mb-1 mr-2 btn btn-success"
                                  >
                                    Confirmar
                                  </Button>
                                  <Button
                                    color="danger"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    className={"mb-1"}
                                  >
                                    Cancelar
                                  </Button>
                                </Col>
                              </Row>
                            </CardFooter>
                          </Card>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
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
  };
};
const mapDispatchToProps = {
  GET_FARMACIA,
  UPDATE_FARMACIA,
  LOADPROFILE,
};

export default connect(mapStateToProps, mapDispatchToProps)(Promociones);
