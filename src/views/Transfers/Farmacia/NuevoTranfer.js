import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  CardImg,
  Label,
  CardFooter,
} from "reactstrap";

import { connect } from "react-redux";
import LaboratorioSelect from "./components/LaboratorioSelect";

import {
  GET_LABORATORIOS,
  GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
} from "../../../redux/actions/transfersActions";
import ButtonHome from "../../Dashboard/components/ButtonHome";
import Checkout from "./components/Checkout";

class NuevoTransfer extends Component {
  componentDidMount() {
    this.props.CLEAN_PRODUCTOS();
    this.props.GET_LABORATORIOS();
    this.props.GET_DROGUERIAS();
  }
  render() {
    const { laboratorios } = this.props.tranfersReducer;
    return (
      <div className="animated fadeIn" style={{ margin: 30, padding: 30 }}>
        <Row style={{ marginBottom: 30, paddingRight: 16 }}>
          {" "}
          {/*centre*/}
          <Col>
            <ButtonHome
              //href=""
              titulo="TRANSFERS FARMACIAS"
              subtitulo={<br />}
              align="left"
              tipo="grande"
              icono={require("../../../assets/images/icons/1.png")}
            />
          </Col>
        </Row>
        <Row>
          {laboratorios.map((lab, index) => {
            return !lab.habilitado ? null : (
              <LaboratorioSelect laboratorio={lab} key={index} />
            );
          })}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {
  GET_LABORATORIOS,
  GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevoTransfer);
