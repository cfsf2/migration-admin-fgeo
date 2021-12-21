import React, { useState, PropTypes, useEffect } from "react";
import { connect } from "react-redux";
import { GET_REPORTE_OOSS } from "../../redux/actions/reportOSAtions";
import pdf from "../../assets/ooss.pdf";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { farmageo_api } from "../../config";

const ReporteOOSS = (props) => {
  useEffect(() => {
    props.GET_REPORTE_OOSS();
  }, []);

  return (
    <div className="animated fadeIn pr-2">
      <Row>
        <Col xs="12" sm="9">
          <Card>
            <CardHeader>
              <strong>Reporte de Obras Sociales </strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12">
                  <Row>
                    <Col>
                      <embed
                        src={"https://farmageo2.s3.amazonaws.com/ooss/ooss.pdf"}
                        zoo="true"
                        width="100%"
                        height="700px"
                        type="application/pdf"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="3">
          <Card>
            <CardHeader>
              <strong>OOSS Suspendidas</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12">
                  <Row>
                    <Col className="no-select">
                      {props.reportOSReducer.oossInactivas
                        ? props.reportOSReducer.oossInactivas.map((ooss) => (
                            <h5 key={ooss}>{ooss}</h5>
                          ))
                        : null}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row>
                <Col xs="12">
                  <Row>
                    {props.reportOSReducer.alert ? (
                      <Col
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontSize: "24px",
                          minHeight: "400px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <strong>{props.reportOSReducer.alert}</strong>
                      </Col>
                    ) : null}
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reportOSReducer: state.reportOSReducer,
  };
};

const mapDispatchToProps = {
  GET_REPORTE_OOSS,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReporteOOSS);
