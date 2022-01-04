import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CardImg,
} from "reactstrap";
import { connect } from "react-redux";
import { UPDATE_FARMACIA_ADMIN_RESPONSE } from "../../redux/actions/FarmaciasAdminActions";
import {
  GET_FARMACIAS,
  GET_PASSWORDS_FARMACIAS,
} from "../../redux/actions/FarmaciasAdminActions";
import ItemFarmacia from "./components/ItemFarmacia";
import { Link } from "react-router-dom";

import { image_path_server } from "../../config";

import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Save from "@material-ui/icons/Save";
import Delete from "@material-ui/icons/Delete";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import VerPw from "./components/VerPw";
import BlockButton from "./components/BlockButton";
import ActButton from "./components/ActButton";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Delete2: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
};

class FarmaciasAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro: "",
      farmacia: {
        nombre: "farmacia...",
        fechaalta: "",
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNombreFarmacia = this.handleNombreFarmacia.bind(this);
    this.handleHabilitado = this.handleHabilitado.bind(this);
    this.handleDescubrir = this.handleDescubrir.bind(this);
    this.renderFarmacia = this.renderFarmacia.bind(this);
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toUpperCase();
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleNombreFarmacia(_farmacia) {
    console.log(_farmacia);
    this.setState({ farmacia: _farmacia });
  }
  componentDidUpdate() {}

  async componentDidMount() {
    await this.props.GET_PASSWORDS_FARMACIAS();
    this.props.GET_FARMACIAS();
  }

  renderFarmacia = (farmacia, idx) => {
    return farmacia.nombre.toUpperCase().includes(this.state.filtro) ? (
      <ItemFarmacia
        key={idx}
        farmacia={farmacia}
        contador={idx + 1}
        handleVer={this.handleNombreFarmacia}
      />
    ) : null;
  };

  async handleHabilitado(farmacia, value) {
    var _farmacia = { ...farmacia, habilitado: value };
    await this.props.UPDATE_FARMACIA_ADMIN_RESPONSE(_farmacia);
  }

  handleDescubrir(farmacia, value) {
    var _farmacia = { ...farmacia, descubrir: value };
    this.props.UPDATE_FARMACIA_ADMIN_RESPONSE(_farmacia);
  }

  getClassPerfil = (perfil) => {
    if (perfil) {
      switch (perfil) {
        case "vender_online":
          return "bg-success";
        case "solo_visible":
          return "bg-warning";
        case "no_visible":
          return "bg-danger";
        default:
          return "";
      }
    } else {
      return "";
    }
  };
  addPassword(pharm) {
    if (this.props.farmaciasAdminReducer.passwordsFarmacias) {
      const pass = this.props.farmaciasAdminReducer.passwordsFarmacias.filter(
        (p) => {
          return p.usuario === pharm.usuario;
        }
      );
      const pharmCopy = pharm;
      if (pass.length > 0) {
        pharmCopy.pw = pass[0].password;
      } else {
        pharmCopy.pw = "No definida";
      }

      return pharmCopy;
    } else {
      return pharm;
    }
  }
  render() {
    const { listaFarmacias } = this.props.farmaciasAdminReducer;
    // console.log(listaFarmacias)
    return (
      <div>
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <b>Farmacias</b>
              </CardHeader>
              <CardBody>
                <Row>
                  {/* <Col xs="12" md="4">
                    <Input
                      type="text"
                      placeholder="buscar farmacia..."
                      name="filtro"
                      onChange={this.handleInputChange}
                      value={this.state.filtro}
                    />
                  </Col> */}
                </Row>
                <MaterialTable
                  title="Listado de Farmacias"
                  icons={tableIcons}
                  localization={{
                    header: {
                      actions: "Acciones",
                    },
                    body: {
                      emptyDataSourceMessage:
                        listaFarmacias.length === 0
                          ? "cargando..."
                          : "No se encontraron datos",
                      addTooltip: "Agregar",
                      editRow: {
                        saveTooltip: "Guardar",
                        cancelTooltip: "Cancelar",
                      },
                    },
                    pagination: {
                      labelDisplayedRows: "{from}-{to} de {count}",
                      labelRowsSelect: "Filas",
                      labelRowsPerPage: "Productos x pág",
                      firstAriaLabel: "Primera",
                      lastAriaLabel: "Ultima",
                      firstTooltip: "Primera página",
                      lastTooltip: "Ultima página",
                      previousAriaLabel: "Página anterior",
                      previousTooltip: "Página anterior",
                      nextAriaLabel: "Próxima pagina",
                      nextTooltip: "Próxima pagina",
                    },
                    toolbar: {
                      searchTooltip: "Buscar",
                      searchPlaceholder: "Buscar",
                    },
                  }}
                  columns={[
                    { title: "id", field: "farmaciaid" },
                    { title: "Nombre", field: "nombre", align: "center" },
                    { title: "Cuit", field: "cuit", align: "center" },
                    { title: "Teléfono", field: "telefono", align: "center" },
                    {
                      title: "Venta online Farmageo",
                      align: "center",
                      render: (rowData) => (
                        <div
                          className={this.getClassPerfil(
                            rowData.perfil_farmageo
                          )}
                        >
                          {rowData.perfil_farmageo}
                        </div>
                      ),
                    },
                    { title: "Usuario", field: "usuario", align: "center" },
                    {
                      title: "Password",
                      field: "fecha",
                      align: "center",
                      render: (rowData) => <VerPw pw={rowData.pw} />,
                    },
                    {
                      title: "Último acceso",
                      field: "ultimoacceso4table",
                      align: "center",
                    },
                    {
                      title: "Detalle",
                      render: (rowData) => (
                        <Button
                          onClick={(e) => this.handleNombreFarmacia(rowData)}
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg"
                        >
                          Ver
                        </Button>
                      ),
                    },
                    { title: "Estado", field: "habilitado", type: "boolean" },
                    {
                      title: "Bloqueo",
                      render: (rowData) => (
                        <BlockButton
                          change={this.handleHabilitado}
                          rowData={rowData}
                        />
                      ),
                    },
                    {
                      title: "Descubrir",
                      render: (rowData) => (
                        <ActButton
                          change={this.handleDescubrir}
                          rowData={rowData}
                        />
                      ),
                    },
                    {
                      title: "Editar",
                      render: (rowData) => (
                        <Link
                          to={{
                            pathname: "/EditarFarmacia",
                            state: { farmacia: rowData },
                          }}
                        >
                          <Button className="btn btn-sm btn-info">Edit</Button>
                        </Link>
                      ),
                    },
                  ]}
                  data={listaFarmacias.map((r) => {
                    const rCopy = { ...r };
                    if (r.ultimoacceso) {
                      rCopy.ultimoacceso4table = r.ultimoacceso.substring(
                        0,
                        10
                      );
                    }

                    return this.addPassword(rCopy);
                  })}
                  options={{
                    pageSize: 10,
                    pageSizeOptions: [5, 10, 20, 30, 50],
                  }}
                />
                <hr />
                {/* <div className="table-responsive table-fix">
                  <table className="table table-striped ">
                    <thead className="bg-secondary">
                      <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Venta online Farmageo</th>
                        <th>Usuario</th>
                        <th>Password</th>
                        <th>Último acceso</th>
                        <th>Detalle</th>
                        <th>Estado</th>
                        <th>Bloqueo</th>
                        <th>Descubrir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*listaFarmacias.map((f, index) => {
                        return f.nombre
                          .toUpperCase()
                          .includes(this.state.filtro) ? (
                          <ItemFarmacia
                            key={index}
                            farmacia={f}
                            contador={index + 1}
                            handleVer={this.handleNombreFarmacia}
                          />
                        ) : null;
                      })*/}

                {/* 
                      <PlainList
                        list={listaFarmacias}
                        renderItem={this.renderFarmacia}
                        renderWhenEmpty={() => (
                          <div className="mt-4">
                            <h3>Cargando...</h3>
                          </div>
                        )}
                        sortBy={["nombre", { key: "_id", descending: true }]}
                        //groupBy={f => f.info.age > 18 ? 'Over 18' : 'Under 18'}
                        renderOnScroll
                      />
                    </tbody>
                  </table>
                </div> */}

                <div
                  className="modal fade bd-example-modal-lg"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col xs="12" md="6" className="my-1">
                              <b>Nombre: </b> {this.state.farmacia.nombre}
                            </Col>
                            <Col xs="12" md="6" className="my-1">
                              <b>Fecha alta: </b>{" "}
                              {this.state.farmacia.fechaalta !==
                              (undefined || null || "")
                                ? this.state.farmacia.fechaalta.substring(0, 10)
                                : ""}
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <Row>
                            <Col xs="12" md="3" className="my-1">
                              <CardImg
                                src={
                                  this.state.farmacia.imagen !== null
                                    ? image_path_server +
                                      this.state.farmacia.imagen
                                    : null
                                }
                              />
                            </Col>

                            <Col xs="12" md="3" className="my-1">
                              <b>Usuario:</b> {this.state.farmacia.usuario}
                            </Col>

                            <Col xs="12" md="3" className="my-1">
                              <b>Nombre farmacéutico:</b>{" "}
                              {this.state.farmacia.nombrefarmaceutico}
                            </Col>

                            <Col xs="12" md="3" className="my-1">
                              <b>Matrícula:</b> {this.state.farmacia.matricula}
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col xs="12" md="4" className="my-1">
                              <b>Provincia:</b> {this.state.farmacia.provincia}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>Localidad:</b> {this.state.farmacia.localidad}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>CP:</b> {this.state.farmacia.cp}
                            </Col>
                          </Row>
                          <hr />

                          <Row>
                            <Col xs="12" md="4" className="my-1">
                              <b>Calle:</b> {this.state.farmacia.calle}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>Nº:</b> {this.state.farmacia.numero}
                            </Col>
                            <Col xs="12" md="4"></Col>
                          </Row>

                          <hr />
                          <Row>
                            <Col xs="12" md="4" className="my-1">
                              <b>Farmacia id:</b>{" "}
                              {this.state.farmacia.farmaciaid}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>MAPA lat:</b> {this.state.farmacia.lat}
                            </Col>

                            <Col xs="12" md="4" className="my-1">
                              <b>MAPA long:</b> {this.state.farmacia.log}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
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
    farmaciasAdminReducer: state.farmaciasAdminReducer,
  };
};

const mapDispatchToProps = {
  GET_FARMACIAS,
  GET_PASSWORDS_FARMACIAS,
  UPDATE_FARMACIA_ADMIN_RESPONSE,
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmaciasAdmin);
