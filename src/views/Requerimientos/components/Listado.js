import React, { Component, useState, useEffect, forwardRef } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";
import { Link } from "react-router-dom";
import { MostrarFilter } from "./mostrarFilter";
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

import tableIcons from "./tableIcons";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./listado.scss";

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
  const { data, loading, columnas, titulo, filtros } = props;
  return (
    <div className="animated fadeIn novedades_lista">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardBody>
              <CardTitle style={{ fontSize: "1.8rem" }}>{titulo}</CardTitle>
              <ThemeProvider theme={theme}>
                {false ? (
                  <Spinner />
                ) : (
                  <MaterialTable
                    isLoading={loading}
                    title={null}
                    className="listado_materialtable"
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
                    columns={columnas}
                    data={data}
                    actions={filtros.map((f) => {
                      return {
                        icon: () => {
                          return <MostrarFilter {...f} />;
                        },
                        tooltip: "Filter",
                        isFreeAction: true,
                      };
                    })}
                    options={{
                      actionsColumnIndex: -1,
                      pageSize: 20,
                      pageSizeOptions: [5, 10, 20, 30],
                      headerStyle: {
                        textAlign: "center",
                        fontWeight: "bold",
                      },
                      tableLayout: "auto",
                      search: true,
                      searchFieldStyle: { top: "3px" },
                    }}
                    components={{
                      Row: (props) => (
                        <MTableBodyRow id={props.data._id} {...props} />
                      ),
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

export default Listado;
