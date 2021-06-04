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
class PapeleraProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editar_producto: {
        imagen: null,
        nombre: "",
        sku: "",
        inventario: "hayexistencias",
        precio: "",
        favorito: false,
      },
    };
    this.handleRestaurarProducto = this.handleRestaurarProducto.bind(this);
    this.handleEliminarProducto = this.handleEliminarProducto.bind(this);
  }

  async handleRestaurarProducto(producto) {
    const { userprofile } = this.props.authReducer;
    this.props.UPDATE_FARMACIA({
      ...userprofile,
      productos: userprofile.productos.concat(producto),
      papeleraProductos: userprofile.papeleraProductos.filter(
        (p) => p._id !== producto._id
      ),
    });
  }

  async handleEliminarProducto(producto) {
    const { userprofile } = this.props.authReducer;
    this.props.UPDATE_FARMACIA({
      ...userprofile,
      papeleraProductos: userprofile.papeleraProductos.filter(
        (p) => p._id !== producto._id
      ),
    });
  }

  render() {
    const { userprofile } = this.props.authReducer;
    return (
      <div>
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <b>Papelera de productos y promociones</b>
                </CardTitle>
              </CardHeader>
              <div className="table-responsive table-fix">
                <table className="table table-striped">
                  <thead className="bg-dark">
                    <tr>
                      <th>#</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>SKU</th>
                      <th>Inventario</th>
                      <th>Precio</th>
                      <th>Favorito</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userprofile.papeleraProductos !== undefined
                      ? userprofile.papeleraProductos.map((p, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td width="10%">
                                <CardImg src={image_path_server + p.imagen} />
                              </td>
                              <td>
                                <Row>
                                  <Col>
                                    <p style={{ fontSize: 20 }}>{p.nombre}</p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Button
                                      type="button"
                                      className="btn btn-warning my-1"
                                      onClick={() => {
                                        this.handleRestaurarProducto(p);
                                      }}
                                    >
                                      Recuperar producto
                                    </Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <Button
                                      type="button"
                                      className="btn btn-danger my-1"
                                      onClick={() => {
                                        this.handleEliminarProducto(p);
                                      }}
                                    >
                                      Eliminar producto
                                    </Button>
                                  </Col>
                                </Row>
                              </td>
                              <td>{p.sku}</td>
                              <td
                                style={{
                                  color:
                                    p.inventario === "hayexistencias"
                                      ? "green"
                                      : p.inventario === "sinexistencias"
                                      ? "red"
                                      : p.inventario === "pocasexistencias"
                                      ? "orange"
                                      : "",
                                }}
                              >
                                {p.inventario === "hayexistencias"
                                  ? "Hay existencias"
                                  : p.inventario === "sinexistencias"
                                  ? "Sin existencias"
                                  : p.inventario === "pocasexistencias"
                                  ? "Pocas existencias"
                                  : ""}
                              </td>
                              <td>${p.precio}</td>
                              <td>
                                <img
                                  src={p.favorito ? starBlue : starWhite}
                                  alt="favorito"
                                  width="30"
                                  height="30"
                                ></img>
                              </td>
                              <td>{p.fecha}</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(PapeleraProductos);
