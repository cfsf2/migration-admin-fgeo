import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">La Pagina que busca no existe</h4>
                <p className="text-muted float-left">
                  Si cree que esto es un error, contacte al administrador
                </p>
              </div>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="append">
                  <Button color="info">
                    <Link to="/" style={{ color: "white", fontSize: "2rem" }}>
                      Volver al Inicio
                    </Link>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
