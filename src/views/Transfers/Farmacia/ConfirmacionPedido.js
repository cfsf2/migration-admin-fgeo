import React, { Component, Fragment } from "react";
import "./components/transfer.scss";
import { connect } from "react-redux";

class ConfirmacionPedido extends Component {
  render() {
    return (
      <div
        className="animated fadeIn transfer_confirmacion"
        style={{ margin: 30, padding: 30 }}
      >
        <div
          style={{
            backgroundColor: "#20a8d8",
            color: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            fontSize: 16,
          }}
        >
          Hemos procesado su pedido. Estaremos validando el mismo y
          actualizaremos el estado en el panel de Tranfers
        </div>
        <div>
          <a
            href={process.env.PUBLIC_URL + "/#/NuevoTransfer"}
            className="btn btn-labs"
          >
            <b>Realizar otro Transfer</b>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { tranfersReducer: state.tranfersReducer };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmacionPedido);
