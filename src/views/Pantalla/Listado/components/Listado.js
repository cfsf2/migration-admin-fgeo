import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import MaterialTable, { MTableBody } from "@material-table/core";
import ListadoContext from "../context/ListadoContext";
import PantallaContext from "../../context/PantallaContext";
import { agregarAcciones } from "../../helper/funciones";
// import Carrusel from "./Carrusel";

import { Card, CardBody } from "reactstrap";
import HeaderConf from "../../components/HeaderConf";

import tableIcons from "./tableIcons";
import { ThemeProvider } from "@material-ui/styles";
import "./listado.scss";
import Filtros from "./Filtros";
import Botonera from "../Botonera";

import { TablePagination } from "@material-ui/core";
import SwitchColumnas from "./SwitchColumnas";
import MemoizedOrixiaRow from "./MemoizedOrixaRow";
import Mapa from "./Mapa";
import OrixiaSpinner from "../../components/OrixiaSpinner";

export const Listado = (props) => {
  const { data, loading, columnas, tots } = props;

  const {
    opcionesListado,
    listadoBotones,
    Dispatch,
    cabeceras,
    datos,
    subirDatosSeleccionados,
   // carrusel,
   // setCarrusel,
  } = useContext(ListadoContext);
  const { opciones_de_pantalla } = useContext(PantallaContext);

  const [selected, setSelected] = useState();
  const [mapa, setMapa] = useState(false);

  const renderSummaryRow =
    cabeceras.filter((c) => c.totalizar === "s").length > 0;

  const listadoBotonesInferiores = listadoBotones.filter(
    (b) => b.listado_boton_inferior === "s"
  );

  const padding = "2px 6px";

  const calcPagesize = useCallback(() => {
    let size = 10;

    if (opcionesListado.cantdd_registros) {
      size =
        Number(opcionesListado.cantdd_registros) === 0
          ? data.length
          : Number(opcionesListado.cantdd_registros);
    }

    if (data.length === 0) {
      size = 0;
    }
    if (data.length < size) {
      size = data.length;
    }
    if (
      opcionesListado.cantdd_registros_max &&
      size > opcionesListado.cantdd_registros_max
    ) {
      size = opcionesListado.cantdd_registros_max;
    }
    return Number(size);
  }, [
    data.length,
    opcionesListado.cantdd_registros,
    opcionesListado.cantdd_registros_max,
  ]);

  const pageSize = calcPagesize();
  const tableRef = useRef(null);

  useEffect(() => {
    tableRef.current.dataManager.changePageSize(calcPagesize());
  }, [calcPagesize, columnas, data]);

  const styles = {
    gridColumn: opcionesListado.grid_span
      ? opcionesListado.grid_span
      : "1 / -1",
  };

  const mensajeSinDatos = (
    <p style={{ paddingTop: "15px" }}>
      {opcionesListado.consultaEjecutada === "n"
        ? ""
        : "No se encontraron datos"}
    </p>
  );

  agregarAcciones(opciones_de_pantalla, opcionesListado);

  function updateSelectedArray(selected, row) {
    row = row.filter((obj) => {
      const k = Object.keys(obj).filter((k) =>
        k.endsWith("listado_seleccion_habilitado")
      )[0];
      if (!k) return true;
      return obj[k] === 1;
    });

    if (!selected) {
      return row;
    }
    let newSelected = [...selected];

    const isTodosPresentes = row.every((itemToCheck) =>
      selected.some(
        (referenceItem) =>
          referenceItem.tableData.id === itemToCheck.tableData.id
      )
    );

    if (isTodosPresentes) {
      row.forEach((rowItem) => {
        newSelected = newSelected.filter(
          (ns) => ns.tableData.id !== rowItem.tableData.id
        );
      });

      return newSelected;
    }

    row.forEach((rowItem) => {
      const index = newSelected.findIndex(
        (selectedItem) => selectedItem.tableData.id === rowItem.tableData.id
      );

      if (index === -1) {
        newSelected.push(rowItem);
      } else {
        // newSelected.splice(index, 1);
      }
    });

    return newSelected;
  }

  const mapaCab = columnas?.filter((c) => c.componente === "mapa").pop();

  return (
    <div
      style={styles}
      className={`animated fadeIn novedades_lista ${opcionesListado.className}`}
    >
      <Card
        id={opcionesListado.id_a}
        style={{ border: "none", marginBottom: 0 }}
        className="listado_card"
      >
        <HeaderConf
          opciones={opcionesListado}
          className={"configuracion_pantalla_titulo_secundario"}
        />

        <CardBody style={{ padding: 0 }} className="listado_card_body">
          <ThemeProvider >
            <Filtros opciones={opcionesListado} setMapa={setMapa} />
            {loading || opcionesListado === undefined ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "80%",
                  position: "fixed",
                  zIndex: 500,
                }}
              >
                <OrixiaSpinner text={"Cargando..."} />
              </div>
            ) : (
              <></>
            )}
            <MaterialTable
              tableRef={tableRef}
              isLoading={loading || opcionesListado === undefined}
              hideSortIcon={false}
              style={{ display: mapa ? "none" : "inherit" }}
              icons={tableIcons}
              renderSummaryRow={
                renderSummaryRow
                  ? (j) => {
                      const { column } = j;
                      if (column.totalizar === "s") {
                        return {
                          value: tots[column.field].toFixed(2),
                          style: {
                            textAlign: column.cellStyle.textAlign ?? "right",
                            borderTop: "double",
                            fontSize: "0.8rem",
                            padding: "2px 6px",
                          },
                        };
                      }
                      return undefined;
                    }
                  : undefined
              }
              localization={{
                header: {
                  //actions: "Acciones",
                },
                body: {
                  emptyDataSourceMessage: mensajeSinDatos,
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
              columns={useMemo(
               // opcionesListado.consultaEjecutada === "s"
               true
                  ? () =>
                      cabeceras
                        .sort((a, b) => a.orden - b.orden)
                        .filter((cab) => cab.componente !== "hidden")
                        .filter((cab) => cab.mostrar !== "n")
                        .map((cab, i) => {
                          //console.log("cab:  ", cab);

                          return {
                            title: cab.nombre_alias
                              ? datos[0][cab.nombre_alias]
                              : cab.nombre,
                            field: cab.campo_alias ?? cab.id_a,
                            width: undefined,
                            totalizar: cab.totalizar ?? undefined,
                            cellStyle: {
                              textAlign: cab.align ?? "center",
                              // width: cab.width ?? "10%",
                              padding: padding,
                              fontSize: "0.8rem",
                              lineHeight: 1,
                              width: undefined,
                            },
                            id: cab.id_a,
                            headerStyle: {
                              textAlign: "left",
                              fontSize: "0.8rem",
                              padding: padding,
                              height: "0.8em",
                              width: undefined,
                            },
                            render: (data) => {
                              const totalStyle = {
                                ...cab,
                                borderTop: "double",
                              };
                              const id_elemento =
                                cab.id_a + "_" + data.tableData.id;
                              return (
                                <SwitchColumnas
                                  data={data}
                                  cab={data.TOTALES === 1 ? totalStyle : cab}
                                  indiceData={data.tableData.id}
                                  // Context={ListadoContext}
                                  id_elemento={id_elemento}
                                />
                              );
                            },
                          };
                        })
                  : () => [],
                [cabeceras, datos, data]
              )}
              data={data}
              actions={[]}
              options={{
                filtering: false,
                actionsColumnIndex: -1,
                showTitle: false,
                toolbar:
                  opcionesListado.search === "s" && data.length !== 0 && data,
                pageSize: Number(pageSize),
                pageSizeOptions: [
                  pageSize,
                  5,
                  10,
                  20,
                  opcionesListado.cantdd_registros_max
                    ? opcionesListado.cantdd_registros_max
                    : 30,
                ],
                headerStyle: {
                  textAlign: "left",
                  fontWeight: "bold",
                  height: "57px",
                },
                search: opcionesListado.search === "s",
                searchFieldStyle: { top: "3px" },
                // tableLayout: "fixed",
                selection:
                  opcionesListado.listado_seleccion &&
                  opcionesListado.listado_seleccion === "s",
                showSelectAllCheckbox:
                  opcionesListado.showSelectAllCheckbox &&
                  opcionesListado.showSelectAllCheckbox === "s",
                showTextRowsSelected: opcionesListado.showTextRowsSelected,
                rowStyle: (r) => {
                  if (opcionesListado.rowStyle) {
                    return r.tableData.id === selected
                      ? {
                          background: "#bde0b1",
                          color: "black",
                          fontWeight: 600,
                        }
                      : {};
                  }
                  return {};
                },
              }}
              onSelectionChange={(row, l) => {
                if (!l && row.length !== 0) {
                  row = row.filter((r) => {
                    const c = tableRef.current.dataManager.pagedData.some(
                      (pd) => pd.tableData.id === r.tableData.id
                    );
                    return c;
                  });
                  row = updateSelectedArray(selected, row);
                }
                setSelected(row);

                Dispatch({
                  type: "SET_DATOS_SELECCIONADOS",
                  payload: {
                    row,
                    data: data.map((d, i) => {
                      d.tableData = { checked: false, index: i };
                      row.forEach((r) => {
                        if (r.tableData.index === i) {
                          d.tableData = r.tableData;
                        }
                      });

                      return d;
                    }),
                  },
                });

                if (subirDatosSeleccionados) {
                  // console.log("vivo por aqui")
                  subirDatosSeleccionados(row);
                }

                // funcion select
                if (opcionesListado.listado_seleccion_habilitado) {
                  row = row.filter(
                    (r) =>
                      r[
                        opcionesListado.id_a + "_listado_seleccion_habilitado"
                      ] === 1
                  );
                }

                if (!!opcionesListado.onSelectionChange) {
                  opcionesListado.onSelectionChange(row);
                }
                return row;
              }}
              onRowClick={(e, row) => {
                if (opcionesListado.onRowClick) {
                  setSelected(row.tableData.id);
                  opcionesListado.onRowClick(e, row, data);

                  Dispatch({
                    type: "SET_DATOS_SELECCIONADOS",
                    payload: {
                      row,
                      data: data.map((d, i) => {
                        d.tableData = { checked: false, index: i };
                        [row].forEach((r) => {
                          if (r.tableData.index === i) {
                            d.tableData = r.tableData;
                          }
                        });

                        return d;
                      }),
                    },
                  });
                }
              }}
              onRowDoubleClick={(e, row) => {
                if (opcionesListado.onRowDoubleClick) {
                  setSelected(row.tableData.id);
                  opcionesListado.onRowDoubleClick(e, row, data);
                }
              }}
              components={{
                OverlayLoading: () => {
                  return (
                    <div
                      style={{
                        display: "table",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgb(255, 255, 255)",
                        opacity: "0.7",
                      }}
                    >
                      <div
                        style={{
                          display: "table-cell",
                          width: "100%",
                          height: "100%",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        {/* <OrixiaSpinner
                          text={"Ejecutando Consulta"}
                          spinner={<Spinner color={"info"} />}
                        /> */}
                      </div>
                    </div>
                  );
                },
                Body: (props) => {
                  if (opcionesListado.consultaEjecutada === "n") return <></>;
                  return <MTableBody {...props} />;
                },
                Row: (props) => {
                  const habilitado =
                    opcionesListado.listado_seleccion_habilitado
                      ? props.data[
                          opcionesListado.id_a + `_listado_seleccion_habilitado`
                        ] === 1
                      : true;

                  return (
                    // <MTableBodyRow id={props.data._id} {...props} enableRowSelection={false}                    />
                    // <OrixiaRow {...props} enableRowSelection={habilitado} />
                    <MemoizedOrixiaRow
                      {...props}
                      enableRowSelection={habilitado}
                    />
                  );
                },
                Pagination: (props) => {
                  //  if (data.length === 0 || !data) return <></>;
                  if (opcionesListado.paginacion === "n") return <></>;
                  if (opcionesListado.consultaEjecutada === "n") return <></>;
                  return (
                    <TablePagination
                      className={
                        opcionesListado.paginacion === "n" ? "d-none" : ""
                      }
                      {...props}
                    />
                  );
                },
              }}
              // style={{ minWidth: "1300px", overflowX: "auto" }}
            />

            {opcionesListado.usar_mapa === "s" && data.length > 0 ? (
              <Mapa
                display={mapa ? "inherit" : "none"}
                data={data}
                cab={mapaCab}
              />
            ) : (
              <></>
            )}
            {/* CARRUSEL SE ABRE POR DEFECTO EN OTRA VENTANA */}
            {/* {opcionesListado.usar_carrusel === "s" ? (
              <Carrusel
                opcionesListado={opcionesListado}
                data={data}
                setCarrusel={setCarrusel}
                carrusel={carrusel}
              />
            ) : (
              <></>
            )} */}
            <Botonera
              handleSubmit={() => null}
              handleCancelar={() => null}
              loading={loading}
              buscar={0}
              cancelar={0}
              acciones={listadoBotonesInferiores}
              className={"container_buttons_inferiores"}
              context={ListadoContext}
              submit={opcionesListado.submit_button}
              submit_handleSubmit={opcionesListado.submit_button_handleSubmit}
              submit_texto={opcionesListado.submit_texto}
            />
          </ThemeProvider>
        </CardBody>
      </Card>
      {/* </Col>
      </Row> */}
    </div>
  );
};

export default Listado;
