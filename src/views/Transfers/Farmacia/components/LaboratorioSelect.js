import React, { Component } from "react";
import { Col } from "reactstrap";

import { connect } from "react-redux";
import { GET_PRODUCTOS_TRANSFERS_BY_LAB } from "../../../../redux/actions/transfersActions";
import { image_path_server } from "../../../../config";
import "../components/transfer.scss";

class LaboratorioSelect extends Component {
  render() {
    return (
      <Col md="3" sm="4" lg="3" xl="2" style={{ marginBottom: 30 }}>
        <a
          href={
            this.props.laboratorio.transfer_farmageo === "s"
              ? process.env.PUBLIC_URL +
                //  `/#/FinalizarTransfer?l=${this.props.laboratorio._id}`
                `/#/FinalizarTransfer?l=${this.props.laboratorio.id}`
              : this.props.laboratorio.url
          }
          target={
            this.props.laboratorio.transfer_farmageo === "n" ? "_blank" : null
          }
          // className="btn btn-light"
          onClick={() => {
            this.props.GET_PRODUCTOS_TRANSFERS_BY_LAB(this.props.laboratorio);
          }}
        >
          <div
            className="transfer_laboratorioSelect_hover"
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
            }}
          >
            <img
              src={
                this.props.laboratorio
                  ? this.props.laboratorio.imagen !== undefined
                    ? image_path_server + this.props.laboratorio.imagen
                    : null
                  : null
              }
              style={{
                backgroundColor: "#ffffff",
                width: "100%",
              }}
              alt={this.props.laboratorio.nombre}
            />
          </div>
        </a>
      </Col>
    );
  }
}

const mapDispatchToProps = {
  GET_PRODUCTOS_TRANSFERS_BY_LAB,
};

export default connect(null, mapDispatchToProps)(LaboratorioSelect);
