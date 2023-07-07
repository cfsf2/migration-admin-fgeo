import React from "react";
import { SET_PEDIDO } from "../../../../redux/actions/transfersActions";
import { connect } from "react-redux";

export function Item(props) {
  const { pedido, lab_selected } = props.tranfersReducer;
  const { producto, descuentoDrogueria } = props;

  const [cantidad, setCantidad] = React.useState(() => {
    const cantidadEnPedido = pedido.find(
      (prod) => prod.id === producto.id
    )?.cantidad;

    if (cantidadEnPedido > 0) {
      return cantidadEnPedido;
    }
    return 0;
  });
  const [observaciones, setObservaciones] = React.useState(() => {
    const obsEnPedido = pedido.find(
      (prod) => prod.id === producto.id
    )?.observacion;

    return obsEnPedido;
  });

  const suma = (id, producto) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod.id === id);
    const idx = newPedido.findIndex((prod) => prod.id === id);

    if (idx !== -1) {
      pedidoProd.cantidad = cantidad + 1;
      newPedido[idx] = pedidoProd;
      setCantidad(() => pedidoProd.cantidad);

      props.SET_PEDIDO(newPedido);
      return;
    }

    producto.cantidad = producto.cantidad_minima;
    newPedido = newPedido.concat(producto);

    props.SET_PEDIDO(newPedido);
    setCantidad(() => producto.cantidad);
  };

  const resta = (id, producto) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod.id === id);
    const idx = newPedido.findIndex((prod) => prod.id === id);

    if (cantidad <= 0) return;
    if (cantidad === producto.cantidad_minima) {
      pedidoProd.observacion = "";
      newPedido = newPedido.filter((prod) => prod.id !== producto.id);
      setCantidad(() => 0);
      setObservaciones("");

      props.SET_PEDIDO(newPedido);
      return;
    }
    pedidoProd.cantidad = cantidad - 1;
    newPedido[idx] = pedidoProd;

    props.SET_PEDIDO(newPedido);
    setCantidad(() => producto.cantidad);
  };

  const handleChange = (e, producto, id) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod.id === id);
    const idx = newPedido.findIndex((prod) => prod.id === id);
    const value = Number(e.target.value);
    setCantidad(value);

    if (value >= producto.cantidad_minima) {
      if (idx !== -1) {
        pedidoProd.cantidad = value;
        newPedido[idx] = pedidoProd;
        props.SET_PEDIDO(newPedido);
        //setPedido(() => newPedido);
        setCantidad(value);
        return;
      }
      producto.cantidad = value;
      newPedido = newPedido.concat(producto);
      //setPedido(() => newPedido);
      props.SET_PEDIDO(newPedido);
      return;
    }
    if (value <= producto.cantidad_minima) {
      setCantidad(() => 0);

      newPedido = newPedido.filter((prod) => prod.id !== producto.id);
      //setPedido(() => newPedido);
      props.SET_PEDIDO(newPedido);
    }
  };

  const handleObservacion = (e, producto, id) => {
    setObservaciones(() => e.target.value);
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod.id === id);
    const idx = newPedido.findIndex((prod) => prod.id === id);

    if (idx !== -1) {
      pedidoProd.observacion = e.target.value;
      newPedido[idx] = pedidoProd;
      props.SET_PEDIDO(newPedido);
      return;
    }
    return setObservaciones("");
  };

  const descuentoConvertido = parseFloat(producto.descuento_porcentaje).toFixed(
    2
  );

  console.log()

  return (
    <>
      {producto.nombre !== undefined ? (
        <>
          <div className="transfer_lista_items_codigo">{producto.codigo}</div>
          <div className="transfer_lista_items_nombre">{producto.nombre}</div>
          <div className="transfer_lista_items_presentacion">
            {producto.presentacion}
          </div>
          <div className="transfer_lista_items_descuento">
            {descuentoConvertido}
          </div>

          {lab_selected.calcular_precio === "s" ? (
            <>
              <div className="transfer_lista_items_codigo">
                {producto?.producto?.precio.toFixed(2)}
              </div>
              <div className="transfer_lista_items_codigo">
                {(
                  producto?.producto?.precio *
                  cantidad *
                  (1 - descuentoDrogueria / 100) *
                  (1 - producto.descuento_porcentaje / 100)
                ).toFixed(2)}
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="transfer_lista_items_minimo">
            {producto.cantidad_minima}
          </div>
          <div className="transfer_lista_items_cantidad">
            <button
              className="btn transfer_lista_items_cantidad_resta"
              onClick={() => resta(producto.id, producto)}
              disabled={producto.nombre ? false : true}
            >
              -
            </button>
            <input
              type="number"
              value={cantidad}
              onBlur={(e) => handleChange(e, producto, producto.id)}
              onChange={(e) => setCantidad(e.target.value)}
              disabled={producto.nombre ? false : true}
            />
            <button
              className="btn transfer_lista_items_cantidad_suma"
              onClick={() => suma(producto.id, producto)}
              disabled={producto.nombre ? false : true}
            >
              +
            </button>
          </div>
          <textarea
            placeholder={"Aclaraciones"}
            value={observaciones}
            className=" transfer_lista_items_observaciones"
            onChange={(e) => handleObservacion(e, producto, producto.id)}
            disabled={producto.nombre && cantidad > 0 ? false : true}
          ></textarea>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
  };
};
const mapDispatchToProps = {
  SET_PEDIDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
