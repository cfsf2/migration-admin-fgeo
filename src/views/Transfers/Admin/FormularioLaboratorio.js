import React, { useEffect, useState } from "react";
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

const labinit = {
  _id: "",
  nombre: "",
  habilitado: true,
  transfer_farmageo: true,
  url: "",
  novedades: "",
  condiciones_comerciales: "",
  imagen: undefined,
};

const FormularioLaboratorio = (props) => {
  const { laboratorio } = props;

  const [datos, setDatos] = useState(laboratorio);

  const handleEditImagen = (urlImagen) => {
    console.log(urlImagen);
    setDatos({
      ...datos,
      imagen: urlImagen,
    });
  };

  const handleInputChange = (e) => {
    const target = e.nativeEvent.target;
    let value = target.type === "checkbox" ? target.checked : target.value;

    if (e.target.value === "true" || e.target.value === "false") {
      if (e.target.value === "true") {
        value = true;
      } else {
        value = false;
      }
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
        nombre: laboratorio.nombre,
        habilitado: laboratorio.habilitado,
        transfer_farmageo: laboratorio.transfer_farmageo,
        url: laboratorio.url ? laboratorio.url : "",
        novedades: laboratorio.novedades,
        condiciones_comerciales: laboratorio.condiciones_comerciales,
        imagen: laboratorio.imagen,
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
                <Col>
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
                <Col>
                  <FormGroup>
                    <Label>Estado</Label>
                    <Input
                      type="select"
                      name="habilitado"
                      value={datos ? null : datos.habilitado}
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
                      value={datos.transfer_farmageo}
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
