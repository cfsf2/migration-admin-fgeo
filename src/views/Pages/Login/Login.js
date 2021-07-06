import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import logo from "../../../assets/img/brand/logofarma.png";
import logo from "../../../assets/img/brand/img-panel.png";
import bgImage from '../../../assets/images/bg-login.jpg'
import logoWhite from '../../../assets/images/logoWhite.png'
import iLocation from '../../../assets/images/iconLocation.svg'
import iEmail from '../../../assets/images/iconEmail.svg'
import logoWhiteColegio from '../../../assets/images/logoColegio.png'
import { Input, Divider, Form2 } from './style'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
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
  TRYREGISTER
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

  const ValidateEmail = email => {
    console.log(email)
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(email).toLowerCase());
    if (email.match(emailformat)) {
      return true;
    };
    return (false);
  };
  const createHtmlMail = async (formData) => {
    let error = false
    if (formData[0].value.length < 5) {
      error = 'Debe completar el campo "Nombre y Apellido" \n'
    }
    if (formData[1].value.length < 3) {
      error += 'Debe completar el campo "Matricula" \n'
    }
    if (formData[2].value.length < 5) {
      error += 'Debe completar el campo "Dirección" \n'

    }
    if (ValidateEmail(formData[3].value)) {
      error += 'Debe completar el campo "Email" con un email válido '
    }
    let body = await `<head>
                        <style>
                          table {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                          }
                          
                          td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                          }
                          
                          tr:nth-child(even) {
                            background-color: #dddddd;
                          }

                        </style>
                      </head>
                      <body>
                      <h2>Solicitud de registro de la web</h2>
                        <div>
                          <p><b>Nombre y apellido:${formData[0].value} </b></p>
                          <p><b>Matricula:${formData[1].value} </b></p>
                          <p><b>Dirección Farmacia:${formData[2].value} </b></p> 
                          <p><b>Email: ${formData[3].value} </b></p>
                        </div>
                     
                    </body>`;
    if (!error) {
      dispatch(TRYREGISTER(body));
    } else {
      alert(error)
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





  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
  const h1Stule = {
    color: "white",
    fontSize: "50px",
    fontWeight: "bold"
  }
  const whiteStyle = {
    color: "white"
  }
  const boldStyle = {
    fontWeight: "bold"
  }
  const lineStyle = {
    backgroundColor: "white",
    height: 1,
    width: 50
  }
  const formStyle = {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: "10px"


  }



  if (islogin) {
    // console.log("username " + username)
    dispatch(LOADPROFILE(username));
    return <Redirect to="/dashboard"></Redirect>;
  } else {
    //esto habrìa que correrlo
    dispatch(GET_SESSION());
    return (
      <div style={{width:"100%"}} className="container-fluid">
        <div style={backgroundStyle} className="row ">

          <div style={{height: window.innerWidth > 769 ? window.innerHeight : window.innerHeight}} className="col-md-8 col-sm-12 d-flex pl-md-5 pl-sm-3 flex-column overflow-hidden">
            <img src={logoWhite} style={{ width: "150px", marginTop: "50px" }} />
            <div style={{ margin: window.innerWidth > 769 ? "auto 0" : "70px 0" }}>
              <h1 style={h1Stule} className="bold white">Mi Farmacia digital</h1>
              <p style={{ fontSize: "20px", ...whiteStyle }}>Visibilidad digital de todos los servicios. Tienda online propia y a medida.<br /> Solicitá transfers, sector de proveeduría y colaboración con acciones RSE. </p>
              <h3 style={{ ...boldStyle, ...whiteStyle }} className="mt-5 bold">Todo en un solo lugar.</h3>
              <img style={{ width: "250px", marginTop: "50px" }} src={logoWhiteColegio} />
            </div>
            <div className="d-flex mt-auto flex-column ">
              <div style={lineStyle}></div>
              <div style={whiteStyle} className="my-2">
                <img src={iEmail} style={{ widht: "25px", height: "22px" }} /> <a style={{ fontSize: "18px", marginRight: "10px", ...whiteStyle }} href="mailto:coordinador@farmageo.com.ar">coordinador@farmageo.com.ar</a>
                {window.innerWidth>769? null : <br/>}
                <img src={iLocation} style={{ widht: "25px", height: "22px" }} /> <a style={{ fontSize: "18px", ...whiteStyle }} target="_blank" href="https://www.google.com/maps/place/Buenos+Aires+1262,+S2000+Rosario,+Santa+Fe/data=!4m2!3m1!1s0x95b7ab04a721ba5d:0x1080c44b44f427bf?sa=X&ved=2ahUKEwi36ryKmczxAhXnqJUCHdvjCToQ8gEwAHoECAYQAQ">Buenos aires 1262, Rosario</a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 d-flex flex-column overflow-hidden pr-md-5 pr-sm-3" style={{ ...whiteStyle }}>
            <form className="d-flex flex-column mt-auto mb-2 text-center" style={formStyle}>

              <h4 className="mt-2">Acceso al sistema</h4>
              <Input
                type="text"
                inputColor="white"
                onChange={handleChangeUsername}
                placeholder="Usuario o correo electrónico"
                autoComplete="username"
              />
              <Input
                type="password"
                inputColor="white"
                onChange={handleChangePassword}
                placeholder="Contraseña"
                autoComplete="current-password"
              />
              <div>
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
              </div>
              <div>
                <Button
                  type="button"
                  color="primary"
                  className="px-4 my-2"
                  disabled={!validateForm()}
                  onClick={handleLoginClick}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </form>
            <Divider className="my-3" />
            <Form2 onSubmit={(e) => { e.preventDefault(); createHtmlMail(e.target) }} className="d-flex flex-column mb-md-auto mb-sm-2 my-2 text-center" style={formStyle}>
              <h4 className="mt-2">¿Querés ser parte?</h4>
              <p style={{ fontSize: "11px" }}>Solicitar alta de farmacia</p>
              <Input
                type="text"
                inputColor="white"
                onChange={handleChangeUsername}
                placeholder="Nombre y apellido "
                autoComplete="username"
              />
              <Input
                type="text"
                inputColor="white"
                onChange={handleChangeUsername}
                placeholder="Matricula"
                autoComplete="username"
              />
              <Input
                type="text"
                inputColor="white"
                onChange={handleChangeUsername}
                placeholder="Dirección de farmacia"
                autoComplete="username"
              />
              <Input
                type="text"
                inputColor="white"
                onChange={handleChangeUsername}
                placeholder="Correo electrónico"
                autoComplete="username"
              />
              <div>
                <Button
                  type="submit"
                  color="primary"
                  className="px-4 my-2"


                >
                  Solicitar Registro
                </Button>
              </div>
            </Form2>
          </div>
          <div>

          </div>
          {/* <Container>
          asd
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
                            v
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container> */}
        </div>
      </div>
    );
  }
};

export default Login;
