import React, { useContext, useEffect, useRef, useCallback } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";
import ListadoContext from "../context/ListadoContext";

import { Card, CardBody, Col, Row, Spinner, CardTitle } from "reactstrap";
import HeaderConf from "../../components/HeaderConf";

import tableIcons from "./tableIcons";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./listado.scss";
import Filtros from "./Filtros";

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

export const Listado = (props) => {
  const { data, loading, columnas } = props;
  const { opcionesListado } = useContext(ListadoContext);

  const calcPagesize = useCallback(() => {
    let size = 10;

    if (opcionesListado.cantdd_registros) {
      size = Number(opcionesListado.cantdd_registros);
    }
    if (data.length === 0) {
      size = 0;
    }
    if (data.length < size) {
      size = data.length;
    }
    return Number(size);
  }, [data.length, opcionesListado.cantdd_registros]);

  const pageSize = calcPagesize();
  const tableRef = useRef(null);

  useEffect(() => {
    tableRef.current.dataManager.changePageSize(calcPagesize());
  }, [calcPagesize, data]);

  return (
    <div className="animated fadeIn novedades_lista">
      <Row>
        <Col xs="12" sm="12">
          <Card id={opcionesListado.id_a}>
            <HeaderConf
              opciones={opcionesListado}
              className={"configuracion_pantalla_titulo_secundario"}
            />

            <CardBody>
              <ThemeProvider theme={theme}>
                <Filtros />
                <MaterialTable
                  tableRef={tableRef}
                  isLoading={loading || opcionesListado === undefined}
                  className="listado_materialtable"
                  hideSortIcon={false}
                  icons={tableIcons}
                  localization={{
                    header: {
                      //actions: "Acciones",
                    },
                    body: {
                      emptyDataSourceMessage:
                        opcionesListado.iniciar_activo === "n"
                          ? "No se encontraron datos o debe activar los filtros"
                          : "No se encontraron datos",
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
                  columns={columnas}
                  data={data}
                  actions={[]}
                  options={{
                    filtering: false,
                    actionsColumnIndex: -1,
                    showTitle: false,
                    toolbar: opcionesListado.search === "s",
                    pageSize: Number(pageSize),
                    pageSizeOptions: [
                      5,
                      10,
                      20,
                      opcionesListado.cantdd_registros_max
                        ? opcionesListado.cantdd_registros_max
                        : 30,
                    ],
                    headerStyle: {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                    search: opcionesListado.search === "s",
                    searchFieldStyle: { top: "3px" },
                    tableLayout: "fixed",
                  }}
                  components={{
                    Row: (props) => (
                      <MTableBodyRow id={props.data._id} {...props} />
                    ),
                  }}
                  // style={{ minWidth: "1300px", overflowX: "auto" }}
                />
              </ThemeProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Listado;
