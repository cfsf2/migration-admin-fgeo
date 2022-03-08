import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
  CardFooter,
  Spinner,
} from "reactstrap";
import AsignarInstituciones from "../FarmaciasAdmin/components/AsignarInstituciones";

import {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
  DELETE_PUBLICIDAD,
  GET_NOVEDADES_RELACIONES,
} from "../../redux/actions/publicidadesActions";

import { ALERT } from "../../redux/actions/alertActions";

import {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
} from "../../redux/actions/institucionesAction";

import "./novedades.scss";
import { dateFormaterYYYYMMDD } from "../../helpers/parser";

const initNovedad = {
  titulo: "",
  color: "",
  fechainicio: "",
  fechafin: "",
  tipo: "novedadesadmin",
  habilitado: true,
  descripcion: "",
  instituciones: [],
};

export function ABMNovedades(props) {
  const [novedad, setNovedad] = React.useState(initNovedad);
  const [errors, setErrors] = React.useState([]);
  const [id, setId] = React.useState();

  const handleInputChange = async (event) => {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "fechainicio" && novedad.fechafin !== "") {
      if (novedad.fechainicio >= novedad.fechafin) {
        setNovedad(() => {
          return {
            ...novedad,
            fechafin: "",
          };
        });
        return;
      }
    }

    setNovedad({
      ...novedad,
      [name]: value,
    });
    handleErrorChange(name, value);
  };

  const handleConfirmar = async () => {
    handleValidation().then(() => {
      if (id) {
        props.UPDATE_PUBLICIDAD(novedad, novedad.instituciones);
        return;
      }
      props.ADD_PUBLICIDAD(
        props.authReducer.user.username,
        novedad,
        novedad.instituciones
      );
    });
  };

  const handleErrorChange = (name, value) => {
    if (value.trim() !== "") {
      const newErr = errors.filter((err) => {
        return err !== name;
      });

      setErrors(newErr);

      return;
    }
    const newErr = errors.concat(name);
    setErrors(newErr);
  };

  const handleValidation = () => {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(initNovedad);

      let errors = keys.filter((key) => {
        if (typeof novedad[key] === "string") {
          if (novedad[key] && novedad[key].trim() !== "") {
            return;
          }
        }
        if (novedad[key] && novedad[key] !== "") {
          return;
        }
        return key;
      });
      if (novedad.instituciones.length === 0) {
        ALERT(
          "Instituciones",
          "Debe asignar instituciones a la publicacion",
          "warning",
          "Aceptar"
        );
        errors.push("Instituciones");
      }
      setErrors(() => errors);
      if (errors.length > 0) {
        reject();
      }
      resolve();
    });
  };

  React.useEffect(() => {
    const search = props.location.search;
    const id = new URLSearchParams(search).get("edit");
    setId(() => id);
    let news = props.publicidadesReducer.editable;

    if (news) {
      setNovedad(news);
    }

    if (!id) {
      setNovedad(initNovedad);
    }
  }, []);

  return (
    <Row>
      <Col xs="12" sm="12">
        <Card>
          <CardHeader>
            <Row>
              <Col>{id ? id : "Nuevo"}</Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="col-6">
                <FormGroup>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    type="text"
                    id="titulo"
                    name="titulo"
                    onChange={handleInputChange}
                    value={novedad.titulo}
                    invalid={errors.includes("titulo")}
                  />
                </FormGroup>
              </Col>
              <Col className="col-3">
                <FormGroup>
                  <Label htmlFor="habilitado">Mostrar en Novedades</Label>
                  <Input
                    type="select"
                    id="habilitado"
                    name="habilitado"
                    onChange={handleInputChange}
                    value={novedad.habilitado}
                    invalid={errors.includes("habilitado")}
                  >
                    <option value={true}>SI</option>
                    <option value={false}>NO</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col className="col-3">
                <div
                  className={
                    errors.includes("descripcion") ? "novedades_error" : ""
                  }
                >
                  <Label htmlFor="color" className="ml-3">
                    Color
                  </Label>
                  <select
                    id="color"
                    name="color"
                    style={{ marginLeft: 20 }}
                    onChange={handleInputChange}
                    value={novedad.color}
                    defaultValue="verde"
                    default="verde"
                  >
                    <option value="" selected="selected" disabled>
                      --Color--
                    </option>
                    <option value="verde">Verde</option>
                    <option value="rojo">Rojo</option>
                    <option value="amarillo">Amarillo</option>
                  </select>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          novedad.color === "verde"
                            ? "#00D579"
                            : novedad.color === "rojo"
                            ? "red"
                            : novedad.color === "amarillo"
                            ? "yellow"
                            : "lightblue",
                        color: "white",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        borderWidth: 10,
                        borderColor: "black",
                      }}
                    ></div>
                  </div>
                </div>
              </Col>
            </Row>

            <hr />
            <FormGroup>
              <Row>
                <Col>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <div
                    className={
                      errors.includes("descripcion")
                        ? "novedades_error"
                        : "novedades_textarea"
                    }
                  >
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      onChange={handleInputChange}
                      style={{
                        height: 200,
                        width: "100%",
                        resize: "none",
                        border: "none",
                      }}
                      value={novedad.descripcion}
                    />
                  </div>
                </Col>
              </Row>
            </FormGroup>
            <hr />
            <FormGroup>
              <Row>
                <Col className="col-3">
                  <Label>Fecha de Inicio de Vigencia </Label>

                  <Input
                    name="fechainicio"
                    type="date"
                    onChange={handleInputChange}
                    value={dateFormaterYYYYMMDD(novedad.fechainicio)}
                    invalid={errors.includes("fechainicio")}
                  />
                </Col>
                <Col className="col-3">
                  <Label>Fecha de Fin de Vigencia </Label>
                  <Input
                    name="fechafin"
                    type="date"
                    onChange={handleInputChange}
                    value={
                      novedad.fechafin > novedad.fechainicio
                        ? dateFormaterYYYYMMDD(novedad.fechafin)
                        : ""
                    }
                    min={dateFormaterYYYYMMDD(novedad.fechainicio)}
                    invalid={errors.includes("fechafin")}
                  />
                </Col>
              </Row>
              <Row className="p-3">
                <AsignarInstituciones
                  obj={novedad}
                  setObj={setNovedad}
                  invalid={errors.includes("Instituciones")}
                  loading={props.institucionesReducer.loading}
                  {...props}
                />
              </Row>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Row>
              <Col></Col>
              <Col>
                {props.publicidadesReducer.submitting ? (
                  <Button className="btn btn-info">
                    <Spinner size="sm" /> {`  `}Enviando ...
                  </Button>
                ) : id ? (
                  <Button className="btn btn-success" onClick={handleConfirmar}>
                    Guardar Cambios
                  </Button>
                ) : (
                  <Button className="btn btn-success" onClick={handleConfirmar}>
                    Confirmar
                  </Button>
                )}
              </Col>
              <Col>
                <Link to="novedades">
                  <Button className="btn btn-danger" data-dismiss="modal">
                    Cancelar
                  </Button>
                </Link>
              </Col>
              <Col></Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    publicidadesReducer: state.publicidadesReducer,
    institucionesReducer: state.institucionesReducer,
  };
};
const mapDispatchToProps = {
  ADD_PUBLICIDAD,
  GET_PUBLICIDADES,
  UPDATE_PUBLICIDAD,
  DELETE_PUBLICIDAD,
  GET_NOVEDADES_RELACIONES,
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
  ALERT,
};

export default connect(mapStateToProps, mapDispatchToProps)(ABMNovedades);
