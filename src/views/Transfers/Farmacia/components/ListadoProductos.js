import React from "react";
import Item from "./Item";

export const ordenar = (array, key, direccion) => {
  const sortedArray = array.sort(function (a, b) {
    let pri = a[key];
    let sec = b[key];
    if (typeof a[key] === "string") {
      pri = a[key].trim();
      sec = b[key].trim();
    }
    //ascendente
    if (direccion > 0) {
      if (pri > sec) return 1;
      if (pri < sec) return -1;
      return 0;
    }
    //descendente
    if (direccion < 0) {
      if (pri < sec) return 1;
      if (pri > sec) return -1;
      return 0;
    }
  });
  return sortedArray;
};

export default function ListadoProductos(props) {
  const { productos, setProductos, pedido, setPedido, loading } = props;

  const [direccion, setDireccion] = React.useState(1);
  const [sortType, setSortType] = React.useState("nombre");

  const handleSort = (e) => {
    const campo = e.target.id;
    setSortType(campo);

    if (campo !== sortType) {
      setDireccion(1);
      return;
    }
    setDireccion((state) => state * -1);
  };

  React.useEffect(() => {
    if (productos.length > 0) {
      const productosOrdenados = ordenar([...productos], sortType, direccion);
      setProductos(() => productosOrdenados);
    }
  }, [sortType, direccion]);

  return (
    <div className="transfer_lista">
      <div className="transfer_lista_header"></div>
      <div className="transfer_lista_items">
        <div
          id="codigo"
          className="transfer_lista_header_titulo"
          onClick={handleSort}
        >
          Codigo
        </div>
        <div
          id="nombre"
          className="transfer_lista_header_titulo"
          onClick={handleSort}
        >
          Nombre
        </div>
        <div
          id="presentacion"
          className="transfer_lista_header_titulo"
          onClick={handleSort}
        >
          Presentacion
        </div>
        <div
          id="descuento_porcentaje"
          className="transfer_lista_header_titulo"
          onClick={handleSort}
        >
          Descuento
        </div>
        <div
          id="cantidad_minima"
          className="transfer_lista_header_titulo"
          onClick={handleSort}
        >
          Minimo
        </div>
        <div id="cantidad" className="transfer_lista_header_titulo">
          Cantidad
        </div>
        <div id="observaciones" className="transfer_lista_header_titulo">
          Observaciones
        </div>
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
