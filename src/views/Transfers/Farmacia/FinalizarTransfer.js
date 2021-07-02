import React, { Component, Fragment, forwardRef } from "react";

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
import axios from "axios";
import { farmageo_api } from "../../../config";

import { connect } from "react-redux";
import LineaProducto from "./components/LineaProducto";
import {
    ADD_TRANSFER,
    SUBMITTING,
} from "../../../redux/actions/transfersActions";

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
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



class FinalizarTransfer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transfer: { fecha: new Date(Date.now()).toISOString().substring(0, 10) },
            productos: [],
            finalizar: false,
            vistaprevia: false,
            submitting: false,
            lab_selected: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFiltroFinalizar = this.handleFiltroFinalizar.bind(this);
        this.handleVistaPrevia = this.handleVistaPrevia.bind(this);
        this.handleLineaChange = this.handleLineaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createHtmlMail = this.createHtmlMail.bind(this);
        this.handleLimpiarProductos = this.handleLimpiarProductos.bind(this);
        this.handlequery = this.handlequery.bind(this);
    }

    handleVistaPrevia(value) {

        this.setState({
            vistaprevia: value,
        });
    }

    handleFiltroFinalizar(value) {
        console.log("FILTRO FINALIZAR " + value)
        let nuevoStado = false;
        if (value) {

            let productosFiltrados = [];

            this.state.productos.forEach(producto => {
                if (producto.cantidad >= producto.cantidad_minima) {
                    productosFiltrados.push(producto);
                    nuevoStado = true;
                }
            })

            this.setState({
                productos: productosFiltrados,
            });
            if (nuevoStado) {

                this.setState({
                    vistaprevia: value,
                    finalizar: value,
                });
            }
        } else {
            this.setState({
                vistaprevia: value,
                finalizar: value,
            });
        }
    }




handleLimpiarProductos() {
    this.setState({
        productos: [],
    });
}

async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
        transfer: { ...this.state.transfer, [name]: value },
    });
}

async handleLineaChange(linea, minimo) {
    // console.log(linea);
    let _productos = await this.state.productos.filter((p) => {
        return p._id != linea._id;
    });

    if (linea.cantidad >= minimo) {
        _productos = await _productos.concat(linea);
    }

    await this.setState({
        productos: _productos,
    });
}

createHtmlMail = async (transfer, direccioncompleta) => {
    let body = await `<head>
                        <style>
                          table {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                          }
                          
                          td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                          }
                          
                          tr:nth-child(even) {
                            background-color: #dddddd;
                          }

                        </style>
                      </head>
                      <body>
                        <div>
                          <p><b>Farmacia: </b>${transfer.farmacia_nombre}</p>
                          <p><b>Nº Farmacia: </b>${transfer.farmacia_id}</p>
                          <p><b>N° de cuenta de Droguería: </b>${transfer.nro_cuenta_drogueria
        }</p> 
                          <p><b>Droguería: </b>${transfer.drogueria_id}</p>
                          <p><b>Laboratorio elegido: </b>${transfer.laboratorio_id
        }</p>
                          <p><b>Dirección: </b>${direccioncompleta}</p>
                        </div>
                      <table>
                          <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Observaciones</th>
                          </tr>
                        <tbody>
                        ${transfer.productos_solicitados.map((p) => {
            return `<tr>
                                    <td>${p.codigo_producto}</td>
                                    <td>${p.nombre}</td>
                                    <td>${p.cantidad}</td>
                                    <td>${p.observacion}</td>
                                  </tr>`;
        })}
                        </tbody>
                      </table>
                    </body>`;
    return body;
};

async handleSubmit() {
    const {
        farmaciaid,
        email,
        nombre,
        direccioncompleta,
    } = this.props.authReducer.userprofile;
    const { lab_selected } = this.props.tranfersReducer;

    // this.props.SUBMITTING(true);
    this.setState({
        submitting: true,
    });

    let productosFiltrados = [];

    this.state.productos.forEach(producto => {
        if (producto.cantidad > 0) {
            productosFiltrados.push(producto);
        }
    })



    let transfer = {
        ...this.state.transfer,
        productos_solicitados: productosFiltrados,
        farmacia_id: farmaciaid,
        farmacia_nombre: nombre,
        estado: "nuevo",
        laboratorio_id: lab_selected.nombre,
        email_destinatario: email,
    };

    let html = await this.createHtmlMail(transfer, direccioncompleta);
    this.props.ADD_TRANSFER(transfer, this.props.history, html, email);
}

handlequery = () => {
    return new URLSearchParams(window.location.hash.split("?")[1]);
};

