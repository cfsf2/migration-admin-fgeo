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
              ) : null}
            </CardBody>
          </Card>
        </>
      );
      break;
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
      break;
    default:
      break;
  }
};

function TransferCart(props) {
  const [stage, setStage] = useState(props.stage ? props.stage : 0);
  const [productos, setProductos] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [lab, setLab] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const laboratorio = new URLSearchParams(
      window.location.hash.split("?")[1]
    ).get("l");
    if (loading) {
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
      <Barra stage={stage} setStage={setStage} {...props} />
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
