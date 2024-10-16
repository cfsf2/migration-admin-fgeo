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

const headCells = [
  {
    id: "id_nombre_institucion",
    numeric: false,
    disablePadding: true,
    label: "Institución",
  },
  {
    id: "id_nombre_institucion_madre",
    headCell: {
      id: "nombre",
      label: "Nombre",
    },
    numeric: false,
    disablePadding: false,
    label: "Institución Madre",
  },
  {
    id: "inst_habilitada",
    numeric: false,
    disablePadding: false,
    label: "Habilitada",
  },
];

export function Instituciones(props) {
  const {
    institucionesReducer: { instituciones, loading },
  } = props;

  const [listado, setListado] = React.useState([]);
  const [edit, setEdit] = React.useState({});
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
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    className={`instituciones_btn_crear`}
                  >
                    Añadir Institucion
                  </Button>
                </CardHeader>

                <CardBody>
                  <div
                    className="modal fade bd-example-modal-lg"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <AltaInstituciones
                          key="Altainstituciones"
                          {...props}
                          edit={false}
                          setModal={() => {}}
                          limit={limit}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade  edit"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        {" "}
                        <AltaInstituciones
                          edit={true}
                          key="Editinstituciones"
                          institucion={edit}
                          {...props}
                          limit={limit}
                          setModal={() => {}}
                        />
                      </div>
                    </div>
                  </div>

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
                    <Tabla
                      {...props}
                      rows={listado}
                      setEdit={setEdit}
                      headCells={headCells}
                    />
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
