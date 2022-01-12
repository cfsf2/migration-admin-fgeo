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
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";

import { forwardRef } from "react";
import RestoreIcon from "@material-ui/icons/Restore";
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

import { connect } from "react-redux";
import {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
  DELETE_PUBLICIDAD,
  GET_NOVEDADES_RELACIONES,
  SET_NOVEDAD_EDITABLE,
} from "../../redux/actions/publicidadesActions";

import {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
} from "../../redux/actions/institucionesAction";

import MaterialTable from "material-table";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./novedades.scss";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: "#378FC3",
          opacity: 0.8,
        },
      },
    },
  },
});

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

class Novedades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novedad: null,
      novedades: [],
      instituciones: [],
      loading: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConfirmar = this.handleConfirmar.bind(this);
  }

  async componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.props.GET_PUBLICIDADES().then((publicidades) => {
      this.setState({ ...this.state, showPublicidades: publicidades });
      this.props.GET_INSTITUCIONES(1000).then((instituciones) => {
        publicidades.forEach((novedad) =>
          this.props.GET_NOVEDADES_RELACIONES(novedad._id).then((response) => {
            const relaciones = response;
            let novedadesInstituciones = [];
            if (response.length > 0) {
              novedadesInstituciones = instituciones.filter((ins) =>
                relaciones.includes(ins._id)
              );
            }
            this.setState({ ...this.state, loading: false });
            novedad.instituciones = novedadesInstituciones.map(
              (novins) => novins._id
            ); //esta modificacion del estado es dudosa pero anda
          })
        );
      });
    });
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
      this.state.novedad,
      this.state.instituciones
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
              <CardBody>
                <ThemeProvider theme={theme}>
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <MaterialTable
                      title="Listado de Novedades"
                      hideSortIcon={false}
                      icons={tableIcons}
                      options={{ filtering: true }}
                      localization={{
                        header: {
                          actions: "Acciones",
                        },
                        body: {
                          emptyDataSourceMessage: "No se encontraron datos",
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
                        {
                          title: "Color",
                          field: "color",
                          width: "5%",
                          render: (rowData) => (
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
                                opacity: rowData.habilitado ? 1 : 0.4,
                              }}
                            ></div>
                          ),
                        },
                        {
                          title: "Titulo",
                          field: "titulo",
                          width: "2%",
                          render: (rowData) => (
                            <p
                              style={{
                                textJustify: "initial",
                                fontSize: 12,
                                fontWeight: "bold",
                                opacity: rowData.habilitado ? 1 : 0.4,
                              }}
                              className="d-inline"
                            >
                              {" "}
                              {rowData.titulo}{" "}
                            </p>
                          ),
                        },
                        {
                          title: "Fecha Alta",
                          field: "fechaalta",
                          width: "5%",
                          render: (rowData) =>
                            new Date(rowData.fechaalta).toLocaleDateString(
                              "es-AR"
                            ),
                        },
                        {
                          title: "Inicio",
                          field: "fechaalta",
                          width: "5%",
                          render: (rowData) =>
                            rowData.fechainicio
                              ? new Date(
                                  rowData.fechainicio
                                ).toLocaleDateString("es-AR")
                              : "-",
                        },
                        {
                          title: "Fin",
                          field: "fechaalta",
                          width: "5%",
                          render: (rowData) =>
                            rowData.fechafin
                              ? new Date(rowData.fechafin).toLocaleDateString(
                                  "es-AR"
                                )
                              : "-",
                        },
                        {
                          title: "Instituciones",
                          field: "instituciones",
                          width: "25%",
                          render: (rowData) => {
                            return (
                              <>
                                {/* <select
                                  value={"instituciones"}
                                  className={"novedades_instituciones_lista"}
                                >
                                  {rowData.instituciones?.map((ins) => {
                                    return (
                                      <option key={ins._id}>
                                        {ins.nombre}
                                      </option>
                                    );
                                  })}
                                  <option value="instituciones">
                                    Ver Instituciones
                                  </option>
                                </select> */}
                                <ul className="novedades_instituciones_lista">
                                  {rowData.instituciones?.map((ins) => {
                                    let nombre =
                                      this.props.institucionesReducer.instituciones.find(
                                        (inst) => {
                                          return inst._id === ins;
                                        }
                                      ).nombre;
                                    return <li key={ins}>{nombre}</li>;
                                  })}
                                </ul>
                              </>
                            );
                          },
                        },
                        {
                          title: "Editar",
                          field: "editNovedad",
                          width: "5%",
                          render: (rowData) => (
                            <Link
                              to={{
                                pathname: "abmnovedades",
                                search: `edit=${rowData._id}`,
                                state: { novedad: rowData },
                              }}
                            >
                              <Button
                                className="btn btn-sm btn-info"
                                onClick={() =>
                                  this.props.SET_NOVEDAD_EDITABLE(rowData)
                                }
                              >
                                Edit
                              </Button>
                            </Link>
                          ),
                        },
                      ]}
                      data={this.state.showPublicidades
                        .filter(function (p) {
                          if (p.tipo !== "novedadesadmin") {
                            return false; // skip
                          }
                          return true;
                        })
                        .map((p) => {
                          return p;
                        })}
                      actions={[]}
                      options={{
                        actionsColumnIndex: -1,
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20, 30],
                        headerStyle: {
                          textAlign: "center",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  )}
                </ThemeProvider>
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
    institucionesReducer: state.institucionesReducer,
  };
};
const mapDispatchToProps = {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
  DELETE_PUBLICIDAD,
  GET_NOVEDADES_RELACIONES,
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
  SET_NOVEDAD_EDITABLE,
};

export default connect(mapStateToProps, mapDispatchToProps)(Novedades);
