import React from "react";
import { SET_PEDIDO } from "../../../../redux/actions/transfersActions";
import { connect } from "react-redux";

export function Item(props) {
  const pedido = props.tranfersReducer.pedido;
  const { producto } = props;
  const [cantidad, setCantidad] = React.useState(() => {
    const cantidadEnPedido = pedido.find(
      (prod) => prod._id === producto._id
    )?.cantidad;

    if (cantidadEnPedido > 0) {
      return cantidadEnPedido;
    }
    return 0;
  });
  const [observaciones, setObservaciones] = React.useState("");

  const suma = (id, producto) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod._id === id);
    const idx = newPedido.findIndex((prod) => prod._id === id);

    if (idx !== -1) {
      pedidoProd.cantidad = cantidad + 1;
      newPedido[idx] = pedidoProd;
      setCantidad(() => pedidoProd.cantidad);
      // setPedido(() => newPedido);
      props.SET_PEDIDO(newPedido);
      return;
    }

    producto.cantidad = producto.cantidad_minima;
    newPedido = newPedido.concat(producto);
    // setPedido(() => newPedido);
    props.SET_PEDIDO(newPedido);
    setCantidad(() => producto.cantidad);
  };

  const resta = (id, producto) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod._id === id);
    const idx = newPedido.findIndex((prod) => prod._id === id);

    if (cantidad <= 0) return;
    if (cantidad === producto.cantidad_minima) {
      newPedido = newPedido.filter((prod) => prod._id !== producto._id);
      setCantidad(() => 0);
      setObservaciones("");
      // setPedido(() => newPedido);
      props.SET_PEDIDO(newPedido);
      return;
    }
    pedidoProd.cantidad = cantidad - 1;
    newPedido[idx] = pedidoProd;
    // setPedido(() => newPedido);
    props.SET_PEDIDO(newPedido);
    setCantidad(() => producto.cantidad);
  };

  const handleChange = (e, producto, id) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod._id === id);
    const idx = newPedido.findIndex((prod) => prod._id === id);
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

      newPedido = newPedido.filter((prod) => prod._id !== producto._id);
      //setPedido(() => newPedido);
      props.SET_PEDIDO(newPedido);
    }
  };

  const handleObservacion = (e, producto, id) => {
    setObservaciones(() => e.target.value);
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod._id === id);
    const idx = newPedido.findIndex((prod) => prod._id === id);
    const value = e.target.value;

    if (idx !== -1) {
      pedidoProd.observaciones = e.target.value;
      newPedido[idx] = pedidoProd;
      props.SET_PEDIDO(newPedido);
      return;
    }
    return setObservaciones("");
  };

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
            {producto.descuento_porcentaje}
          </div>
          <div className="transfer_lista_items_minimo">
            {producto.cantidad_minima}
          </div>
          <div className="transfer_lista_items_cantidad">
            <button
              className="btn transfer_lista_items_cantidad_resta"
              onClick={() => resta(producto._id, producto)}
              disabled={producto.nombre ? false : true}
            >
              -
            </button>
            <input
              type="number"
              value={cantidad}
              onBlur={(e) => handleChange(e, producto, producto._id)}
              onChange={(e) => setCantidad(e.target.value)}
              disabled={producto.nombre ? false : true}
            />
            <button
              className="btn transfer_lista_items_cantidad_suma"
              onClick={() => suma(producto._id, producto)}
              disabled={producto.nombre ? false : true}
            >
              +
            </button>
          </div>
          <textarea
            placeholder={"Aclaraciones"}
            value={observaciones}
            className=" transfer_lista_items_observaciones"
            onChange={(e) => handleObservacion(e, producto, producto._id)}
            disabled={producto.nombre ? false : true}
          ></textarea>
        </>
      ) : (
        <>
          <div className="transfer_lista_items_vacio"></div>
          <div className="transfer_lista_items_vacio"></div>
          <div className="transfer_lista_items_vacio"></div>
          <div className="transfer_lista_items_vacio"></div>
          <div className="transfer_lista_items_vacio"></div>
          <div className="transfer_lista_items_vacio"></div>
          <div className="transfer_lista_items_vacio"></div>
        </>
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
