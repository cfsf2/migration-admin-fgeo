import React, { Component } from "react";
import { Card, Row, Col } from "reactstrap";
import Map from "./Map";
import { UPDATE_FARMACIA } from "../../redux/actions/farmaciaActions";
import { connect } from "react-redux";

class MapaFarmacias extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleVisita = this.handleVisita.bind(this);
  }

  handleVisita(farmacia, estado) {
    this.props.UPDATE_FARMACIA({ ...farmacia, visita_comercial: estado });
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <Map
                center={{ lat: -32.949693, lng: -60.681875 }}
                handleVisita={this.handleVisita}
              />
              ;
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

//export default MapaFarmacias;

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    farmaciasAdminReducer: state.farmaciasAdminReducer,
  };
};

const mapDispatchToProps = {
  UPDATE_FARMACIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapaFarmacias);
