import React from "react";
import axios from "axios";
import { farmageo_api } from "../../config";

import "./instituciones.scss";
import { Autocomplete, TextField } from "@mui/material";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  CardImg,
  CardFooter,
} from "reactstrap";

export function AltaInstituciones(props) {
  const [instituciones, setInstituciones] = React.useState(
    props.institucionesReducer.instituciones
  );
  const { setModal, edit, institucion, limit } = props;
  console.log(institucion);
  const [madre, setMadre] = React.useState(
    edit
      ? {
          id: institucion.id_institucion_madre
            ? institucion.id_institucion_madre._id
            : null,
          name: institucion.id_institucion_madre
            ? institucion.id_institucion_madre.nombre
            : "",
        }
      : { id: null, name: "" }
  );

  const [nombre, setNombre] = React.useState(edit ? institucion.nombre : "");
  const [habilitada, setHabilitada] = React.useState(
    edit ? institucion.habilitada : true
  );

  const [search, setSearch] = React.useState("");

  const handleSubmit = () => {
    if (edit) {
      props.ACTUALIZAR_INSTITUCION({
        nombre: nombre,
        id_institucion_madre: madre.id,
        habilitada: habilitada,
        id: institucion._id,
        limit: limit,
      });
      return;
    }
    if (nombre.trim() !== "") {
      props
        .CREAR_INSTITUCION({
          nombre: nombre,
          id_institucion_madre: madre.id,
          habilitada: habilitada,
          limit: limit,
        })
        .then((re) => {
          setMadre("");
          setNombre("");
          setModal((state) => !state);
        });
      return;
    }
    alert("El nombre es Obligatorio");
  };

  React.useEffect(() => {
    if (!!search && search.length > 1) {
      props
        .SEARCH_INSTITUCIONES(search, limit)
        .then((res) => setInstituciones(() => res));
      return;
    }
    if (search.trim() === "") {
      setInstituciones(() => props.institucionesReducer.instituciones);
      return;
    }
  }, [search, setSearch]);

  return (
    <div id="altainstituciones" className="animated fadeIn altainstituciones">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              {edit ? "Edicion de Datos" : "Alta de instituciones"}

              <div
                className="altainstituciones_close"
                onClick={() => setModal((state) => !state)}
              >
                X
              </div>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Row className="altainstituciones_row">
                  <Col xs="12" sm="5" xl="4">
                    <TextField
                      label="Nombre"
                      onChange={(e) => setNombre(e.target.value)}
                      className="altainstituciones_nombre"
                      value={nombre}
                    />
                  </Col>
                  <Col xs="12" sm="7" xl="6">
                    <Autocomplete
                      getOptionLabel={(option) => option.name}
                      options={instituciones.map((inst) => {
                        return { id: inst._id, name: inst.nombre };
                      })}
                      renderInput={(params) => (
                        <TextField label={"Institucion Madre"} {...params} />
                      )}
                      onChange={(e, newInstitucion) => {
                        setMadre(() => newInstitucion);
                      }}
                      value={madre}
                      onInputChange={(e, value) => {
                        setSearch(() => value);
                      }}
                    />
                  </Col>
                  <Col
                    className="altainstituciones_habilitada"
                    xs="12"
                    sm="2"
                    xl="2"
                  >
                    <Label className="altainstituciones_habilitada_label">
                      Habilitada
                    </Label>
                    <select
                      className="altainstituciones_habilitada_select"
                      value={habilitada}
                      onChange={() => setHabilitada((state) => !state)}
                    >
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  </Col>
                </Row>
              </FormGroup>
              <Button
                onClick={handleSubmit}
                className="altainstituciones_submit"
              >
                {edit ? "Guardar" : "Añadir Institucion"}
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
