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
  GET_PRODUCTOS_PACK,
  ADD_PRODUCTO_PACK,
  GET_ENTIDADES,
  GET_CATEGORIAS,
  UPDATE_PRODUCTO_PACK,
  RECUPERAR_PRODUCTO_PACK,
} from "../../../redux/actions/packsproductosActions";
import { image_path_server, farmageo_api } from "../../../config";

import Uploader from "../../../components/Uploader";
import MaterialTable from "material-table";

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


class PapeleraProductosPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: null,
      entidadFilter: "",
      categoriaFilter: "",
      filtro: "",
      productos: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleListadoPapelera = this.handleListadoPapelera.bind(this);
    this.getPapelera = this.getPapelera.bind(this);
    this.handleRecuperar = this.handleRecuperar.bind(this);
  }

  async handleRecuperar(p) {
    let response = await RECUPERAR_PRODUCTO_PACK(p);
    if (response) {
      this.getPapelera();
    }
  }

  getPapelera() {
    fetch(farmageo_api + "/productospack/papelera")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ productos: data });
      });
  }

  //no funciona
  async handleListadoPapelera() {
    const { productos } = this.state;
    const filter = await productos.filter((p) => {
      return (
        p.entidad_id === this.state.entidadFilter &&
        p.categoria_id === this.state.categoriaFilter
      );
    });
    filter.map((f) => {
      this.props.UPDATE_PRODUCTO_PACK({
        ...f,
        en_papelera: null,
        habilitado: true,
      });
    });
  }

  componentDidMount() {
    this.props.GET_ENTIDADES();
    //this.props.GET_PRODUCTOS_PACK();
    this.getPapelera();
    this.props.GET_CATEGORIAS();
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    //console.log([name] + ": " + value);
    this.setState({
      producto: {
        ...this.state.producto,
        [name]: value,
      },
    });
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
    const {
      // productos,
      entidades,
      categorias,
    } = this.props.packsproductosReducer;
    const { productos } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de productos</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="entidadFilter"
                          name="entidadFilter"
                          value={
                            this.state.entidadFilter !== null
                              ? this.state.entidadFilter
                              : ""
                          }
                          onChange={this.handleFilter}
                        >
                          <option value={""}>Todas las entidades...</option>
                          {entidades.map((entidad, index) => {
                            return (
                              <option value={entidad._id} key={index}>
                                {entidad.entidadnombre}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="categoriaFilter"
                          name="categoriaFilter"
                          value={
                            this.state.categoriaFilter !== null
                              ? this.state.categoriaFilter
                              : ""
                          }
                          onChange={this.handleFilter}
                        >
                          <option value={""}>Todas las categorias...</option>
                          {categorias.map((categoria, index) => {
                            return (
                              <option value={categoria._id} key={index}>
                                {categoria.nombre}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="3" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar producto..."
                          name="filtro"
                          onChange={this.handleFilter}
                        />
                      </Col>
                      {/*<Col xs="12" md="3">
                        <Button
                          className="btn btn-warning"
                          onClick={this.handleListadoPapelera}
                        >
                          Recuperar Listado
                        </Button>
                        </Col>*/}
                    </Row>

                    <hr />
                    <MaterialTable
                      title="Positioning Actions Column Preview"
                      icons={tableIcons}
                      localization={{
                        header: {

                          actions: "Acciones",
                        },
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
                      columns={[
                        { title: 'SKU', field: 'sku' },
                        { title: 'Entidad', field: 'entidadName' },
                        { title: 'Categoria', field: 'categoriaName' },
                        { title: 'Nombre', field: 'nombre' },
                        { title: 'Imagen', field: 'imagen',align:"center", render: rowData => rowData.imagen ? <img src={image_path_server + rowData.imagen} style={{ width: 50, borderRadius: '10%' }} /> : null },
                        { title: 'Precio en Farmageo', field: 'precio', type: 'numeric' },
                        { title: 'Habilitado', field: 'habilitado', type: "boolean" },
                        { title: 'Descripción', field: 'descripcion' }
                      ]}
                      data={productos.map((column => {
                        let newColumn = column
                        newColumn.entidadName = entidades.map((entidad) => {
                          return entidad._id === column.entidad_id
                            ? entidad.entidadnombre
                            : null;
                        })
                        newColumn.categoriaName = categorias.map((categoria) => {
                          return categoria._id === column.categoria_id
                            ? categoria.nombre
                            : null;
                        })
                        return newColumn
                      }))}
                      actions={[
                        {
                          icon: () => <RestoreIcon />,
                          tooltip: 'Recuperar Producto',
                          onClick: (event, rowData) => {
                            this.handleRecuperar({
                              ...rowData,
                              en_papelera: null,
                            })
                          }
                        }
                      ]}
                      options={{
                        actionsColumnIndex: -1,
                        pageSize: 50,
                        pageSizeOptions: [5, 10, 20, 30, 50]
                      }}
                      
                    />
                    {/* <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>SKU</th>
                            <th>Entidad</th>
                            <th>Categoria</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio en FarmaGeo</th>
                            <th>Habilitado</th>
                            <th>Descripción</th>
                            <th>fecha de alta</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log(productos)}
                          {productos.map((obj, index) => {
                            return (obj.entidad_id != null
                              ? obj.entidad_id.includes(
                                this.state.entidadFilter
                              )
                              : false) &&
                              (obj.categoria_id != null
                                ? obj.categoria_id.includes(
                                  this.state.categoriaFilter
                                )
                                : false) &&
                              obj.nombre
                                .toUpperCase()
                                .includes(this.state.filtro.toUpperCase()) ? (
                              <tr key={index}>
                                <td>{obj.sku}</td>
                                <td>
                                  {entidades.map((entidad) => {
                                    return entidad._id === obj.entidad_id
                                      ? entidad.entidadnombre
                                      : null;
                                  })}
                                </td>
                                <td>
                                  {categorias.map((categoria) => {
                                    return categoria._id === obj.categoria_id
                                      ? categoria.nombre
                                      : null;
                                  })}
                                </td>
                                <td style={{ width: "150px" }}>{obj.nombre}</td>
                                <td>
                                  <CardImg
                                    src={
                                      obj.imagen != undefined
                                        ? image_path_server + obj.imagen
                                        : null
                                    }
                                    style={{ width: 100, paddingRight: 40 }}
                                  />
                                </td>
                                <td>{obj.precio}</td>

                                <td>{obj.habilitado ? "Si" : "No"}</td>
                                <td>
                                  <p
                                    className="text-truncate"
                                    style={{ width: "150px" }}
                                  >
                                    {obj.descripcion}
                                  </p>
                                </td>
                                <td>{obj.fechaalta.substring(0, 10)}</td>
                                <td>
                                  <Button
                                    className="btn btn-warning"
                                    onClick={() =>

                                      console.log(obj)
                                      // this.handleRecuperar({
                                      //   ...obj,
                                      //   en_papelera: null,
                                      // })
                                    }
                                  >
                                    Recuperar
                                  </Button>
                                </td>
                              </tr>
                            ) : null;
                          })}
                        </tbody>
                      </table>
                    </div> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {/*}
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
                      {this.state.editar ? (
                        <Row>
                          <Col>
                            <b>Editar producto</b>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label htmlFor="titulo">Habilitado</Label>
                              <Input
                                type="select"
                                id="habilitado"
                                name="habilitado"
                                value={
                                  this.state.producto !== null
                                    ? this.state.producto.habilitado
                                    : ""
                                }
                                onChange={this.handleInputChange}
                              >
                                <option value={null}>Seleccionar...</option>
                                <option value={true}>SI</option>
                                <option value={false}>NO</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : (
                        <Row>
                          <Col>Nuevo Producto</Col>
                        </Row>
                      )}
                    </CardHeader>
                    <CardHeader>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Entidad</Label>
                            <Input
                              type="select"
                              id="entidad_id"
                              name="entidad_id"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.entidad_id
                                  : "sin_entidad"
                              }
                              onChange={this.handleInputChange}
                            >
                              <option value="sin_entidad">
                                Seleccionar...
                              </option>
                              {entidades.map((entidad, index) => {
                                return (
                                  <option value={entidad._id} key={index}>
                                    {entidad.entidadnombre}
                                  </option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="rentabilidad">Rentabilidad</Label>
                            <Input
                              type="number"
                              id="rentabilidad"
                              name="rentabilidad"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.rentabilidad != null
                                    ? this.state.producto.rentabilidad
                                    : 0
                                  : 0
                              }
                              onChange={this.handleInputChange}
                              onBlur={this.handleCalcularPVP}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Precio(sin IVA)</Label>
                            <Input
                              type="number"
                              id="precio_sin_IVA"
                              name="precio_sin_IVA"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.precio_sin_IVA
                                    ? this.state.producto.precio_sin_IVA
                                    : this.state.producto.precio_con_IVA / 1.21
                                  : 0
                              }
                              onChange={this.handleInputChange}
                              onBlur={() =>
                                this.setState({
                                  producto: {
                                    ...this.state.producto,
                                    precio_con_IVA:
                                      this.state.producto.precio_sin_IVA * 1.21,
                                  },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Precio(con IVA)</Label>
                            <Input
                              type="number"
                              id="precio_con_IVA"
                              name="precio_con_IVA"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.precio_con_IVA
                                    ? this.state.producto.precio_con_IVA
                                    : 0
                                  : 0
                              }
                              onChange={this.handleInputChange}
                              onBlur={() =>
                                this.setState({
                                  producto: {
                                    ...this.state.producto,
                                    precio_sin_IVA: parseFloat(
                                      this.state.producto.precio_con_IVA / 1.21
                                    ).toFixed(2),
                                  },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>*Calcula el precio en FarmaGeo</Label>
                            <Input
                              type="button"
                              onClick={this.handleCalcularPVP}
                              value="Acualizar precio PVP"
                              className="btn btn-warning"
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Precio (PVP)</Label>
                            <Input
                              type="Number"
                              id="precio"
                              name="precio"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.precio
                                  : ""
                              }
                              onBlur={this.handleAjustarRentabilidad}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label htmlFor="titulo">SKU</Label>
                                <Input
                                  type="text"
                                  id="sku"
                                  name="sku"
                                  onChange={this.handleInputChange}
                                  value={
                                    this.state.producto !== null
                                      ? this.state.producto.sku
                                      : ""
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <FormGroup>
                            <p>
                              <b>Imagen</b>
                            </p>
                            <CardImg
                              src={
                                this.state.producto
                                  ? this.state.producto.imagen !== undefined
                                    ? image_path_server +
                                      this.state.producto.imagen
                                    : null
                                  : null
                              }
                            />
                            <Uploader
                              handleEditImagen={this.handleEditImagen}
                              isPerfil={false}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr />

                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Nombre</Label>
                            <Input
                              type="text"
                              id="nombre"
                              name="nombre"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.nombre
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Descripción</Label>
                            <Input
                              type="textarea"
                              id="descripcion"
                              name="descripcion"
                              onChange={this.handleInputChange}
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.descripcion
                                  : ""
                              }
                              style={{ height: "200px" }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr />
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="titulo">Categoría</Label>
                            <Input
                              type="select"
                              id="categoria_id"
                              name="categoria_id"
                              value={
                                this.state.producto !== null
                                  ? this.state.producto.categoria_id
                                  : ""
                              }
                              onChange={this.handleInputChange}
                            >
                              <option value={null}>Seleccionar...</option>
                              {categorias.map((categoria, index) => {
                                return (
                                  <option value={categoria._id} key={index}>
                                    {categoria.nombre}
                                  </option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr />
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <Col md="4" xs="4" align="center">
                          {" "}
                          <Button
                            className="btn btn-warning"
                            onClick={this.handleBlanquear}
                            style={{ margin: 1 }}
                          >
                            Blanquear
                          </Button>
                        </Col>

                        <Col md="4" xs="4" align="center">
                          {this.state.editar ? (
                            <Button
                              className="btn btn-success"
                              data-dismiss="modal"
                              onClick={() => {
                                this.props.UPDATE_PRODUCTO_PACK(
                                  this.state.producto
                                );
                              }}
                              disabled={
                                this.state.producto != null
                                  ? this.state.producto.entidad_id == null ||
                                    this.state.producto.entidad_id ==
                                      "sin_entidad" ||
                                    this.state.producto.entidad_id == ""
                                  : true
                              }
                              style={{ margin: 1 }}
                            >
                              Guardar Cambios
                            </Button>
                          ) : (
                            <Button
                              className="btn btn-success"
                              data-dismiss="modal"
                              onClick={() => {
                                this.props.ADD_PRODUCTO_PACK(
                                  this.state.producto
                                );
                              }}
                              disabled={
                                this.state.producto != null
                                  ? this.state.producto.entidad_id == null ||
                                    this.state.producto.entidad_id ==
                                      "sin_entidad" ||
                                    this.state.producto.entidad_id == ""
                                  : true
                              }
                              style={{ margin: 1 }}
                            >
                              Confirmar
                            </Button>
                          )}
                        </Col>

                        <Col md="4" xs="4" align="center">
                          <Button
                            className="btn btn-danger"
                            data-dismiss="modal"
                            style={{ margin: 1 }}
                          >
                            Cancelar
                          </Button>
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
                            */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { packsproductosReducer: state.packsproductosReducer };
};
const mapDispatchToProps = {
  GET_PRODUCTOS_PACK,
  ADD_PRODUCTO_PACK,
  GET_ENTIDADES,
  UPDATE_PRODUCTO_PACK,
  GET_CATEGORIAS,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PapeleraProductosPack);
