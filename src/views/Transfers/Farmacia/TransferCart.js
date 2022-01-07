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
  let { transfer, history } = props;
  const [stage, setStage] = useState(props.stage ? props.stage : 0);
  const [productos, setProductos] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [lab, setLab] = useState({});

  const [loading, setLoading] = useState(true);

  const handleTable = (transfer) => {
    let stringTable = "";
    transfer.productos_solicitados.map((p) => {
      stringTable = `${stringTable}<tr>
                            <td>${p.codigo}</td>
                            <td>${p.nombre}</td>
                            <td>${p.presentacion}</td>
                            <td>${p.cantidad}</td>
                            <td>${p.observaciones ? p.observaciones : ""}</td>
                        </tr>`;
    });
    return stringTable;
  };

  const createHtmlMail = async (transfer, direccioncompleta) => {
    let body = `<head>
                        <style>
                          table {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                          }
                          
                          td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                          }
                          
                          tr:nth-child(even) {
                            background-color: #dddddd;
                          }

                        </style>
                      </head>
                      <body>
                        <div>
                          <p><b>Farmacia: </b>${
                            transfer.farmacia_nombre
                          } / <b>Cuit: </b>${transfer.cuit}</p>
                          <p><b>Telefono: </b>${transfer.telefono}</p>
                          <p><b>Nro Cufe: </b>${transfer.cufe}</p>
                          <p><b>Nro Cuenta de Droguería: </b>${
                            transfer.nro_cuenta_drogueria
                          }</p> 
                          <p><b>Droguería: </b>${transfer.drogueria_id}</p>
                          <p><b>Laboratorio elegido: </b>${
                            transfer.laboratorio_id
                          }</p>
                          <p><b>Dirección: </b>${direccioncompleta}</p>
                        </div>
                      <table>
                          <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Presentación</th>
                            <th>Cantidad</th>
                            <th>Observaciones</th>
                          </tr>
                        <tbody>
                        ${handleTable(transfer)}                    
                        </tbody>
                      </table>
                    </body>`;
    return body;
  };

  const handleSubmit = async () => {
    const {
      farmaciaid,
      email,
      cuit,
      telefono,
      cufe,
      nombre,
      direccioncompleta,
    } = props.authReducer.userprofile;
    const { lab_selected, pedido } = props.tranfersReducer;

    transfer = {
      ...transfer,
      fecha: new Date(Date.now()).toISOString().substring(0, 10),
      productos_solicitados: pedido,
      farmacia_id: farmaciaid,
      farmacia_nombre: nombre,
      estado: "nuevo",
      laboratorio_id: lab_selected.nombre,
      email_destinatario: email,
      telefono,
      cuit,
      cufe,
    };
    let html = await createHtmlMail(transfer, direccioncompleta);

    props.ADD_TRANSFER(transfer, history, html, email);
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
  };
};
const mapDispatchToProps = {
  ADD_TRANSFER,
  SUBMITTING,
  RESET_PEDIDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferCart);
