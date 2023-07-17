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
  SET_TOTAL_AHORRO,
} from "../../../redux/actions/transfersActions";

import { Button, Card, CardBody, Spinner } from "reactstrap";

import axios from "axios";
import { farmageo_api } from "../../../config";
import "./components/transfer.scss";

const Cart = (props) => {
  const {
    stage,
    setProductos,
    productos,
    loading,
    allproducts,
    handleNextPage,
    handlePreviousPage,
    page,
    prodPerPage,
    paginas,
    setPage,
    setProdsPerPage,
    descuentoDrogueria,
    calcularPrecio,
    setTotalAhorro,
  } = props;

  switch (stage) {
    case 0:
      return (
        <>
          <Card>
            <CardBody style={{ padding: "0", paddingTop: "1rem" }}>
              <Search setProductos={setProductos} allproducts={allproducts} />
              {productos && loading === false ? (
                <ListadoProductos
                  setProductos={setProductos}
                  productos={productos}
                  loading={loading}
                  allproducts={allproducts}
                  handleNextPage={handleNextPage}
                  handlePreviousPage={handlePreviousPage}
                  page={page}
                  prodPerPage={prodPerPage}
                  paginas={paginas}
                  setPage={setPage}
                  setProdsPerPage={setProdsPerPage}
                  descuentoDrogueria={descuentoDrogueria}
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
              <Checkout
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                page={page}
                prodPerPage={prodPerPage}
                paginas={paginas}
                setPage={setPage}
                setProdsPerPage={setProdsPerPage}
                productos={productos}
                descuentoDrogueria={descuentoDrogueria}
                calcularPrecio={calcularPrecio}
                setTotalAhorro={setTotalAhorro}
              />
            </CardBody>
          </Card>
        </>
      );

    default:
      break;
  }
};

function TransferCart(props) {
  let { transfer, history, descuentoDrogueria, calcularPrecio } = props;

  const [stage, setStage] = useState(props.stage ? props.stage : 0);
  const [productos, setProductos] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [lab, setLab] = useState({});
  const [paginas, setPaginas] = useState();

  const { pedido } = props.tranfersReducer;

  const [loading, setLoading] = useState(true);

  const [page, setPage] = React.useState(0);
  const [prodPerPage, setProdsPerPage] = React.useState(40);

  const handleNextPage = (e) => {
    if (page >= paginas) return;
    setPage((page) => page + 1);
  };
  const handlePreviousPage = () => {
    if (page <= 0) return;
    setPage((page) => page - 1);
  };

  const handleSubmit = async () => {
    const { lab_selected, pedido, transfer: t } = props.tranfersReducer;

    transfer = {
      ...transfer,
      productos_solicitados: pedido,
      laboratorio_id: lab_selected.nombre,
      id_laboratorio: lab_selected.id,
      total: t.total,
      ahorro: t.ahorro,
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

  useEffect(() => {
    if (stage === 0) {
      setPaginas(Math.ceil(productos.length / prodPerPage) - 1);
    }
    if (stage === 1) {
      setPaginas(Math.ceil(pedido.length / prodPerPage) - 1);
    }
  }, [prodPerPage, stage, productos.length, pedido.length]);

  const setTotalAhorro = ({ total, ahorro }) => {
    return props.SET_TOTAL_AHORRO({ total, ahorro });
  };

  return (
    <>
      <Cart
        setProductos={setProductos}
        productos={stage === 0 ? productos : pedido}
        loading={loading}
        stage={stage}
        allproducts={allproducts}
        nobar
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
        prodPerPage={prodPerPage}
        paginas={paginas}
        setPage={setPage}
        setProdsPerPage={setProdsPerPage}
        descuentoDrogueria={descuentoDrogueria}
        calcularPrecio={calcularPrecio}
        setTotalAhorro={setTotalAhorro}
      />
      <Barra
        stage={stage}
        setStage={setStage}
        {...props}
        Submit={handleSubmit}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
        prodPerPage={prodPerPage}
        paginas={paginas}
        setPage={setPage}
        setProdsPerPage={setProdsPerPage}
        productos={stage === 0 ? productos : pedido}
        pedido={pedido}
        descuentoDrogueria={props.descuentoDrogueria}
        calcularPrecio={calcularPrecio}
        setTotalAhorro={setTotalAhorro}
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
  SET_TOTAL_AHORRO,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferCart);