async componentDidMount() {
    var laboratorio = this.handlequery().get("l");
    if (laboratorio) {
        try {
            const result = await axios.get(
                farmageo_api + "/laboratorios/" + laboratorio
            );
            if (result.data) {
                this.setState({ lab_selected: result.data });
            }
        } catch (error) {
            this.setState({ lab_selected: null });
        }
    }
}

render() {
    const {
        //lab_selected,
        productos,
        droguerias,
    } = this.props.tranfersReducer;
    const { lab_selected } = this.state;
    const {
        email,
        nombre,
        direccioncompleta,
    } = this.props.authReducer.userprofile;

    const { comunicadoTransfers } = this.props.publicidadesReducer;
    return (
        <div className="animated fadeIn">


            <Row>
                <Col md="3" xs="12">
                    <Button
                        href={process.env.PUBLIC_URL + "/#/NuevoTransfer"}
                        className="btn"
                        style={{
                            color: "black",
                            fontSize: 10,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 10,
                            paddingLeft: 15,
                            paddingRight: 15,
                            paddingTop: 8,
                            paddingBottom: 8,
                            marginBottom: 10,
                            borderLeftWidth: 10,
                            borderColor: "#000000",
                            borderBottomWidth: 0,
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                        }}
                    >
                        <b style={{ fontSize: 15 }}>{"<   "}</b>
                        <b>Volver a elegir un Laboratorio</b>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col md="12" xs="12">
                    <div
                        style={{
                            color: "black",
                            fontSize: 20,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 8,
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 20,
                            paddingBottom: 20,
                            marginBottom: 10,
                            borderBottomWidth: 0,
                            borderTopWidth: 10,
                            borderRightWidth: 0,
                            borderColor: "#000000",
                            borderLeftWidth: 0,
                            fontWeight: "bold",
                        }}
                    >
                        <p>{lab_selected !== null ? lab_selected.novedades : ""}</p>
                        <p>{comunicadoTransfers}</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="12" xs="12">
                    <div
                        style={{
                            color: "black",
                            fontSize: 16,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 8,
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 20,
                            paddingBottom: 20,
                            marginBottom: 10,
                            borderBottomWidth: 0,
                            borderTopWidth: 10,
                            borderRightWidth: 0,
                            borderColor: "#000000",
                            borderLeftWidth: 0,
                        }}
                    >
                        <p>
                            <b>Condiciones comerciales: </b>
                            {lab_selected !== null
                                ? lab_selected.condiciones_comerciales
                                : ""}
                        </p>
                    </div>
                </Col>
            </Row>

            <Card>
                <CardBody>
                    <Row style={{ color: "#20a8d8", fontSize: 18 }}>
                        <Col md="3" xs="12">
                            <FormGroup>
                                <Label>Fecha del transfer</Label>
                                <Input
                                    type="date"
                                    name="fecha"
                                    defaultValue={null}
                                    value={
                                        this.state.transfer
                                            ? this.state.transfer.fecha
                                            : undefined
                                    }
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                        </Col>

                        <Col md="3" xs="12">
                            <FormGroup>
                                <Label>Elegir Droguería</Label>


                                <Input
                                    type="select"
                                    name="drogueria_id"
                                    value={
                                        this.state.transfer
                                            ? this.state.transfer.drogueria_id
                                            : undefined
                                    }
                                    onChange={this.handleInputChange}
                                >
                                    <option value={undefined}>seleccionar...</option>
                                    {droguerias.map((d, index) => {

                                        console.log(d);


                                        return d.habilitado ? (

                                            <option value={d.nombre} key={index}>
                                                {d.nombre}
                                            </option>
                                        ) : null;
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md="3" xs="12">
                            <FormGroup>
                                <Label>N° de cuenta de Droguería</Label>
                                <Input
                                    type="text"
                                    name="nro_cuenta_drogueria"
                                    value={
                                        this.state.transfer
                                            ? this.state.transfer.nro_cuenta_drogueria
                                            : undefined
                                    }
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                        </Col>

                        <Col md="3" xs="12">
                            <FormGroup>
                                <Label>Laboratorio elegido</Label>
                                <Input
                                    type="text"
                                    value={
                                        lab_selected != null ? lab_selected.nombre : undefined
                                    }
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr />

                    {this.state.vistaprevia ? (
                        <Row style={{ margin: 5 }}>
                            <Col>
                                <Row>
                                    <Col>
                                        <p>
                                            <b>Farmacia: </b>
                                            {nombre}
                                        </p>
                                        <p>
                                            <b>Email destino: </b>
                                            {email}
                                        </p>
                                        <p>
                                            <b>Domicilio: </b>
                                            {direccioncompleta}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="table-responsive table-striped table-fix">
                                            <table className="table">
                                                <thead className="bg-secondary">
                                                    <tr>
                                                        <th>Código</th>
                                                        <th>Producto / Presentación</th>
                                                        <th>Unidades a pedir</th>
                                                        <th>Observaciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.productos.map((p, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{p.codigo_producto}</td>
                                                                <td>{p.nombre}</td>
                                                                <td>{p.cantidad}</td>
                                                                <td>{p.observacion}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <Row style={{ margin: 5 }}>



                            <div style={{ width: "100%" }}>
                                <MaterialTable

                                    icons={tableIcons}
                                    localization={{
                                        body: {

                                            emptyDataSourceMessage: 'No se encontraron datos',
                                            addTooltip: 'Agregar',
                                            editRow: {
                                                saveTooltip: 'Guardar',
                                                cancelTooltip: 'Cancelar'
                                            },
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
                                    cellEditable={{
                                        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                            return new Promise((resolve, reject) => {

                                                console.log(columnDef.field);

                                                const newproducto = [...productos];

                                                switch (columnDef.field) {

                                                    case 'cantidad':
                                                        if (newproducto[rowData.tableData.id].cantidad_minima<=newValue) {
                                                            newproducto[rowData.tableData.id].cantidad = newValue;
                                                        } else {
                                                            newproducto[rowData.tableData.id].cantidad = newValue;
                                                            alert("La cantidad minima para este producto es de " + newproducto[rowData.tableData.id].cantidad_minima)
                                                        }
                                                        break;

                                                    case 'observacion':
                                                        newproducto[rowData.tableData.id].observacion = newValue;
                                                        break;
                                                }

                                                this.setState({
                                                    productos: newproducto,
                                                });

                                                setTimeout(resolve, 1000);
                                            });
                                        }
                                    }}
                                    style={{ width: "100%" }}
                                    columns={[
                                        { title: 'Código', field: 'codigo', editable: 'never' },
                                        { title: 'Producto', field: 'nombre', editable: 'never' },
                                        { title: 'Presentación', field: 'presentacion', editable: 'never' },
                                        { title: '%', field: 'descuento_porcentaje', type: 'numeric', editable: 'never' },
                                        { title: 'Unidades a pedir', field: 'cantidad', type: 'numeric', align: "left", editable: 'allways', },
                                        { title: 'Mínimo', field: 'cantidad_minima', type: 'numeric', editable: 'never' },
                                        { title: 'Observaciones', field: 'observacion', editable: 'allways' }
                                    ]}
                                    title="Productos"
                                    data={productos.map(producto => {
                                        if (!producto.cantidad) {
                                            producto.cantidad = 0;
                                        }
                                        if (!producto.observacion) {
                                            producto.observacion = '...';
                                        }
                                        return producto;
                                    })}
                                    options={
                                        {
                                            pageSize: 10,
                                            pageSizeOptions: [5, 10, 20, 30]
                                        }
                                    }
                                />
                            </div>
                        </Row>
                    )}
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col></Col>
                        {console.log(this.state)}
                        <Col>
                            {this.state.finalizar ? (

                                <Fragment key={new Date}>

                                    <Button
                                        onClick={() => {
                                            this.handleFiltroFinalizar(false);
                                            this.handleVistaPrevia(false);
                                            //this.handleLimpiarProductos();
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Cancelar
                                    </Button>

                                    <Button
                                        onClick={this.handleSubmit}
                                        className="btn btn-success"
                                        disabled={
                                            this.state.transfer == null ||
                                            this.state.transfer.drogueria_id == undefined ||
                                            this.state.submitting
                                        }
                                        style={{ marginLeft: 5 }}
                                    >
                                        Confirmar
                                    </Button>

                                </Fragment>

                            ) : (
                                <Button
                                    onClick={() => {
                                        this.handleFiltroFinalizar(true);
                                    }}
                                    className="btn btn-success"
                                    disabled={this.state.productos.length < 1}
                                >
                                    Siguiente
                                </Button>
                            )}
                        </Col>
                        <Col></Col>
                    </Row>
                </CardFooter>
            </Card>

        </div >
    );
}
}

const mapStateToProps = (state) => {
    return {
        tranfersReducer: state.tranfersReducer,
        authReducer: state.authReducer,
        publicidadesReducer: state.publicidadesReducer,
    };
};
const mapDispatchToProps = {
    ADD_TRANSFER,
    SUBMITTING,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarTransfer);
