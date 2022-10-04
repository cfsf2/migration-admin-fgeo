import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Checkout from "./components/Checkout";
import ListadoProductos from "./components/ListadoProductos";
import Search from "./components/Search";
import Barra from "./components/Barra";
import {
  ADD_TRANSFER,
  SUBMITTING,
  RESET_PEDIDO,
} from "../../../redux/actions/transfersActions";

import { Button, Card, CardBody, Spinner } from "reactstrap";

import axios from "axios";
import { farmageo_api } from "../../../config";
import "./components/transfer.scss";

const Cart = (props) => {
  const { stage, setProductos, productos, loading, allproducts } = props;
  switch (stage) {
    case 0:
      return (
        <>
          <Card>
            <CardBody>
              <Search setProductos={setProductos} allproducts={allproducts} />
              {productos && loading === false ? (
                <ListadoProductos
                  setProductos={setProductos}
                  productos={productos}
                  loading={loading}
                  allproducts={allproducts}
                />
              ) : (
                <div className="transfer_cart_spinner">
                  <Spinner color="info" />
                </div>
              )}
            </CardBody>
          </Card>
        </>
      );

    case 1:
      return (
        <>
          {" "}
          <Card>
            <CardBody>
              <Checkout />
            </CardBody>
          </Card>
        </>
      );

    default:
      break;
  }
};

function TransferCart(props) {
  let { transfer, history } = props;
  const [stage, setStage] = useState(props.stage ? props.stage : 0);
  const [productos, setProductos] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [lab, setLab] = useState({});

  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    const { lab_selected, pedido } = props.tranfersReducer;

    transfer = {
      ...transfer,
      productos_solicitados: pedido,
      laboratorio_id: lab_selected.nombre,
      id_laboratorio: lab_selected.id,
    };

    props.ADD_TRANSFER(transfer, history);
  };

  useEffect(() => {
    const laboratorio = new URLSearchParams(
      window.location.hash.split("?")[1]
    ).get("l");
    if (loading) {
      props.RESET_PEDIDO();

      axios
        .get(farmageo_api + "/laboratorios/" + laboratorio)
        .then((res) => setLab(res.data));

      axios
        .get(farmageo_api + "/productosTransfers/laboratorio/" + laboratorio, {
          params: {
            instituciones: props.farmaciaReducer.farmacia.instituciones,
            from: "TransferCart",
          },
        })
        .then((res) => {
          setProductos(res.data);
          setAllProducts(res.data);
        })
        .then(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <Cart
        setProductos={setProductos}
        productos={productos}
        loading={loading}
        stage={stage}
        allproducts={allproducts}
        nobar
      />
      <Barra
        stage={stage}
        setStage={setStage}
        {...props}
        Submit={handleSubmit}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
    authReducer: state.authReducer,
    publicidadesReducer: state.publicidadesReducer,
    farmaciaReducer: state.farmaciaReducer,
  };
};
const mapDispatchToProps = {
  ADD_TRANSFER,
  SUBMITTING,
  RESET_PEDIDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferCart);
