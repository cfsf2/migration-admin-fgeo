import React from "react";

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
  const { setModal } = props;

  const [madre, setMadre] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [habilitada, setHabilitada] = React.useState(true);

  const [search, setSearch] = React.useState("");

  const handleSubmit = () => {
    if (nombre.trim() !== "") {
      props
        .CREAR_INSTITUCION({
          nombre: nombre,
          id_institucion_madre: madre.id,
          habilitada: habilitada,
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
    if (search.length > 1) {
      props
        .SEARCH_INSTITUCIONES(search, 10)
        .then((res) => setInstituciones(() => res));
    }
    if (search.trim() === "") {
      setInstituciones(() => props.institucionesReducer.instituciones);
    }
  }, [search, setSearch]);

  return (
    <div id="altainstituciones" className="animated fadeIn altainstituciones">
      <Row>
        <Col>
          <Card>
            <CardHeader>Alta de instituciones</CardHeader>
            <CardBody>
              <FormGroup>
                <Row className="altainstituciones_row">
                  <Col xs="12" sm="5" xl="4">
                    <TextField
                      label="Nombre"
                      onChange={(e) => setNombre(e.target.value)}
                      className="altainstituciones_nombre"
                    />
                  </Col>
                  <Col xs="12" sm="7" xl="6">
                    <Autocomplete
                      getOptionLabel={(option) => option.name}
                      options={instituciones.map((inst) => {
                        return { id: inst._id, name: inst.nombre };
                      })}
                      renderInput={(params) => (
                        <TextField
                          label={"Institucion Madre"}
                          {...params}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      )}
                      onChange={(e, newInstitucion) => {
                        setMadre(newInstitucion);
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
                Añadir Institucion
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
