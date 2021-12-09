import React from "react";

import "./instituciones.scss";
import { Autocomplete, TextField } from "@mui/material";

import {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
} from "../../redux/actions/institucionesAction";
import { connect } from "react-redux";

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
  const [instituciones, setInstituciones] = React.useState(props.instituciones);

  const [madre, setMadre] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [habilitada, setHabilitada] = React.useState(true);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search.length > 2) {
      props.SEARCH_INSTITUCIONES(10, search);
    }
  }, [search]);

  return (
    <div className="animated fadeIn altainstituciones">
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
              <Button className="altainstituciones_submit">
                Añadir Institucion
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    institucionesReducer: state.institucionesReducer,
    userReducer: state.userReducer,
  };
};
const mapDispatchToProps = {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
};

export default connect(mapStateToProps, mapDispatchToProps)(AltaInstituciones);
