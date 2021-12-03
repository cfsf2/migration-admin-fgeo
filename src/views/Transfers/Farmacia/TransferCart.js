import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Checkout from "./components/Checkout";
import ListadoProductos from "./components/ListadoProductos";
import {
  ADD_TRANSFER,
  SUBMITTING,
} from "../../../redux/actions/transfersActions";

import axios from "axios";
import { farmageo_api } from "../../../config";
import "./components/transfer.scss";

function TransferCart(props) {
  const [stage, setStage] = useState(0);
  const [productos, setProductos] = useState([]);
  const [lab, setLab] = useState({});

  const [pedido, setPedido] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const laboratorio = new URLSearchParams(
      window.location.hash.split("?")[1]
    ).get("l");

    axios
      .get(farmageo_api + "/laboratorios/" + laboratorio)
      .then((res) => setLab(res.data));

    axios
      .get(farmageo_api + "/productosTransfers/laboratorio/" + laboratorio)
      .then((res) => {
        setLoading(false);
        setProductos(res.data);
      });
  }, []);

  switch (stage) {
    case 0:
      return (
        <ListadoProductos
          productos={productos}
          pedido={pedido}
          setPedido={setPedido}
          loading={loading}
        />
      );
      break;
    case 1:
      return <Checkout pedido={pedido} setPedido={setPedido} />;
      break;
    default:
      break;
  }
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
    authReducer: state.authReducer,
    publicidadesReducer: state.publicidadesReducer,
  };
};
const mapDispatchToProps = {
  ADD_TRANSFER,
  SUBMITTING,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferCart);
