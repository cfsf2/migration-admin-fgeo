import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

class Soporte extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Soporte</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <a
                      href="https://api.whatsapp.com/send?phone=543412104056"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contactanos por Whatapp
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Row>
                      <Col>
                        <Link
                          to={{
                            pathname: "/pdf",
                            search:
                              "?pdf=soporte/Manual+de+uso+de+FarmaGeo..pdf",
                          }}
                        >
                          Manual de Usuario
                        </Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <a
                          href="https://www.farmageo.com.ar/novedades/terminos-y-condiciones/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Términos y condiciones
                        </a>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <a href="mailto:transfers@cfsf2.org.ar">
                          soporte@farmageo.com.ar
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Soporte;
