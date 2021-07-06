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
    Label,
    CardFooter,
} from "reactstrap";

import { forwardRef } from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { connect } from "react-redux";
import {
    ADD_PUBLICIDAD,
    GET_PUBLICIDADES,
    UPDATE_PUBLICIDAD,
    DELETE_PUBLICIDAD
} from "../../redux/actions/publicidadesActions";

import MaterialTable from "material-table";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                "&:hover": {
                    backgroundColor: "#378FC3",
                    opacity: 0.8,
                }
            }
        }
    }
});


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Delete2: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />)
};


class Novedades extends Component {

    constructor(props) {
        super(props);
        this.state = {

            editar: null,
            novedad: null,
            novedadFilter: "",
            filtro: "",
            novedades: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConfirmar = this.handleConfirmar.bind(this);
    }

    async componentDidMount() {
        this.props.GET_PUBLICIDADES();
    }

    async handleInputChange(event) {
        const target = event.nativeEvent.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            novedad: {
                ...this.state.novedad,
                [name]: value,
            },
        });
    }

    async handleConfirmar() {
        this.props.ADD_PUBLICIDAD(
            this.props.authReducer.user.username,
            this.state.novedad
        );
    }

    handleFilter(event) {
        const target = event.nativeEvent.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <Button
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                        this.setState({
                                            editar: false,
                                            novedad: {
                                                username: this.props.authReducer.user.username,
                                                tipo: "novedadesadmin",
                                                titulo: "sin título",
                                                descripcion: "",
                                                link: "",
                                                imagen: "",
                                                habilitado: true,
                                                color: "verde",
                                            },
                                        })
                                    }
                                >
                                    + Agregar Novedad
                                </Button>
                            </CardHeader>
                            <CardBody>

                                <ThemeProvider theme={theme}>
                                    <MaterialTable

                                        title="Listado de Novedades"
                                        hideSortIcon={false}
                                        icons={tableIcons}
                                        localization={{
                                            header: {
                                                actions: "Acciones",
                                            },
                                            body: {
                                                emptyDataSourceMessage: 'No se encontraron datos',
                                            },
                                            pagination: {
                                                labelDisplayedRows: '{from}-{to} de {count}',
                                                labelRowsSelect: 'Filas',
                                                labelRowsPerPage: 'Productos x pág',
                                                firstAriaLabel: 'Primera',
                                                lastAriaLabel: 'Ultima',
                                                firstTooltip: 'Primera página',
                                                lastTooltip: 'Ultima página',
                                                previousAriaLabel: 'Página anterior',
                                                previousTooltip: 'Página anterior',
                                                nextAriaLabel: 'Próxima pagina',
                                                nextTooltip: 'Próxima pagina'
                                            },
                                            toolbar: {
                                                searchTooltip: 'Buscar',
                                                searchPlaceholder: 'Buscar'
                                            }
                                        }}
                                        columns={[
                                            {
                                                title: 'Color', field: 'color', width: '5%', 
                                                render: rowData => 
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            rowData.color === "verde"
                                                                ? "#00D579"
                                                                : rowData.color === "rojo"
                                                                    ? "red"
                                                                    : "yellow",
                                                        color: "white",
                                                        borderRadius: "50%",
                                                        width: 20,
                                                        height: 20,
                                                        borderWidth: 10,
                                                        borderColor: "black",
                                                        opacity: rowData.habilitado ? 1 : 0.4,}}>

                                                </div>
                                            },
                                            { title: 'Titulo', field: 'titulo', width: '5%', render: rowData => <p style={{ textJustify: "initial", fontSize: 12, fontWeight: "bold", opacity: rowData.habilitado ? 1 : 0.4, }} className="d-inline" > {rowData.titulo} </p> },
                                            { title: 'Fecha Alta', field: 'fechaalta', width: '5%', render: rowData => new Date(rowData.fechaalta).toLocaleDateString("es-AR") },
                                            { title: 'Descripción', field: 'descripcion', width: '75%' },
                                            { title: 'Editar', field: 'editNovedad', width: '5%', render: rowData => <Button data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => this.setState({ editar: true, novedad: rowData, })} className="btn btn-sm btn-info">Editar</Button> },
                                            { title: 'Borrar', field: 'borrarNovedad', width: '5%', render: rowData => <Button onClick={() => { if (window.confirm('Confirma eliminar ?')) { this.props.DELETE_PUBLICIDAD(rowData) }} } className="btn btn-sm btn-danger"> Eliminar </Button> },
                                        ]}
                                        data=
                                        {
                                            this.props.publicidadesReducer.publicidades
                                                .filter(function (p) {
                                                    if (p.tipo !== "novedadesadmin") {
                                                        return false; // skip
                                                    }
                                                    return true;
                                                }
                                                ).map((p) => {
                                                    return p;
                                                })
                                        }
                                        actions={[]}
                                        options={{
                                            actionsColumnIndex: -1,
                                            pageSize: 5,
                                            pageSizeOptions: [5, 10, 20, 30],
                                            headerStyle: {
                                                backgroundColor: "#378FC3",
                                                color: "#FFF",
                                                textAlign: "center",
                                                fontWeight: "bold"
                                            }
                                        }}

                                    />
                                </ThemeProvider>

                                {/* <Row>
                                    <Col>
                                        <Card>
                                            <CardHeader>
                                                <b>Listado de Novedades</b>
                                            </CardHeader>
                                            <CardBody>
                                                {this.props.publicidadesReducer.publicidades.map(
                                                    (p, index) => {
                                                        return p.tipo === "novedadesadmin" ? (
                                                            <Fragment key={index}>
                                                                <Row>
                                                                    <Col>
                                                                        <Row>
                                                                            <Col xs="1" md="1" className="my-2">
                                                                                <div
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            p.color === "verde"
                                                                                                ? "#00D579"
                                                                                                : p.color === "rojo"
                                                                                                    ? "red"
                                                                                                    : "yellow",
                                                                                        color: "white",
                                                                                        borderRadius: "50%",
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                        borderWidth: 10,
                                                                                        borderColor: "black",
                                                                                        opacity: p.habilitado ? 1 : 0.4,
                                                                                    }}
                                                                                ></div>
                                                                            </Col>
                                                                            <Col xs="10" md="6" className="my-2">
                                                                                <p
                                                                                    style={{
                                                                                        textJustify: "initial",
                                                                                        fontSize: 12,
                                                                                        fontWeight: "bold",
                                                                                        opacity: p.habilitado ? 1 : 0.4,
                                                                                    }}
                                                                                    className="d-inline"
                                                                                >
                                                                                    {p.titulo}
                                                                                </p>
                                                                            </Col>
                                                                            <Col xs="6" md="2" className="my-2">
                                                                                <Button
                                                                                    data-toggle="modal"
                                                                                    data-target=".bd-example-modal-lg"
                                                                                    onClick={() =>
                                                                                        this.setState({
                                                                                            editar: true,
                                                                                            novedad: p,
                                                                                        })
                                                                                    }
                                                                                    className="btn btn-sm btn-info"
                                                                                >
                                                                                    Editar
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        this.props.DELETE_PUBLICIDAD(p)
                                                                                    }
                                                                                    className="btn btn-sm btn-danger"
                                                                                >
                                                                                    Eliminar
                                                                                </Button>
                                                                            </Col>
                                                                            <Col xs="6" md="3" className="my-2">
                                                                                {p.fechaalta.substring(0, 10)}
                                                                            </Col>
                                                                        </Row>

                                                                        <Row>
                                                                            <Col md="1"></Col>
                                                                            <Col xs="12" md="11" className="my-2">
                                                                                <p
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                        opacity: p.habilitado ? 1 : 0.4,
                                                                                    }}
                                                                                >
                                                                                    {p.descripcion}
                                                                                </p>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                                <hr />
                                                            </Fragment>
                                                        ) : null;
                                                    }
                                                )}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row> */}
                                <div
                                    className="modal fade bd-example-modal-lg"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-labelledby="myLargeModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            {this.state.novedad !== null ? (
                                                <Row>
                                                    <Col xs="12" sm="12">
                                                        <Card>
                                                            <CardHeader>
                                                                <Row>
                                                                    <Col>Agregar Novedad</Col>
                                                                </Row>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <Row>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label htmlFor="titulo">Título</Label>
                                                                            <Input
                                                                                type="text"
                                                                                id="titulo"
                                                                                name="titulo"
                                                                                onChange={this.handleInputChange}
                                                                                value={this.state.novedad.titulo}
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col className="col-3">
                                                                        <FormGroup>
                                                                            <Label htmlFor="habilitado">
                                                                                Mostrar en Novedades
                                                                            </Label>
                                                                            <Input
                                                                                type="select"
                                                                                id="habilitado"
                                                                                name="habilitado"
                                                                                onChange={this.handleInputChange}
                                                                                value={this.state.novedad.habilitado}
                                                                            >
                                                                                <option value={true}>SI</option>
                                                                                <option value={false}>NO</option>
                                                                            </Input>
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>

                                                                <hr />
                                                                <FormGroup>
                                                                    <Row>
                                                                        <Col>
                                                                            <Label htmlFor="descripcion">
                                                                                Descripción
                                                                            </Label>
                                                                            <textarea
                                                                                id="descripcion"
                                                                                name="descripcion"
                                                                                onChange={this.handleInputChange}
                                                                                style={{ height: 200, width: "100%" }}
                                                                                value={this.state.novedad.descripcion}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </FormGroup>
                                                                <hr />
                                                                <FormGroup>
                                                                    <Row>
                                                                        <Col className="col-3">
                                                                            <Label htmlFor="color" className="ml-3">
                                                                                Color
                                                                            </Label>
                                                                            <select
                                                                                id="color"
                                                                                name="color"
                                                                                style={{ marginLeft: 20 }}
                                                                                onChange={this.handleInputChange}
                                                                                value={this.state.novedad.color}
                                                                            >
                                                                                <option value="verde">Verde</option>
                                                                                <option value="rojo">Rojo</option>
                                                                                <option value="amarillo">
                                                                                    Amarillo
                                                                                </option>
                                                                            </select>
                                                                        </Col>
                                                                        <Col className="col-1" align="center">
                                                                            <div
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        this.state.novedad.color === "verde"
                                                                                            ? "#00D579"
                                                                                            : this.state.novedad.color ===
                                                                                                "rojo"
                                                                                                ? "red"
                                                                                                : "yellow",
                                                                                    color: "white",
                                                                                    borderRadius: "50%",
                                                                                    width: 20,
                                                                                    height: 20,
                                                                                    borderWidth: 10,
                                                                                    borderColor: "black",
                                                                                }}
                                                                            ></div>
                                                                        </Col>
                                                                        <Col className="col-8"></Col>
                                                                    </Row>
                                                                </FormGroup>
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
                                                                                    this.props.UPDATE_PUBLICIDAD(
                                                                                        this.state.novedad
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Guardar Cambios
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                className="btn btn-success"
                                                                                onClick={this.handleConfirmar}
                                                                                data-dismiss="modal"
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
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
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
        publicidadesReducer: state.publicidadesReducer,
    };
};
const mapDispatchToProps = {
    ADD_PUBLICIDAD,
    GET_PUBLICIDADES,
    UPDATE_PUBLICIDAD,
    DELETE_PUBLICIDAD,
};

export default connect(mapStateToProps, mapDispatchToProps)(Novedades);
