import React from "react";
import AsignarInstitucion from "../../FarmaciasAdmin/components/AsignarInstituciones";
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
  Spinner,
} from "reactstrap";
import Uploader from "../../../components/Uploader";
import { image_path_server } from "../../../config";
import axios from "axios";
import { farmageo_api } from "../../../config";

export function EditProducto(props) {
  const { state, setState, laboratorios } = props;
  const [producto, setProducto] = React.useState(state.producto);
  const [instituciones, setInstituciones] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleBlanquear = () => {
    setState({
      producto: null,
    });
  };

  const handleInputChange = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    //console.log([name] + ": " + value);
    setProducto(() => {
      return {
        ...producto,
        [name]: value,
      };
    });
  };

  const handleEditImagen = async (urlImagen) => {
    await setState({
      producto: {
        ...producto,
        imagen: urlImagen,
      },
    });
  };

  React.useEffect(() => {
    setProducto(() => null);
    if (state.producto) {
      setProducto(() => state.producto);

      axios
        .get(
          farmageo_api +
            "/productosTransfers/instituciones/" +
            state.producto._id
        )
        .then((res) => {
          setInstituciones(() => res.data);
          setProducto((state) => {
            // aca pasa algo raro
            let newState = { ...state };
            newState.instituciones = res.data;
            return newState;
          });
          setState({
            ...state,
            instituciones: res.data,
          });
        })
        .then(() => {
          setLoading(() => false);
        });
      return;
    }
    setLoading(() => false);
  }, [state.producto?._id]);

  return (
    <Row>
      {loading ? (
        <div className="w-100 d-flex justify-content-center p-4">
          <Spinner />
        </div>
      ) : (
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  {state.editar ? (
                    <b>Editar producto</b>
                  ) : (
                    <b>Nuevo producto</b>
                  )}
                </Col>
                <Col>
                  <FormGroup>
                    <Label htmlFor="titulo">Habilitado</Label>
                    <Input
                      type="select"
                      id="habilitado"
                      name="habilitado"
                      value={producto !== null ? producto.habilitado : ""}
                      onChange={handleInputChange}
                    >
                      <option value={null}>Seleccionar...</option>
                      <option value={true}>SI</option>
                      <option value={false}>NO</option>
                    </Input>
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
                        <Label htmlFor="titulo">Código</Label>
                        <Input
                          type="text"
                          id="codigo"
                          name="codigo"
                          onChange={handleInputChange}
                          value={producto !== null ? producto.codigo : ""}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="titulo">Precio</Label>
                        <Input
                          type="Number"
                          id="precio"
                          name="precio"
                          onChange={handleInputChange}
                          value={producto !== null ? producto.precio : ""}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <p>
                    <b>Imagen</b>
                  </p>
                  <CardImg
                    src={
                      producto
                        ? producto.imagen !== undefined
                          ? image_path_server + producto.imagen
                          : null
                        : null
                    }
                  />
                  <Uploader
                    handleEditImagen={handleEditImagen}
                    isPerfil={false}
                  />
                </Col>
              </Row>

              <hr />
              <FormGroup>
                <Row>
                  <Col>
                    <Label htmlFor="titulo">Nombre</Label>
                    <Input
                      type="text"
                      id="nombre"
                      name="nombre"
                      onChange={handleInputChange}
                      value={producto !== null ? producto.nombre : ""}
                    />
                  </Col>
                  {/* <Col>
                    <Label htmlFor="titulo">Presentación</Label>
                    <Input
                      type="text"
                      id="presentacion"
                      name="presentacion"
                      onChange={handleInputChange}
                      value={producto !== null ? producto.presentacion : ""}
                    />
                  </Col> */}
                  <Col>
                    <Label htmlFor="titulo">Presentación</Label>
                    <textarea
                      name="presentacion"
                      class="form-control"
                      style={{ overflow: "auto", height: '100%' }}
                      onChange={handleInputChange}
                      value={producto !== null ? producto.presentacion : ""}
                    ></textarea>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <Label htmlFor="titulo">Laboratorio</Label>
                    <Input
                      type="select"
                      id="laboratorioid"
                      name="laboratorioid"
                      value={producto !== null ? producto.laboratorioid : ""}
                      onChange={handleInputChange}
                    >
                      <option value={null}>Seleccionar...</option>
                      {laboratorios.map((lab, index) => {
                        return (
                          <option value={lab._id} key={index}>
                            {lab.nombre}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>

              <hr />
              <FormGroup>
                <Row>
                  <Col>
                    <Label htmlFor="titulo">Cantidad Mínima</Label>
                    <Input
                      type="Number"
                      id="cantidad_minima"
                      name="cantidad_minima"
                      onChange={handleInputChange}
                      value={producto !== null ? producto.cantidad_minima : ""}
                    />
                  </Col>
                  <Col>
                    <Label htmlFor="titulo">Porcentaje de Descuento</Label>
                    <Input
                      type="Number"
                      id="descuento_porcentaje"
                      name="descuento_porcentaje"
                      onChange={handleInputChange}
                      value={
                        producto !== null ? producto.descuento_porcentaje : ""
                      }
                    />
                  </Col>
                </Row>
                <Row className="productotransfer_asignar p-3">
                  <AsignarInstitucion
                    obj={producto ? producto : undefined}
                    setObj={setState.bind(this)}
                    loading={loading}
                  />
                </Row>
              </FormGroup>
              <hr />
            </CardBody>
            <CardFooter>
              <Row className="w-100 d-flex justify-content-center">
                <Col className="d-flex justify-content-center">
                  {" "}
                  <Button className="btn btn-warning" onClick={handleBlanquear}>
                    Blanquear
                  </Button>
                </Col>

                <Col className="d-flex justify-content-center">
                  {state.editar ? (
                    <Button
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={() => {
                        props.UPDATE_PRODUCTO_TRANSFER(
                          producto,
                          state.instituciones
                        );
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={() => {
                        props.ADD_PRODUCTO_TRANSFER(
                          producto,
                          state.instituciones
                        );
                      }}
                    >
                      Confirmar
                    </Button>
                  )}
                </Col>

                <Col className="d-flex justify-content-center">
                  <Button className="btn btn-danger" data-dismiss="modal">
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      )}
    </Row>
  );
}
