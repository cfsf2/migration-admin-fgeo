import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Checkout from "./components/Checkout";
import ListadoProductos from "./components/ListadoProductos";
import Search from "./components/Search";
import {
  ADD_TRANSFER,
  SUBMITTING,
} from "../../../redux/actions/transfersActions";

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

import axios from "axios";
import { farmageo_api } from "../../../config";
import "./components/transfer.scss";

function TransferCart(props) {
  const [stage, setStage] = useState(0);
  const [productos, setProductos] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
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
        setProductos(res.data);
        setAllProducts(res.data);
      })
      .then(() => setLoading(false));
  }, []);

  const Cart = () => {
    switch (stage) {
      case 0:
        return (
          <>
            <Card>
              <CardBody>
                <Search setProductos={setProductos} allproducts={allproducts} />
                {productos && loading === false ? (
                  <ListadoProductos
                    allproducts={allproducts}
                    setProductos={setProductos}
                    productos={productos}
                    pedido={pedido}
                    setPedido={setPedido}
                    loading={loading}
                  />
                ) : null}
              </CardBody>
            </Card>
          </>
        );
        break;
      case 1:
        return <Checkout pedido={pedido} setPedido={setPedido} />;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Cart />
      <div style={{ position: "fixed", bottom: "5%", zIndex: 100 }}>
        <button onClick={() => setStage((state) => state - 1)}>Volver</button>{" "}
        <button onClick={() => setStage((state) => state + 1)}>
          Siguiente
        </button>
      </div>
    </>
  );
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
