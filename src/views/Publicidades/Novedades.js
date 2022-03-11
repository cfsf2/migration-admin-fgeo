import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

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

import { connect } from "react-redux";
import {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
  DELETE_PUBLICIDAD,
  GET_NOVEDADES_RELACIONES,
  SET_NOVEDAD_EDITABLE,
  GET_NOVEDADES,
  GET_NOVEDADES_SEARCH,
  SET_FILTRANDO,
} from "../../redux/actions/publicidadesActions";

import {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
} from "../../redux/actions/institucionesAction";

import MaterialTable from "material-table";
import { MostrarFilter } from "./components/mostrarFilter";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./novedades.scss";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: "#F0F8FF",
          opacity: 0.9,
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

const Novedades = (props) => {
  const [novedades, setNovedades] = useState([]);
  const [showNovedades, setShowNovedades] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [opcionesInstituciones, setOpcionesInstituciones] = useState([]); //para pasar al componente de filtrado
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    habilitado: "todas",
    instituciones: "todas",
    vigencia: "todas",
    titulo: "",
  });

  useEffect(() => {
    setLoading(true);
    props.GET_INSTITUCIONES(1000).then((instituciones) => {
      setInstituciones(instituciones);
      let optInsti = instituciones.map((institucion) => {
        return { nombre: institucion.nombre, value: institucion._id };
      });
      setOpcionesInstituciones(() => optInsti);
      props.GET_NOVEDADES().then((novedades) => {
        setNovedades(novedades);
        setShowNovedades(novedades);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    props.SET_FILTRANDO(true);
    props
      .GET_NOVEDADES_SEARCH(
        filter.habilitado,
        filter.instituciones,
        filter.vigencia,
        filter.titulo
      )
      .then((resultado) => {
        setShowNovedades(() => resultado);
        props.SET_FILTRANDO(false);
      });
  }, [filter.habilitado, filter.instituciones, filter.vigencia, filter.titulo]);

  return (
    <div className="animated fadeIn novedades_lista">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Link to={{ pathname: "abmnovedades" }}>
                <Button onClick={() => props.SET_NOVEDAD_EDITABLE({})}>
                  + Agregar Novedad
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <CardTitle style={{ fontSize: "1.8rem" }}>Novedades</CardTitle>
              <ThemeProvider theme={theme}>
                {false ? (
                  <Spinner />
                ) : (
                  <MaterialTable
                    isLoading={props.publicidadesReducer.filtrando}
                    title={<div></div>}
                    className="novedades_materialtable"
                    id="novedades_materialtable"
                    hideSortIcon={false}
                    icons={tableIcons}
                    options={{ filtering: false }}
                    localization={{
                      header: {
                        //actions: "Acciones",
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
                        cellStyle: {
                          width: "80px",
                          position: "relative",
                          left: "1%",
                          // maxWidth: "300px",
                          //  minWidth: "300px",
                        },
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
                              width: "20px",
                              height: "20px",
                              borderWidth: 10,
                              borderColor: "black",
                              opacity: rowData.habilitado ? 1 : 0.4,
                              backgroundPosition: "center",
                            }}
                          ></div>
                        ),
                      },
                      {
                        title: "Titulo",
                        field: "titulo",
                        cellStyle: {
                          width: "35%",
                          // maxWidth: "300px",
                          //  minWidth: "300px",
                        },

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
                        cellStyle: { width: "9%" },
                        render: (rowData) =>
                          new Date(rowData.fecha_alta).toLocaleDateString(
                            "es-AR"
                          ),
                      },
                      {
                        title: "Inicio",
                        field: "fechaalta",
                        cellStyle: { width: "9%" },
                        render: (rowData) =>
                          rowData.fechainicio
                            ? new Date(rowData.fechainicio).toLocaleDateString(
                                "es-AR"
                              )
                            : "-",
                      },
                      {
                        title: "Fin",
                        field: "fechaalta",
                        cellStyle: { width: "9%" },
                        render: (rowData) =>
                          rowData.fechafin
                            ? new Date(rowData.fechafin).toLocaleDateString(
                                "es-AR"
                              )
                            : "-",
                      },
                      {
                        title: "Mostrar",
                        field: "habilitado",
                        cellStyle: { width: "8%" },
                        render: (rowData) => (
                          <div style={{ textAlign: "center" }}>
                            {rowData.habilitado ? "SI" : "NO"}
                          </div>
                        ),
                      },
                      {
                        title: "Instituciones",
                        field: "instituciones",
                        cellStyle: { width: "16%" },
                        render: (rowData) => (
                          <>
                            <ul className="novedades_instituciones_lista">
                              {rowData.instituciones.map((ins) => {
                                let nombre =
                                  props.institucionesReducer.instituciones.find(
                                    (inst) => {
                                      return inst._id === ins;
                                    }
                                  ).nombre;

                                return <li key={ins}>{nombre} </li>;
                              })}
                            </ul>
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
                          </>
                        ),
                      },

                      {
                        title: "Editar",
                        field: "editNovedad",
                        cellStyle: { width: "5%" },
                        render: (rowData) => (
                          <Link
                            to={{
                              pathname: "editnovedades",
                              search: `edit=${rowData._id}`,
                              state: { novedad: rowData },
                            }}
                          >
                            <Button
                              className="btn btn-sm btn-info"
                              onClick={() =>
                                props.SET_NOVEDAD_EDITABLE(rowData)
                              }
                              style={{ width: "100%" }}
                            >
                              Edit
                            </Button>
                          </Link>
                        ),
                      },
                    ]}
                    data={showNovedades.map((p) => {
                      return p;
                    })}
                    actions={[
                      {
                        icon: () => (
                          <MostrarFilter
                            label="Mostrar en Novedades"
                            campo="habilitado"
                            filter={filter}
                            setFilter={setFilter}
                            opciones={[
                              {
                                nombre: "Todas",
                                value: "todas",
                                default: true,
                              },
                              { nombre: "SI", value: true },
                              { nombre: "NO", value: false },
                            ]}
                          />
                        ),
                        tooltip: "Filter",
                        isFreeAction: true,
                      },
                      {
                        icon: () => (
                          <MostrarFilter
                            label="Vigencia"
                            campo="vigencia"
                            filter={filter}
                            setFilter={setFilter}
                            opciones={[
                              {
                                nombre: "Todas",
                                value: "todas",
                                default: true,
                              },
                              { nombre: "SI", value: true },
                              { nombre: "NO", value: false },
                            ]}
                          />
                        ),
                        tooltip: "Filter",
                        isFreeAction: true,
                      },
                      {
                        icon: () => (
                          <MostrarFilter
                            label="Institucion"
                            campo="instituciones"
                            filter={filter}
                            setFilter={setFilter}
                            opciones={opcionesInstituciones}
                          />
                        ),
                        tooltip: "Filter",
                        isFreeAction: true,
                      },
                    ]}
                    options={{
                      actionsColumnIndex: -1,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20, 30],
                      headerStyle: {
                        textAlign: "center",
                        fontWeight: "bold",
                      },
                      tableLayout: "auto",
                      search: true,
                      searchFieldStyle: { top: "3px" },
                    }}
                    // style={{ minWidth: "1300px", overflowX: "auto" }}
                  />
                )}
              </ThemeProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

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
  GET_NOVEDADES,
  GET_NOVEDADES_SEARCH,
  SET_FILTRANDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Novedades);
