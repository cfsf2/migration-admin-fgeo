import React, { useEffect, useState } from "react";
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

const labinit = {
  _id: "",
  nombre: "",
  habilitado: true,
  transfer_farmageo: true,
  es_bono_descuento: false,
  url: "",
  novedades: "",
  condiciones_comerciales: "",
  imagen: undefined,
  email: undefined,
};

const FormularioLaboratorio = (props) => {
  const { laboratorio, pantalla } = props;

  const [datos, setDatos] = useState(laboratorio);

  const handleEditImagen = (urlImagen) => {
    setDatos({
      ...datos,
      imagen: urlImagen,
    });
  };

  const handleInputChange = (e) => {
    const target = e.nativeEvent.target;
    let value = target.type === "checkbox" ? target.checked : target.value;

    if (e.target.value === "true" || e.target.value === "false") {
      value = e.target.value === "true";
    }

    const name = target.name;

    setDatos({
      ...datos,
      [name]: value,
    });
  };

  useEffect(() => {
    setDatos(labinit);

    if (laboratorio) {
      setDatos({
        _id: laboratorio._id,
        nombre: laboratorio.nombre || "",
        habilitado:
          laboratorio.habilitado !== undefined
            ? laboratorio.habilitado
            : true,
        transfer_farmageo:
          laboratorio.transfer_farmageo !== undefined
            ? laboratorio.transfer_farmageo
            : true,
        es_bono_descuento:
          laboratorio.es_bono_descuento !== undefined
            ? laboratorio.es_bono_descuento
            : false,
        url: laboratorio.url ? laboratorio.url : "",
        novedades: laboratorio.novedades || "",
        condiciones_comerciales:
          laboratorio.condiciones_comerciales || "",
        imagen: laboratorio.imagen,
        email: laboratorio.email || "",
      });
    } else {
      setDatos(labinit);
    }
  }, [laboratorio._id]);

  return (
    <>
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>{datos.editar ? "Editar" : "Nuevo Laboratorio"}</Col>
              </Row>
            </CardHeader>

            <CardBody>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      type="text"
                      id="nombre"
                      name="nombre"
                      onChange={handleInputChange}
                      value={datos.nombre}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Estado</Label>
                    <Input
                      type="select"
                      name="habilitado"
                      value={datos.habilitado}
                      onChange={handleInputChange}
                    >
                      <option value="">seleccionar...</option>
                      <option value={true}>Habilitado</option>
                      <option value={false}>Deshabilitado</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Laboratorio Externo</Label>
                    <Input
                      type="select"
                      name="transfer_farmageo"
                      value={datos.transfer_farmageo}
                      onChange={handleInputChange}
                    >
                      <option value="">seleccionar...</option>
                      <option value={false}>Si</option>
                      <option value={true}>No</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col xs="12" md="6">
                  <FormGroup>
                    <Label>Sistema de bonos y programas de descuentos</Label>
                    <Input
                      type="select"
                      name="es_bono_descuento"
                      value={datos.es_bono_descuento}
                      onChange={handleInputChange}
                    >
                      <option value="">seleccionar...</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
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
                      value={datos.novedades}
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
                      value={datos.condiciones_comerciales}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      value={datos.email}
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
                      className="laboratorios_formulariolaboratorio_cardimg"
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
                  {datos._id !== "" ? (
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
                        props.ADD_LABORATORIO(datos, pantalla);
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