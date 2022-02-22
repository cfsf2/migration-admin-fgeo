import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Container,
  Spinner,
} from "reactstrap";

import NoInstitucionesFound from "../../../components/NoInstitucionesFound";

export const Novedades = (props) => {
  const { loading, novedades } = props.publicidadesReducer;
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <b>Novedades de interés</b>
          </Col>
          {/* <Col>
            <select
              value={state.filtro}
              onChange={handleFiltro}
              name="filtro"
            >
              <option value="recientes">Más recientes primero</option>
              <option value="hoy">Hoy</option>
              <option value="semana">Últimos 7 días</option>
              <option value="mes">Último mes</option>
            </select>
          </Col> */}
        </Row>
      </CardHeader>
      <CardBody>
        <hr />
        {props.authReducer.userprofile.instituciones?.length === 0 ? (
          <Row>
            <Col>
              <NoInstitucionesFound />
            </Col>
          </Row>
        ) : null}
        {loading ? <Spinner color="info" /> : null}
        {novedades.length > 0 && loading === false ? (
          novedades.map((p, index) => {
            return (
              <>
                <Row key={p._id}>
                  <Col>
                    <Row>
                      <Col className="col-1">
                        <div
                          style={{
                            backgroundColor:
                              p.color === "verde"
                                ? "#00D579"
                                : p.color === "rojo"
                                ? "red"
                                : "yellow",
                            color: "white",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            borderWidth: 10,
                            borderColor: "black",
                          }}
                        ></div>
                      </Col>
                      <Col>
                        <p
                          style={{
                            textJustify: "initial",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                          className="d-inline"
                        >
                          {p.titulo}
                        </p>
                      </Col>
                      <Col className="col-3">
                        {p.fecha_alta
                          ? p.fecha_alta.substring(0, 10)
                          : p.fechaalta.substring(0, 10)}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-1"></Col>
                      <Col className="col-11">
                        <div className="dashboard_info_descripcion">
                          {p.descripcion}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr />
              </>
            );
          })
        ) : loading ? null : (
          <div>Sin novedades</div>
        )}
      </CardBody>
    </Card>
  );
};

export default Novedades;
