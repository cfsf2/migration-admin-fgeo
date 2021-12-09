import React from "react";
import "./instituciones.scss";

import { GET_INSTITUCIONES } from "../../redux/actions/institucionesAction";
import { connect } from "react-redux";
import { AltaInstituciones } from "./AltaInstituciones";

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

  React.useEffect(() => {
    if (!instituciones) {
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
              <Card>
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
                  {instituciones ? (
                    <div style={{ display: modal ? "block" : "none" }}>
                      <AltaInstituciones instituciones={instituciones} />
                    </div>
                  ) : null}
                  <Row>
                    <Col xs="12" md="4">
                      <Input
                        type="text"
                        placeholder="buscar institucion..."
                        name="filtro"
                        className="instituciones_buscar"
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
                                    <td>
                                      {
                                        listado.filter(
                                          (insti) =>
                                            insti._id ===
                                            inst.id_institucion_madre
                                        )[0]?.nombre
                                      }
                                    </td>
                                    <td>{inst.habilitada ? "SI" : "NO"}</td>
                                    <td>
                                      <button>Editar</button>
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
    userReducer: state.userReducer,
  };
};
const mapDispatchToProps = {
  GET_INSTITUCIONES,
};

export default connect(mapStateToProps, mapDispatchToProps)(Instituciones);
