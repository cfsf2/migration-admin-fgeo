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
import Tabla from "./Tabla";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Table,
  Spinner,
} from "reactstrap";

export function Instituciones(props) {
  const {
    institucionesReducer: { instituciones, loading },
  } = props;

  const [listado, setListado] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  const [editModal, setEditModal] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [limit, setLimit] = React.useState(100);

  React.useEffect(() => {
    if (instituciones && instituciones.length === 0) {
      props.GET_INSTITUCIONES(limit);
    }
    setListado(() => instituciones);
  }, [instituciones]);

  if (loading) {
    return <Spinner />;
  }

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
                      modal || editModal ? "cancelar" : null
                    }`}
                    onClick={() => setModal((modal) => !modal)}
                  >
                    Añadir Institucion
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
                      <AltaInstituciones
                        {...props}
                        setModal={setModal}
                        limit={limit}
                      />
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
                        limit={limit}
                      />
                    </div>
                  ) : null}

                  <Row>
                    <Col xs="12">
                      <Filtros
                        listado={listado}
                        setListado={setListado}
                        {...props}
                        limit={limit}
                      />
                    </Col>
                  </Row>
                  <Table>
                    <Tabla {...props} rows={listado} />
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
