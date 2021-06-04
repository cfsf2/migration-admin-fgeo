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
import {
  GET_SOLICITUDES_PROVEEDURIA_FARMACIA,
  GET_ENTIDADES,
} from "../../../redux/actions/packsproductosActions";

class MisSolicitudesProveeduria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitudproveeduria: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { farmaciaid } = this.props.authReducer.userprofile;
    this.props.GET_SOLICITUDES_PROVEEDURIA_FARMACIA(farmaciaid);
  }

  async handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      solicitudproveeduria: {
        ...this.state.solicitudproveeduria,
        [name]: value,
      },
    });
  }

  render() {
    const { solicitudesproveeduria } = this.props.packsproductosReducer;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <b>Listado de pedidos a proveeduria</b>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" md="4" style={{ marginBottom: 10 }}>
                        <Input
                          type="text"
                          placeholder="buscar pedido..."
                          name="filtro"
                        />
                      </Col>
                    </Row>
                    <hr />
                    <div className="table-responsive table-striped table-fix">
                      <table className="table ">
                        <thead className="bg-secondary">
                          <tr>
                            <th>Código</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Farmacia</th>
                            <th>Laboratorio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {solicitudesproveeduria.map((obj, index) => {
                            return (
                              <tr key={index}>
                                <td>{obj.codigo_solicitud}</td>
                                <td>{obj.estado}</td>
                                <td>{obj.fecha.substring(0, 10)}</td>
                                <td>{obj.farmacia_id}</td>
                                <td>{obj.entidad_id}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packsproductosReducer: state.packsproductosReducer,
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = {
  GET_SOLICITUDES_PROVEEDURIA_FARMACIA,
  GET_ENTIDADES,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MisSolicitudesProveeduria);
