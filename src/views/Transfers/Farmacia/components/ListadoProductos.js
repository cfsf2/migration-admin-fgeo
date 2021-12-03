import React from "react";
import Item from "./Item";

export default function ListadoProductos(props) {
  const { productos, pedido, setPedido, loading } = props;

  return (
    <div className="transfer_lista">
      <div className="transfer_lista_header"></div>
      <div className="transfer_lista_items">
        <div className="transfer_lista_header_titulo">Codigo</div>
        <div className="transfer_lista_header_titulo">Nombre</div>
        <div className="transfer_lista_header_titulo">Presentacion</div>
        <div className="transfer_lista_header_titulo">Descuento</div>
        <div className="transfer_lista_header_titulo">Minimo</div>
        <div className="transfer_lista_header_titulo">Cantidad</div>
        <div className="transfer_lista_header_titulo">Observaciones</div>
        {loading ? (
          <div>Cargando</div>
        ) : productos?.length === 0 ? (
          <p>No hay productos Cargados</p>
        ) : (
          productos.map((producto) => {
            return (
              <Item
                key={producto._id}
                producto={producto}
                pedido={pedido}
                setPedido={setPedido}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
