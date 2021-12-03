import React from "react";

export default function Item(props) {
  const { producto, pedido, setPedido } = props;
  const [cantidad, setCantidad] = React.useState(0);

  const suma = (id, producto) => {
    let newPedido = [...pedido];
    const pedidoProd = newPedido.find((prod) => prod._id === id);
    const idx = newPedido.findIndex((prod) => prod._id === id);

    if (idx !== -1) {
      pedidoProd.cantidad = cantidad + 1;
      newPedido[idx] = pedidoProd;
      setCantidad(() => pedidoProd.cantidad);
      setPedido(() => newPedido);
      return;
    }

    producto.cantidad = producto.cantidad_minima;
    newPedido = newPedido.concat(producto);
    setPedido(() => newPedido);
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
      setPedido(() => newPedido);
      return;
    }
    pedidoProd.cantidad = cantidad - 1;
    newPedido[idx] = pedidoProd;
    setPedido(() => newPedido);
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
        setPedido(() => newPedido);
        setCantidad(value);
        return;
      }
      producto.cantidad = value;
      newPedido = newPedido.concat(producto);
      setPedido(() => newPedido);
      return;
    }
    if (value <= producto.cantidad_minima) {
      setCantidad(() => 0);
      newPedido = newPedido.filter((prod) => prod._id !== producto._id);
      setPedido(() => newPedido);
    }
  };

  return (
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
        >
          -
        </button>
        <input
          type="number"
          value={cantidad}
          onBlur={(e) => handleChange(e, producto, producto._id)}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button
          className="btn transfer_lista_items_cantidad_suma"
          onClick={() => suma(producto._id, producto)}
        >
          +
        </button>
      </div>
      <div className=" transfer_lista_items_observaciones">observaciones</div>
    </>
  );
}
