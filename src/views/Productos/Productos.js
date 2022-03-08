import React, { Component } from "react";
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
    Input,
    Label,
    FormGroup,
    CardTitle
} from "reactstrap";
import { connect } from "react-redux";
import Uploader from "../../components/Uploader";
import {
    GET_FARMACIA,
    UPDATE_FARMACIA
} from "../../redux/actions/farmaciaActions";
import { LOADPROFILE } from "../../redux/actions/authActions";
import starBlue from "../../../src/assets/images/icons/star-blue.png";
import starWhite from "../../../src/assets/images/icons/star-white.png";
import { image_path_server } from "../../config";
class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_producto: {
                imagen: null,
                nombre: "",
                sku: "",
                inventario: "hayexistencias",
                precio: "",
                favorito: false,
                descripcion: ""
            },
            editar_producto: {
                imagen: null,
                nombre: "",
                sku: "",
                inventario: "hayexistencias",
                precio: "",
                favorito: false,
                descripcion: ""
            },
            editar: false
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
            new_producto: { ...this.state.new_producto, [name]: value }
        });
    }

    async handleEditImagen(urlImagen) {
        await this.setState({
            new_producto: { ...this.state.new_producto, imagen: urlImagen }
        });
    }

    async SubmitNewProducto() {
        const { userprofile } = this.props.authReducer;
        this.props.UPDATE_FARMACIA({
            ...userprofile,
            productos: userprofile.productos.concat(this.state.new_producto)
        });
    }
    //Fin ALTAS

    //EDITAR
    async handleInputChangeEDIT(event) {
        const target = event.nativeEvent.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        await this.setState({
            editar_producto: { ...this.state.editar_producto, [name]: value }
        });
    }
    async handleEditImagenEDIT(urlImagen) {
        await this.setState({
            editar_producto: { ...this.state.editar_producto, imagen: urlImagen }
        });
    }
    async SubmitEDITProducto() {
        //await this.props.LOADPROFILE(this.props.authReducer.userprofile.usuario)
        const { userprofile } = this.props.authReducer;

        this.props.UPDATE_FARMACIA({
            ...userprofile,
            productos: userprofile.productos.map(p => {
                return p._id === this.state.editar_producto._id
                    ? this.state.editar_producto
                    : p;
            })
        });
    }
    //fin metodos editar

    //Eliminar
    async handleEliminarProducto(producto) {
        const { userprofile } = this.props.authReducer;

        this.props.UPDATE_FARMACIA({
            ...userprofile,
            productos: userprofile.productos.filter(p => p._id !== producto._id),
            papeleraProductos:
                userprofile.papeleraProductos !== undefined
                    ? userprofile.papeleraProductos.concat(producto)
                    : [producto]
        });
    }

    render() {
        const { userprofile } = this.props.authReducer;
        return (
            <div>
                <Row>
                    <Col xs="12" md="4">
                        <Button
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
                                        favorito: false
                                    }
                                });
                            }}
                        >
                            Agregar producto +
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <b>Mis Productos</b>
                                </CardTitle>
                            </CardHeader>
                            <div className="table-responsive table-fix">
                                <table className="table table-striped text-center">
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
                                        {userprofile.productos.map((p, index) => {
                                            return !p.esPromocion ? (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td width="10%">
                                                        {" "}
                                                        <CardImg
                                                            style={{ height: "50px", width: "50px" }}
                                                            src={image_path_server + p.imagen} />
                                                        {" "}
                                                    </td>
                                                    <td>
                                                        <Row>
                                                            <Col>
                                                                <p style={{ fontSize: 16 }}>{p.nombre}</p>
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
                                                                            editar_producto: p
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
                                                    <td md="2" className="pt-3" align="center">
                                                        {p.sku}
                                                    </td>
                                                    <td
                                                        md="2"
                                                        className="pt-3"
                                                        align="center"
                                                        style={{
                                                            color:
                                                                p.inventario === "hayexistencias"
                                                                    ? "green"
                                                                    : p.inventario === "sinexistencias"
                                                                        ? "red"
                                                                        : p.inventario === "pocasexistencias"
                                                                            ? "orange"
                                                                            : ""
                                                        }}
                                                    >
                                                        {p.inventario === "hayexistencias"
                                                            ? "En Stock"
                                                            : p.inventario === "sinexistencias"
                                                                ? "Sin Stock"
                                                                : p.inventario === "pocasexistencias"
                                                                    ? "Stock Limitado"
                                                                    : ""}
                                                    </td>
                                                    <td md="1" className="pt-3" align="center">
                                                        ${p.precio}
                                                    </td>
                                                    <td md="2" className="pt-3" align="center">
                                                        <img
                                                            src={p.favorito ? starBlue : starWhite}
                                                            alt="favorito"
                                                            width="30"
                                                            height="30"
                                                        ></img>
                                                    </td>
                                                    <td md="2" className="pt-3" align="center">
                                                        {p.fecha ? p.fecha.substring(0, 10) : null}
                                                    </td>
                                                </tr>
                                            ) : null;
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

                                        <div class="modal-header">
                                            <h5 class="modal-title">Productos</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <Row>
                                            <Col xs="12" sm="12">
                                                {this.state.editar ? ( //Debería crearse un componente para no repetir código
                                                    <Card>
                                                        <CardHeader>
                                                            <Row>
                                                                <Col>
                                                                    Edición de productos
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>
                                                        <CardBody className=" bg-secondary">
                                                            <Row>
                                                                <Col xs="12" md="4">
                                                                    <Label>Nombre</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="nombre"
                                                                        value={this.state.editar_producto.nombre}
                                                                        onChange={this.handleInputChangeEDIT}
                                                                    />
                                                                </Col>
                                                                <Col xs="12" md="4">
                                                                    <Label>Sku</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="sku"
                                                                        value={this.state.editar_producto.sku}
                                                                        onChange={this.handleInputChangeEDIT}
                                                                    />
                                                                </Col>
                                                                <Col xs="12" md="4" className=" text-center">
                                                                    <CardImg
                                                                        className="img-thumbnail"
                                                                        style={{ height: "150px", width: "150px" }}
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
                                                                <Col>
                                                                    <FormGroup>
                                                                        <Label>Inventario</Label>
                                                                        <Input
                                                                            type="select"
                                                                            name="inventario"
                                                                            value={
                                                                                this.state.editar_producto.inventario
                                                                            }
                                                                            onChange={this.handleInputChangeEDIT}
                                                                        >
                                                                            <option value="hayexistencias">
                                                                                En Stock
                                                                            </option>
                                                                            <option value="pocasexistencias">
                                                                                Stock Limitado
                                                                            </option>
                                                                            <option value="sinexistencias">
                                                                                Sin Stock
                                                                            </option>
                                                                        </Input>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col>
                                                                    <Label>Precio</Label>
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
                                                                <Col>
                                                                    <Label>Favorito</Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="favorito"
                                                                        value={this.state.editar_producto.favorito}
                                                                        onChange={this.handleInputChangeEDIT}
                                                                    >
                                                                        <option value={true}>SI</option>
                                                                        <option value={false}>NO</option>
                                                                    </Input>
                                                                </Col>
                                                            </Row>
                                                            <hr />
                                                            <Row>
                                                                <Col>
                                                                    <Label>descripción</Label>
                                                                    <textarea
                                                                        name="descripcion"
                                                                        value={
                                                                            this.state.editar_producto.descripcion
                                                                        }
                                                                        onChange={this.handleInputChangeEDIT}
                                                                        rows="10"
                                                                        cols="50"
                                                                        style={{
                                                                            borderColor: "gray",
                                                                            width: "100%"
                                                                        }}
                                                                    ></textarea>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                        <CardFooter>
                                                            <Row>
                                                                <Col>
                                                                    <Button
                                                                        color="danger"
                                                                        data-dismiss="modal"
                                                                        aria-label="Close"
                                                                        className={"mb-1"}
                                                                    >
                                                                        Cerrar
                                                                    </Button>
                                                                </Col>
                                                                <Col>
                                                                    <Button
                                                                        color="secondary"
                                                                        onClick={this.SubmitEDITProducto}
                                                                        className={"mb-1"}
                                                                    >
                                                                        Confirmar
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
                                                                    Nuevo producto
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>
                                                        <CardBody className=" bg-secondary">
                                                            <Row>
                                                                <Col xs="12" md="4">
                                                                    <Label>Nombre</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="nombre"
                                                                        value={this.state.new_producto.nombre}
                                                                        onChange={this.handleInputChange}
                                                                    />
                                                                </Col>
                                                                <Col xs="12" md="4">
                                                                    <Label>Sku</Label>
                                                                    <Input
                                                                        type="text"
                                                                        name="sku"
                                                                        value={this.state.new_producto.sku}
                                                                        onChange={this.handleInputChange}
                                                                    />
                                                                </Col>
                                                                <Col xs="12" md="4">
                                                                    <CardImg
                                                                        className=" img-thumbnail"
                                                                        style={{ height: "150px", width: "150px" }}
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
                                                                <Col>
                                                                    <Label>Inventario</Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="inventario"
                                                                        value={this.state.new_producto.inventario}
                                                                        onChange={this.handleInputChange}
                                                                    >
                                                                        <option value="hayexistencias">
                                                                            En Stock
                                                                        </option>
                                                                        <option value="pocasexistencias">
                                                                            Stock Limitado
                                                                        </option>
                                                                        <option value="sinexistencias">
                                                                            Sin Stock
                                                                        </option>
                                                                    </Input>
                                                                </Col>
                                                                <Col>
                                                                    <Label>Precio</Label>
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
                                                                <Col>
                                                                    <Label>Favorito</Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="favorito"
                                                                        value={this.state.new_producto.favorito}
                                                                        onChange={this.handleInputChange}
                                                                    >
                                                                        <option value={true}>SI</option>
                                                                        <option value={false}>NO</option>
                                                                    </Input>
                                                                </Col>
                                                            </Row>
                                                            <hr />
                                                            <Row>
                                                                <Col>
                                                                    <Label>descripción</Label>
                                                                    <textarea
                                                                        name="descripcion"
                                                                        value={this.state.new_producto.descripcion}
                                                                        onChange={this.handleInputChange}
                                                                        rows="10"
                                                                        cols="50"
                                                                        style={{
                                                                            borderColor: "gray",
                                                                            width: "100%"
                                                                        }}
                                                                    ></textarea>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                        <CardFooter>
                                                            <Row>
                                                                <Col>
                                                                    <Button
                                                                        color="danger"
                                                                        data-dismiss="modal"
                                                                        aria-label="Close"
                                                                        className={"mb-1"}
                                                                        onClick={() => this.setState({})}
                                                                    >
                                                                        Cerrar
                                                                    </Button>
                                                                </Col>
                                                                <Col>
                                                                    <Button
                                                                        color="secondary"
                                                                        onClick={this.SubmitNewProducto}
                                                                        className={"mb-1"}
                                                                    >
                                                                        Confirmar
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

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer
    };
};
const mapDispatchToProps = {
    GET_FARMACIA,
    UPDATE_FARMACIA,
    LOADPROFILE
};

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
