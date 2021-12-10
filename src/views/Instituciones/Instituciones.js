import React from "react";
import "./instituciones.scss";

import {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
  CREAR_INSTITUCION,
  ACTUALIZAR_INSTITUCION,
} from "../../redux/actions/institucionesAction";
import { connect } from "react-redux";
import { AltaInstituciones } from "./AltaInstituciones";
import Filtros from "./Filtros";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Table,
} from "reactstrap";

export function Instituciones(props) {
  const {
    institucionesReducer: { instituciones },
  } = props;
  const [listado, setListado] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  const [editModal, setEditModal] = React.useState(false);
  const [edit, setEdit] = React.useState();

  React.useEffect(() => {
    if (instituciones && instituciones.length === 0) {
      props.GET_INSTITUCIONES(10);
    }
    setListado(() => instituciones);
  }, [instituciones]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Row>
            <Col>
              <Card className="instituciones">
                <CardHeader className="instituciones_cardheader">
                  <b>Listado de Instituciones</b>
                  <Button
                    disabled={!instituciones}
                    className={`instituciones_btn_crear ${
                      modal ? "cancelar" : null
                    }`}
                    onClick={() => setModal((modal) => !modal)}
                  >
                    {modal ? "Cancelar" : "Añadir Institucion"}
                  </Button>
                </CardHeader>

                <CardBody>
                  {modal ? (
                    <div
                      id="modal"
                      className="modal"
                      onClick={(e) => {
                        if (e.target.id === "modal") {
                          setModal((state) => !state);
                        }
                      }}
                    >
                      <AltaInstituciones {...props} setModal={setModal} />
                    </div>
                  ) : null}
                  {editModal ? (
                    <div
                      id="modal"
                      className="modal"
                      onClick={(e) => {
                        if (e.target.id === "modal") {
                          setEditModal((state) => !state);
                        }
                      }}
                    >
                      <AltaInstituciones
                        edit
                        institucion={edit}
                        {...props}
                        setModal={setEditModal}
                      />
                    </div>
                  ) : null}

                  <Row>
                    <Col xs="12">
                      <Filtros
                        listado={listado}
                        setListado={setListado}
                        {...props}
                      />
                    </Col>
                  </Row>
                  <Table>
                    <div className="table-responsive table-striped table-fix">
                      <table className="instituciones_tabla table">
                        <thead className="instituciones_tabla_head">
                          <tr>
                            <th id="numero">#</th>
                            <th>Nombre</th>
                            <th>Institucion Madre</th>
                            <th>Habilitada</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {listado
                            ? listado.map((inst, idx) => {
                                return (
                                  <tr key={inst._id}>
                                    <td>{idx + 1}</td>
                                    <td>{inst.nombre}</td>
                                    <td>{inst.nombre_institucion_madre}</td>
                                    <td>{inst.habilitada ? "SI" : "NO"}</td>
                                    <td>
                                      <button
                                        onClick={() => {
                                          setEditModal((state) => !state);
                                          setEdit(() => inst);
                                        }}
                                      >
                                        Editar
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            : "no hay instituciones"}
                        </tbody>
                      </table>
                    </div>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    institucionesReducer: state.institucionesReducer,
  };
};
const mapDispatchToProps = {
  GET_INSTITUCIONES,
  SEARCH_INSTITUCIONES,
  CREAR_INSTITUCION,
  ACTUALIZAR_INSTITUCION,
};

export default connect(mapStateToProps, mapDispatchToProps)(Instituciones);
