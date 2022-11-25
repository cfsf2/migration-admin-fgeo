import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import logo from "../../../assets/img/brand/logofarma.png";
import logo from "../../../assets/img/brand/img-panel.png";
import bgImage from "../../../assets/images/bg-login.jpg";
import logoWhite from "../../../assets/img/brand/nuevo-logo-negativo.png";
import iLocation from "../../../assets/images/iconLocation.svg";
import iEmail from "../../../assets/images/iconEmail.svg";
import logoWhiteColegio from "../../../assets/images/logoColegio.png";
import { Input, Divider, Form2 } from "./style";
import { Button } from "reactstrap";
import {
  LOGIN,
  LOADPROFILE,
  RESET_ERROR,
  TRYREGISTER,
  CHECK_TOKEN,
  LOGOUT,
} from "../../../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import { GET_SESSION } from "../../../redux/actions/authActions";
import "./login.scss";

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const h1Stule = {
  color: "white",
  fontSize: "50px",
  fontWeight: "bold",
};
const whiteStyle = {
  color: "white",
};
const boldStyle = {
  fontWeight: "bold",
};
const lineStyle = {
  backgroundColor: "white",
  height: 1,
  width: 50,
};
const formStyle = {
  backgroundColor: "rgba(0,0,0,0.6)",
  borderRadius: "10px",
};

const Login = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [terminos, setTerminos] = useState(true);

  const islogin = useSelector((state) => state.authReducer.user.islogin);
  const username = useSelector((state) => state.authReducer.user.username);

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

  function pruebaemail(valor) {
    const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!re.exec(valor) || valor === "") {
      return true;
    } else return false;
  }

  const createHtmlMail = async (formData) => {
    let error = false;
    if (formData[0].value.length < 5) {
      error = 'Debe completar el campo "Nombre y Apellido" \n';
    }
    if (formData[1].value.length < 3) {
      error += 'Debe completar el campo "Matricula" \n';
    }
    if (formData[2].value.length < 5) {
      error += 'Debe completar el campo "Dirección" \n';
    }
    const emailTrust = pruebaemail(formData[3].value);
    if (emailTrust) {
      error += 'Debe completar el campo "Email" con un email válido ';
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
      alert(error);
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
    setTerminos(event.target.checked);
  };

    return (
      <div
        style={{ width: "100%", height: "100%" }}
        className="container-fluid"
      >
        <div style={backgroundStyle} className="row ">
          {window.innerWidth > 769 ? (
            <div
              style={{
                height:
                  window.innerWidth > 769
                    ? window.innerHeight
                    : window.innerHeight,
              }}
              className="col-md-8 col-sm-0 d-flex pl-md-5 pl-sm-3 flex-column overflow-hidden"
            >
              <img
                src={logoWhite}
                style={{ width: "250px", marginTop: "50px" }}
              />
              <div
                style={{
                  margin: window.innerWidth > 769 ? "auto 0" : "70px 0",
                }}
              >
                <h1 style={h1Stule} className="bold white">
                  Mi Farmacia digital
                </h1>
                <p style={{ fontSize: "20px", ...whiteStyle }}>
                  Visibilidad digital de todos los servicios. Tienda online
                  propia y a medida.
                  <br /> Solicitá transfers, sector de proveeduría y
                  colaboración con acciones RSE.{" "}
                </p>
                <h3
                  style={{ ...boldStyle, ...whiteStyle }}
                  className="mt-5 bold"
                >
                  Todo en un solo lugar.
                </h3>
                <img
                  style={{ width: "250px", marginTop: "50px" }}
                  src={logoWhiteColegio}
                />
              </div>
              <div className="d-flex mt-auto flex-column ">
                <div style={lineStyle}></div>
                <div style={whiteStyle} className="my-2">
                  <img src={iEmail} style={{ widht: "25px", height: "22px" }} />{" "}
                  <a
                    style={{
                      fontSize: "18px",
                      marginRight: "10px",
                      ...whiteStyle,
                    }}
                    href="mailto:coordinador@farmageo.com.ar"
                  >
                    coordinador@farmageo.com.ar
                  </a>
                  {window.innerWidth > 769 ? null : <br />}
                  <img
                    src={iLocation}
                    style={{ widht: "25px", height: "22px" }}
                  />{" "}
                  <a
                    style={{ fontSize: "18px", ...whiteStyle }}
                    target="_blank"
                    href="https://www.google.com/maps/place/Buenos+Aires+1262,+S2000+Rosario,+Santa+Fe/data=!4m2!3m1!1s0x95b7ab04a721ba5d:0x1080c44b44f427bf?sa=X&ved=2ahUKEwi36ryKmczxAhXnqJUCHdvjCToQ8gEwAHoECAYQAQ"
                  >
                    Buenos aires 1262, Rosario
                  </a>
                </div>
              </div>
            </div>
        ) : (
          <div className="col-sm-12 mb-2 d-flex justify-content-center">
            <img
              src={logoWhite}
              style={{ width: "100px", marginTop: "50px" }}
            />
          </div>
        )}
        <div
          className="col-md-4 col-sm-12 d-flex flex-column   overflow-hidden pr-md-5 pr-sm-3 login_container"
          style={{
            color: "white",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <form
            className="d-flex flex-column  mb-2 text-center login_container_form"
            style={formStyle}
          >
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
                checked={terminos}
              />
              <a
                href="https://www.farmageo.com.ar/novedades/terminos-y-condiciones/"
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
          <Divider className="my-3 d-none" />
          <Form2
            onSubmit={(e) => {
              e.preventDefault();
              createHtmlMail(e.target);
            }}
            className="d-none flex-column mb-md-auto mb-sm-2 my-2 text-center"
            style={formStyle}
          >
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
              <Button type="submit" color="primary" className="px-4 my-2">
                Solicitar Registro
              </Button>
            </div>
          </Form2>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
