import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  CardImg,
} from "reactstrap";

import { EditProducto } from "./EditProducto";
import { connect } from "react-redux";
import {
  GET_PRODUCTOS_TRANSFERS,
  ADD_PRODUCTO_TRANSFER,
  GET_LABORATORIOS_ADMIN,
  UPDATE_PRODUCTO_TRANSFER,
  DELETE_PRODUCTO_TRANSFER,
  DELETE_PRODUCTO_TRANSFER_BY_LAB,
} from "../../../redux/actions/transfersActions";

import Swal from "sweetalert2";
import { requestErrorHandler } from "../../Pantalla/context/FuncionesContext";

import { image_path_server, farmageo_api } from "../../../config";
import Axios from "axios";

class ProductosTransfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: null,
      labFilter: null,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleListadoPapelera = this.handleListadoPapelera.bind(this);
  }

  async handleListadoPapelera() {
    try {
      if (!this.state.labFilter) {
        const r = await Swal.fire({
          title: "Esta Seguro?",
          text: "No ha seleccionado un laboratorio. Si continua enviara a todos los productos a la papelera.",
          icon: "warning",
          confirmButtonText: "Eliminar Todos los Productos",
          timer: 300000,
          denyButtonText: "Cancelar",
          showDenyButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
        });

        if (r.isDenied || r.isDismissed) {
          return;
        }
      }

      const res = await this.props.DELETE_PRODUCTO_TRANSFER_BY_LAB(
        this.state.labFilter
      );

      if (res.status >= 400) {
        return requestErrorHandler(res);
      }
      Swal.fire({
        title: "Exito",
        text: res.data,
        icon: "success",
        timer: 5000,
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.props.GET_LABORATORIOS_ADMIN();
    this.props.GET_PRODUCTOS_TRANSFERS();
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
    const { productos, laboratorios } = this.props.tranfersReducer;
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
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="select"
                          id="labFilter"
                          name="labFilter"
                          value={
                            this.state.labFilter !== null
                              ? this.state.labFilter
                              : ""
                          }
                          onChange={this.handleFilter}
                        >
                          <option>Laboratorio...</option>
                          {laboratorios.map((lab, index) => {
                            if (lab.transfer_farmageo === "s") {
                              return (
                                <option value={lab.id} key={index}>
                                  {lab.nombre}
                                </option>
                              );
                            }
                          })}
                        </Input>
                      </Col>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar producto..."
                          name="filtro"
                        />
                      </Col>

                      <Col xs="12" md="4">
                        <Button
                          data-toggle="modal"
                          data-target=".bd-example-modal-lg"
                          onClick={() =>
                            this.setState({
                              editar: false,
                              producto: null,
                            })
                          }
                        >
                          + Nuevo Producto
                        </Button>
                        <Button
                          className="btn btn-danger"
                          onClick={this.handleListadoPapelera}
                        >
                          Enviar Listado a papelara
                        </Button>
                      </Col>
                    </Row>

                    <hr />

                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>Código</th>
                            <th>Laboratorio</th>
                            <th>Producto / Presentación</th>
                            <th>Imagen</th>
                            <th>Cantidad Mínima</th>
                            <th>%</th>
                            <th>Habilitado</th>
                            <th>Última modificación</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((obj, index) => {
                            return this.state.labFilter === null ||
                              this.state.labFilter === obj.laboratorioid ? (
                              <tr key={index}>
                                <td>{obj.codigo}</td>
                                <td>
                                  {laboratorios.map((lab, ind) => {
                                    return lab.id ===
                                      parseInt(obj.laboratorioid)
                                      ? lab.nombre
                                      : null;
                                  })}
                                </td>
                                <td>
                                  {obj.nombre} / {obj.presentacion}{" "}
                                </td>
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
                                <td>{obj.cantidad_minima}</td>
                                <td>{obj.descuento_porcentaje}</td>
                                <td>{obj.habilitado ? "Si" : "No"}</td>
                                <td>{obj.fechaalta.substring(0, 10)}</td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={() =>
                                      this.setState({
                                        editar: true,
                                        producto: obj,
                                      })
                                    }
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      this.props.DELETE_PRODUCTO_TRANSFER(obj)
                                    }
                                  >
                                    Enviar a Papelera
                                  </Button>
                                </td>
                              </tr>
                            ) : null;
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <EditProducto
                state={this.state}
                setState={this.setState.bind(this)}
                laboratorios={laboratorios}
                {...this.props}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {
  GET_PRODUCTOS_TRANSFERS,
  ADD_PRODUCTO_TRANSFER,
  GET_LABORATORIOS_ADMIN,
  UPDATE_PRODUCTO_TRANSFER,
  DELETE_PRODUCTO_TRANSFER,
  DELETE_PRODUCTO_TRANSFER_BY_LAB,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductosTransfers);
