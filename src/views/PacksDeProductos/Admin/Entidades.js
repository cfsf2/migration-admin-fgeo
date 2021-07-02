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
import { image_path_server } from "../../../config";
import {
    GET_ENTIDADES,
    ADD_ENTIDAD,
    DELETE_ENTIDAD,
    UPDATE_ENTIDAD
} from "../../../redux/actions/packsproductosActions";

import Uploader from "../../../components/Uploader";

class Entidades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entidad: { nombre: "" },
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditImagenBanner = this.handleEditImagenBanner.bind(this);
        this.handleEditLogoProveeduria = this.handleEditLogoProveeduria.bind(this);
    }

    componentDidMount() {
        this.props.GET_ENTIDADES();
    }

    async handleEditImagenBanner(urlImagen) {
        await this.setState({
            entidad: {
                ...this.state.entidad,
                imagen: urlImagen,
            },
        });
    }
    async handleEditLogoProveeduria(urlImagen) {
        await this.setState({
            entidad: {
                ...this.state.entidad,
                logo: urlImagen,
            },
        });
    }
    async handleInputChange(event) {
        const target = event.nativeEvent.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            entidad: {
                ...this.state.entidad,
                [name]: value,
            },
        });
    }

    render() {

        const { entidades } = this.props.packsproductosReducer;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        <b>Listado de entidades</b>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                                                <Input
                                                    type="text"
                                                    placeholder="buscar entidad..."
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
                                                            entidad: null,
                                                        })
                                                    }
                                                >
                                                    + Nueva Entidad
                                                </Button>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <div className="table-responsive table-striped table-fix">
                                            <table className="table ">
                                                <thead className="bg-secondary">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Entidad</th>
                                                        <th>Rentabilidad %</th>
                                                        <th>E-mail</th>
                                                        <th>Título</th>
                                                        <th>Banner app/web</th>
                                                        <th>Logo proveeduria</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {entidades.map((entidad, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{entidad.entidadnombre}</td>
                                                                <td>{entidad.rentabilidad}</td>
                                                                <td>{entidad.email}</td>
                                                                <td>{entidad.nombre}</td>
                                                                <td>
                                                                    <CardImg
                                                                        src={
                                                                            entidad.imagen != undefined
                                                                                ? image_path_server + entidad.imagen
                                                                                : null
                                                                        }
                                                                        style={{ width: 100, paddingRight: 40 }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <CardImg
                                                                        src={
                                                                            entidad.logo != undefined
                                                                                ? image_path_server + entidad.logo
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
                                                                                entidad: entidad,
                                                                            })
                                                                        }
                                                                    >
                                                                        Editar
                                                                    </Button>
                                                                    <Button
                                                                        className="btn btn-danger"
                                                                        onClick=
                                                                        {
                                                                            () => {
                                                                                if (window.confirm('Confirma eliminar ?')) { this.props.DELETE_ENTIDAD(entidad._id) }
                                                                            }
                                                                        }
                                                                    >
                                                                        Eliminar
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
                                                <Col>
                                                    {this.state.editar
                                                        ? "Editar Entidad"
                                                        : "Nueva Entidad"}
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="titulo">
                                                            Mostrar en proveeduria
                                                        </Label>
                                                        <Input
                                                            type="select"
                                                            id="no_mostrar_en_proveeduria"
                                                            name="no_mostrar_en_proveeduria"
                                                            value={
                                                                this.state.entidad !== null
                                                                    ? this.state.entidad.no_mostrar_en_proveeduria
                                                                    : false
                                                            }
                                                            onChange={this.handleInputChange}
                                                        >
                                                            <option value={null}>Seleccionar...</option>
                                                            <option value={true}>No</option>
                                                            <option value={false}>SI</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="titulo">Nombre Entidad</Label>
                                                        <Input
                                                            type="text"
                                                            id="entidadnombre"
                                                            name="entidadnombre"
                                                            onChange={this.handleInputChange}
                                                            value={
                                                                this.state.entidad != null
                                                                    ? this.state.entidad.entidadnombre
                                                                    : ""
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="titulo">Rentabilidad (%)</Label>
                                                        <Input
                                                            type="number"
                                                            id="rentabilidad"
                                                            name="rentabilidad"
                                                            onChange={this.handleInputChange}
                                                            value={
                                                                this.state.entidad != null
                                                                    ? this.state.entidad.rentabilidad
                                                                    : ""
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <hr />
                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <Label htmlFor="titulo">E-mail</Label>
                                                        <Input
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            onChange={this.handleInputChange}
                                                            value={
                                                                this.state.entidad != null
                                                                    ? this.state.entidad.email
                                                                    : ""
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <hr />
                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <Label htmlFor="titulo">Título</Label>
                                                        <Input
                                                            type="text"
                                                            id="nombre"
                                                            name="nombre"
                                                            onChange={this.handleInputChange}
                                                            value={
                                                                this.state.entidad != null
                                                                    ? this.state.entidad.nombre
                                                                    : ""
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <hr />
                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <p>
                                                            <b>Imagen Banner app/web</b>
                                                        </p>
                                                        <CardImg
                                                            src={
                                                                this.state.entidad
                                                                    ? this.state.entidad.imagen !== undefined
                                                                        ? image_path_server +
                                                                        this.state.entidad.imagen
                                                                        : null
                                                                    : null
                                                            }
                                                        />
                                                        <Uploader
                                                            handleEditImagen={this.handleEditImagenBanner}
                                                            isPerfil={false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <hr />
                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <p>
                                                            <b>Logo proveeduria</b>
                                                        </p>
                                                        <CardImg
                                                            src={
                                                                this.state.entidad
                                                                    ? this.state.entidad.logo !== undefined
                                                                        ? image_path_server +
                                                                        this.state.entidad.logo
                                                                        : null
                                                                    : null
                                                            }
                                                        />
                                                        <Uploader
                                                            handleEditImagen={this.handleEditLogoProveeduria}
                                                            isPerfil={false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <hr />
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
                                                                this.props.UPDATE_ENTIDAD(this.state.entidad);
                                                            }}
                                                        >
                                                            Guardar Cambios
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            className="btn btn-success"
                                                            data-dismiss="modal"
                                                            onClick={() => {
                                                                this.props.ADD_ENTIDAD(this.state.entidad);
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
    return { packsproductosReducer: state.packsproductosReducer };
};
const mapDispatchToProps = {
    GET_ENTIDADES,
    DELETE_ENTIDAD,
    ADD_ENTIDAD,
    UPDATE_ENTIDAD,
};

export default connect(mapStateToProps, mapDispatchToProps)(Entidades);
