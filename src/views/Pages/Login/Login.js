import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import logo from "../../../assets/img/brand/logofarma.png";
import logo from "../../../assets/img/brand/img-panel.png";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  //FormGroup,
  //Label,
} from "reactstrap";
import {
  LOGIN,
  LOADPROFILE,
  RESET_ERROR,
} from "../../../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import Alertmessage from "../../../components/Alertmessage";
import { GET_SESSION } from "../../../redux/actions/authActions";

const Login = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [terminos, setTerminos] = useState("");

  const islogin = useSelector((state) => state.authReducer.user.islogin);
  const username = useSelector((state) => state.authReducer.user.username);
  const errorCode = useSelector((state) => state.authReducer.error.code);
  const errorTitle = useSelector((state) => state.authReducer.error.title);
  const errorMessage = useSelector((state) => state.authReducer.error.message);

  const validateForm = () => {
    return userName.length > 0 && password.length > 0;
  };

  const handleLoginClick = () => {
    if (terminos) {
      dispatch(LOGIN(userName, password));
    } else {
      alert("Debe aceptar los términos y condiciones");
    }
  };

  const handleChangeUsername = (event) => {
    setUserName(event.target.value);
    dispatch(RESET_ERROR());
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    dispatch(RESET_ERROR());
  };

  const handleChangeTerminos = (event) => {
    setTerminos(event.target.value);
  };

  if (islogin) {
    // console.log("username " + username)
    dispatch(LOADPROFILE(username));
    return <Redirect to="/dashboard"></Redirect>;
  } else {
    //esto habrìa que correrlo
    dispatch(GET_SESSION());
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card
                //className="text-white custom-bgcolor py-5 d-md-down-none"
                >
                  <CardBody // className="text-center"
                    className="p-0"
                  >
                    <img src={logo} className="w-100" alt="Logo" />
                    {/*
                    <div>
                      <img src={logo} className="logoLogin" alt="Logo" />
                    </div>
                    */}
                  </CardBody>
                </Card>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Entrar</h1>
                      <p className="text-muted">Acceso al sistema</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          onChange={handleChangeUsername}
                          placeholder="Usuario"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          onChange={handleChangePassword}
                          placeholder="Contraseña"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Alertmessage
                            error={{ errorCode, errorTitle, errorMessage }}
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginLeft: 10, marginBottom: 10 }}>
                        <Col md="12">
                          <input
                            type="checkbox"
                            onChange={handleChangeTerminos}
                            style={{ marginRight: 10 }}
                          />
                          <a
                            href="https://farmageo.com.ar/terminos-legales.html"
                            target="_blank"
                            style={{ fontSize: 10 }}
                            rel="noopener noreferrer"
                          >
                            Acepto los términos y condiciones
                          </a>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <Button
                            type="button"
                            color="primary"
                            className="px-4"
                            disabled={!validateForm()}
                            onClick={handleLoginClick}
                          >
                            Entrar
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Login;
