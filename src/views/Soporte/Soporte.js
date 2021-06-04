import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

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
                  <Col xs="12">
                    <Row>
                        <Col>
                            <a href="mailto:soporte@farmageo.com.ar">soporte@farmageo.com.ar</a>
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

export default Soporte
