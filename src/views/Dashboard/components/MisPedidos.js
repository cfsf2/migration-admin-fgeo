import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Container,
  Spinner,
} from "reactstrap";

export default function MisPedidos(props) {
  const { pedidosNuevos, pedidosProceso, productosCasi, productosAgotados } =
    props;
  const { loading } = props.pedidosReducer;

  const [productoscasiagotados, setProductosCasiAgotados] = React.useState(0);
  const [productosagotados, setProductosAgotados] = React.useState(0);
  const [pedidosnuevos, setPedidosNuevos] = React.useState(0);
  const [pedidosenproceso, setPedidosEnProceso] = React.useState(0);

  function handlePanelExistencias() {
    const { mis_pedidos } = props.pedidosReducer;
    const { userprofile, user } = props.authReducer;

    if (userprofile !== null) {
      if (!user.IS_ADMIN && userprofile.productos !== undefined) {
        const pedidosnuevos_ = mis_pedidos.filter((p) => {
          return p.estado == "nuevo";
        }).length;
        const pedidosenproceso_ = mis_pedidos.filter((p) => {
          return p.estado == "enproceso";
        }).length;
        setPedidosNuevos(() => pedidosnuevos_);
        setPedidosEnProceso(() => pedidosenproceso_);

        const productoscasiagotados_ = userprofile.productos.filter((p) => {
          return p.inventario == "pocasexistencias";
        }).length;
        const productosagotados_ = userprofile.productos.filter((p) => {
          return p.inventario == "sinexistencias";
        }).length;
        setProductosCasiAgotados(() => productoscasiagotados_);
        setProductosAgotados(() => productosagotados_);
      }
    }
  }

  React.useEffect(() => {
    handlePanelExistencias();
  }, [props.pedidosReducer]);

  return (
    <>
      {loading ? (
        "Esperando Mis Pedidos ...."
      ) : (
        <Card>
          <CardHeader>
            <b>MIS PEDIDOS</b>
          </CardHeader>
          <CardBody>
            <Row>
              {pedidosNuevos ? (
                <Col
                  md="6"
                  xs="12"
                  style={{
                    height: 80,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  align="center"
                  className={
                    pedidosnuevos > 0 ? "btn btn-success" : "btn btn-white"
                  }
                  style={{ color: "black", width: "100%" }}
                >
                  <Row>
                    <Col md="3" xs="3">
                      <div
                        className="bg-success"
                        style={{
                          width: 40,
                          height: 40,
                          marginTop: 20,
                          borderRadius: 50,
                          float: "right",
                        }}
                      >
                        <b style={{ fontSize: 20 }}>...</b>
                      </div>
                    </Col>
                    <Col md="9" xs="9">
                      <a
                        href={process.env.PUBLIC_URL + "/#/pedidos"}
                        style={{ color: "black", float: "left" }}
                      >
                        <p
                          style={{
                            fontSize: 18,
                            paddingBottom: 0,
                            marginBottom: 0,
                            marginTop: 18,
                          }}
                        >
                          {pedidosnuevos} Pedidos
                        </p>
                        <p style={{ fontSize: 10 }}>nuevos</p>
                      </a>
                    </Col>
                  </Row>
                </Col>
              ) : null}

              {pedidosProceso ? (
                <Col
                  md="6"
                  xs="12"
                  style={{
                    height: 80,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  align="center"
                  className={
                    pedidosenproceso > 0 ? "btn btn-success" : "btn btn-white"
                  }
                  style={{ color: "black", width: "100%" }}
                >
                  <Row>
                    <Col md="3" xs="3">
                      <div
                        className="bg-secondary"
                        style={{
                          width: 40,
                          height: 40,
                          marginTop: 20,
                          borderRadius: 50,
                          float: "right",
                        }}
                      >
                        <b style={{ fontSize: 25, color: "white" }}>-</b>
                      </div>
                    </Col>
                    <Col md="9" xs="9">
                      <a
                        href={process.env.PUBLIC_URL + "/#/pedidos"}
                        style={{ color: "black", float: "left" }}
                      >
                        <p
                          style={{
                            fontSize: 18,
                            paddingBottom: 0,
                            marginBottom: 0,
                            marginTop: 18,
                          }}
                        >
                          {pedidosenproceso} Pedidos
                        </p>
                        <p style={{ fontSize: 10 }}>en proceso</p>
                      </a>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>

            <Row>
              {productosCasi ? (
                <Col
                  md="6"
                  xs="12"
                  style={{
                    height: 80,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  align="center"
                  className={
                    productoscasiagotados > 0
                      ? "btn btn-warning"
                      : "btn btn-white"
                  }
                  style={{ color: "black", width: "100%" }}
                >
                  <Row>
                    <Col md="3" xs="3">
                      <div
                        className="bg-warning"
                        style={{
                          width: 40,
                          height: 40,
                          marginTop: 20,
                          borderRadius: 50,
                          float: "right",
                        }}
                      >
                        <b style={{ fontSize: 25 }}>!</b>
                      </div>
                    </Col>
                    <Col md="9" xs="9">
                      <a
                        href={process.env.PUBLIC_URL + "/#/productos"}
                        style={{ color: "black", float: "left" }}
                      >
                        <p
                          style={{
                            fontSize: 18,
                            paddingBottom: 0,
                            marginBottom: 0,
                            marginTop: 18,
                          }}
                        >
                          {productoscasiagotados} Productos
                        </p>
                        <p style={{ fontSize: 10 }}>casi sin existencias</p>
                      </a>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {productosAgotados ? (
                <Col
                  md="6"
                  xs="12"
                  style={{
                    height: 80,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  align="center"
                  className={
                    pedidosenproceso > 0 ? "btn btn-success" : "btn btn-white"
                  }
                  style={{ color: "black", width: "100%" }}
                >
                  <Row>
                    <Col md="3" xs="3">
                      <div
                        className="bg-danger"
                        style={{
                          width: 40,
                          height: 40,
                          marginTop: 20,
                          borderRadius: 50,
                          float: "right",
                        }}
                      >
                        <b style={{ fontSize: 25, color: "white" }}>X</b>
                      </div>
                    </Col>
                    <Col md="9" xs="9">
                      <a
                        href={process.env.PUBLIC_URL + "/#/productos"}
                        style={{ color: "black", float: "left" }}
                      >
                        <p
                          style={{
                            fontSize: 18,
                            paddingBottom: 0,
                            marginBottom: 0,
                            marginTop: 18,
                          }}
                        >
                          {productosagotados} Productos
                        </p>
                        <p style={{ fontSize: 10 }}>agotados</p>
                      </a>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
          </CardBody>
        </Card>
      )}
    </>
  );
}
