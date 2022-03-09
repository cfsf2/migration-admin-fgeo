import React, { Component, useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
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

export const Listado = (props) => {
  const {
    data,
    loading,
    filter,
    setFilter,
    filtrando,
    columnas,
    titulo,
    filtros,
  } = props;
  return (
    <>
      <div>
        <MaterialTable
          isLoading={loading}
          title={<h2>{titulo}</h2>}
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
          // actions={[
          //   {
          //     icon: () => (
          //       <MostrarFilter
          //         label="Mostrar en Novedades"
          //         campo="habilitado"
          //         filter={filter}
          //         setFilter={setFilter}
          //         opciones={[
          //           {
          //             nombre: "Todas",
          //             value: "todas",
          //             default: true,
          //           },
          //           { nombre: "SI", value: true },
          //           { nombre: "NO", value: false },
          //         ]}
          //       />
          //     ),
          //     tooltip: "Filter",
          //     isFreeAction: true,
          //   },
          // ]}
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
      </div>
    </>
  );
};

export default Listado;
