import React, { Component, Fragment } from "react";
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
import EntidadSelect from "./components/EntidadSelect";

import {
  GET_ENTIDADES,
  CLEAN_PRODUCTOS,
} from "../../../redux/actions/packsproductosActions";

import ButtonHome from "../../Dashboard/components/ButtonHome";

class NuevaSolicitudProveeduria extends Component {
  componentDidMount() {
    this.props.CLEAN_PRODUCTOS();
    this.props.GET_ENTIDADES();
    //this.props.GET_DROGUERIAS();
  }
  render() {
    // const { laboratorios } = this.props.tranfersReducer;
    const { entidades } = this.props.packsproductosReducer;
    return (
      <div className="animated fadeIn" style={{ margin: 30, padding: 30 }}>
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <ButtonHome
              //href=""
              titulo="PROVEEDURIA"
              subtitulo={<br />}
              align="left"
              tipo="grande"
              icono={require("../../../assets/images/icons/1.png")}
            />
          </Col>
        </Row>
        <Row>
          {entidades.map((entidad, index) => {
            return !entidad.no_mostrar_en_proveeduria ? (
              <EntidadSelect entidad={entidad} key={index} />
            ) : null;
          })}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
    packsproductosReducer: state.packsproductosReducer,
  };
};
const mapDispatchToProps = {
  GET_ENTIDADES,
  //GET_DROGUERIAS,
  CLEAN_PRODUCTOS,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NuevaSolicitudProveeduria);
