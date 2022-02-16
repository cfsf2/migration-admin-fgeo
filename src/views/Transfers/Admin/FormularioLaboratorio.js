import React, { useEffect } from "react";
import Laboratorios from "./Laboratorios";
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
import { image_path_server } from "../../../config";
import Uploader from "../../../components/Uploader";

const FormularioLaboratorio = (props) => {
  const { state, setState, handleInputChange, handleEditImagen, labInit } =
    props;

  const [datos, setDatos] = React.useState(labInit);

  useEffect(() => {
    setDatos(() => {
      const newState = { ...labInit };
      return newState;
    });

    if (state.laboratorio._id) {
      setDatos(() => {
        let newState = { ...state.laboratorio };
        newState.url = state.laboratorio.url ? state.laboratorio.url : "";

        return newState;
      });
    }
  }, [state.laboratorio._id]);

  return (
    <>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>{state.editar ? "Editar" : "Nuevo Laboratorio"}</Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      type="text"
                      id="nombre"
                      name="nombre"
                      onChange={handleInputChange}
                      value={datos != null ? datos.nombre : ""}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Estado</Label>
                    <Input
                      type="select"
                      name="habilitado"
                      value={datos ? datos.habilitado : undefined}
                      onChange={handleInputChange}
                    >
                      <option value={undefined}>seleccionar...</option>
                      <option value={true}>Habilitado</option>
                      <option value={false}>Deshabilitado</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Laboratorio Externo</Label>
                    <Input
                      // select devuelve un string
                      type="select"
                      name="transfer_farmageo"
                      value={datos ? datos.transfer_farmageo : undefined}
                      onChange={handleInputChange}
                    >
                      <option value={undefined}>seleccionar...</option>
                      <option value={false}>Si</option>
                      <option value={true}>No</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="nueva_url">Url</Label>
                    <Input
                      type="url"
                      id="_id"
                      name="url"
                      onChange={handleInputChange}
                      disabled={datos.transfer_farmageo}
                      value={datos.url}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="novedades">Novedades</Label>
                    <Input
                      type="text"
                      id="novedades"
                      name="novedades"
                      onChange={handleInputChange}
                      value={datos != null ? datos.novedades : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="condiciones_comerciales">
                      Condiciones comerciales
                    </Label>
                    <Input
                      type="text"
                      id="condiciones_comerciales"
                      name="condiciones_comerciales"
                      onChange={handleInputChange}
                      value={datos != null ? datos.condiciones_comerciales : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <FormGroup>
                    <p>
                      <b>Imagen</b>
                    </p>
                    <CardImg
                      src={
                        datos
                          ? datos.imagen !== undefined
                            ? image_path_server + datos.imagen
                            : null
                          : null
                      }
                    />
                    <Uploader
                      handleEditImagen={handleEditImagen}
                      isPerfil={false}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <hr />
            </CardBody>
            <CardFooter>
              <Row>
                <Col></Col>
                <Col>
                  {state.editar ? (
                    <Button
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={() => {
                        props.UPDATE_LABORATORIO(datos);
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={() => {
                        props.ADD_LABORATORIO(datos);
                      }}
                    >
                      Confirmar
                    </Button>
                  )}
                </Col>
                <Col>
                  <Button className="btn btn-danger" data-dismiss="modal">
                    Cancelar
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FormularioLaboratorio;
