import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
} from "react";

import { Card } from "reactstrap";

import { v4 as uuidv4 } from "uuid";
import { farmageo_api } from "../../config";
import { useLocation } from "react-router";
import axios from "axios";

import PantallaContext from "./context/PantallaContext";
import FuncionesContext from "./context/FuncionesContext";
import { AlertasProvider } from "./context/AlertaContext";
import {
  ModalProvider,
  GestorModales,
  ModalReducer,
  initialState,
  ModalesContext,
} from "./context/ModalContext";
import {
  requestErrorHandler,
  FuncionesProvider,
} from "./context/FuncionesContext";

import SwitchMaestro from "./components/SwitchMaestro";
import Debugger from "./components/Debugger";
import HeaderConf from "./components/HeaderConf";

const PantallaModal = ({ pantalla: id_a, id }) => {
  return <></>;
};

export default PantallaModal;
