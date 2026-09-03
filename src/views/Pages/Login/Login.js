import React, { useState } from "react";
import { useDispatch } from "react-redux";

import bgImage from "../../../assets/images/bg-login.jpg";
import logoWhite from "../../../assets/img/brand/nuevo-logo-negativo.png";

import logoWhiteColegio from "../../../assets/images/logoColegioAniversario.png";
import { Input, Divider, Form2 } from "./style";
import { Button } from "reactstrap";
import BotonWhatsapp from "../../../containers/DefaultLayout/BotonWhatsapp";
import {
  LOGIN,
  RESET_ERROR,
  TRYREGISTER,
} from "../../../redux/actions/authActions";
import "./login.scss";
import { Link } from "react-router-dom";

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
  margin: "10px 0"
};
const formStyle = {
  backgroundColor: "rgba(0,0,0,0.6)",
  borderRadius: "10px",
};

const anniversaryLogoWrapperStyle = {
  display: "inline-block",
  padding: "0 20px 12px 20px",
  marginTop: "5px",
  backgroundColor: "rgba(0,0,0,0.55)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
};

const anniversaryLogoStyle = {
  width: "250px",
  display: "block",
};

const contactItems = [
  {
    icon: "fa-envelope-o",
    href: "mailto:soportefarmageo@cfsf2.org.ar",
    label: "soportefarmageo@cfsf2.org.ar",
    external: false,
  },
  {
    icon: "fa-map-marker",
    href:
      "https://www.google.com/maps/place/Buenos+Aires+1262,+S2000+Rosario,+Santa+Fe/data=!4m2!3m1!1s0x95b7ab04a721ba5d:0x1080c44b44f427bf?sa=X&ved=2ahUKEwi36ryKmczxAhXnqJUCHdvjCToQ8gEwAHoECAYQAQ",
    label: "Buenos aires 1262, Rosario",
    external: true,
  },
  {
    icon: "fa-whatsapp",
    href: "https://wa.me/543412104056",
    label: "341 2104056",
    external: true,
  },
];

const ContactInfo = ({ className = "" }) => (
  <div className={`login-contact ${className}`} style={whiteStyle}>
    {contactItems.map((item) => (
      <a
        key={item.label}
        href={item.href}
        className="login-contact__item"
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
      >
        <i
          className={`fa ${item.icon} fa-2x flex-iconos`}
          aria-hidden="true"
        ></i>
        <span className="flex-iconos_text">{item.label}</span>
      </a>
    ))}
  </div>
);

const Login = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [terminos, setTerminos] = useState(true);

  const validateForm = () => {
    return userName.length > 0 && password.length > 0;
  };

  const handleLoginClick = () => {
    if (terminos) {
      const hash = window.location.hash;
      const queryString = hash.split("?")[1]; // "from=https%3A%2F%2Fmidominio.com%2Fperfil"

      let from = null;
      if (queryString) {
        const params = new URLSearchParams(queryString);
        from = params.get("from");
      }
      dispatch(LOGIN(userName, password, from));
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
    <div id="LOGIN_PAGE" className="login-page">
      <div style={backgroundStyle} className="d-flex flex-column-reverse flex-md-row">
        {/* Panel de marca — visible solo desde md (>=768px). Nada de JS: */}
        {/* la muestra/oculta el CSS con d-none/d-md-flex, siempre reactivo. */}
        <div className="col-md-7 d-md-flex flex-column login-branding">
          <img
            src={logoWhite}
            alt="Farmageo"
            className="login-branding__logo"
          />
          <div className="login-branding__body">
            <h1 style={h1Stule} className="bold white">
              Mi Farmacia digital
            </h1>
            <p className="login-branding__desc" style={whiteStyle}>
              Visibilidad digital de todos los servicios.
              <br /> Solicitá transfers con las condiciones ofrecidas por los
              laboratorios, tablón de mensajes y colaboración con acciones
              RSE.{" "}
            </p>
            <h3
              style={{ ...boldStyle, ...whiteStyle }}
              className="mt-5 bold login-branding__subtitle"
            >
              Todo en un solo lugar.
            </h3>
            <div style={anniversaryLogoWrapperStyle}>
              <img
                style={anniversaryLogoStyle}
                src={logoWhiteColegio}
                alt="Colegio de Farmacéuticos"
              />
            </div>
          </div>
          <div className="login-branding__footer">
            <div style={lineStyle}></div>
            <ContactInfo />
          </div>
        </div>

        {/* Formulario de login */}
        <div className="col-12 col-md-5 d-flex flex-column mx-auto px-3 px-md-0 pr-md-5 login_container">
          <form
            className="d-flex flex-column mb-2 text-center login_container_form"
            style={formStyle}
          >
            <h3 className="mt-2">Acceso al sistema</h3>
            <Input
              type="text"
              inputColor="white"
              onChange={handleChangeUsername}
              placeholder="Usuario"
              autoComplete="username"
            />
            <Input
              type="password"
              inputColor="white"
              onChange={handleChangePassword}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
            <div className="d-flex align-items-center justify-content-center flex-wrap my-2">
              <input
                type="checkbox"
                onChange={handleChangeTerminos}
                style={{ marginRight: 10 }}
                checked={terminos}
              />
              <Link
                to="/Terminos-y-Condiciones"
                target="_blank"
                style={{ fontSize: 12 }}
                rel="noopener noreferrer"
              >
                Acepto los términos y condiciones
              </Link>
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
          {/* <Divider className="my-3 d-none" />
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
          </Form2> */}

        </div>
      </div>
      <BotonWhatsapp
        nroContacto="3412104056"
        textTitle="Consúltanos por Whatsapp"
      />
    </div>
  );
};

export default Login;