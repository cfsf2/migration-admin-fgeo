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
  const { allproducts, productos, setProductos, pedido, setPedido, loading } =
    props;

  const [direccion, setDireccion] = React.useState(1);
  const [sortType, setSortType] = React.useState("nombre");

  const [page, setPage] = React.useState(0);
  const [prodPerPage, setProdsPerPage] = React.useState(10);
  const [showProducts, setShowProducts] = React.useState([]);

  const handleSort = (e) => {
    const campo = e.target.id;
    setSortType(campo);

    if (campo !== sortType) {
      setDireccion(1);
      return;
    }
    setDireccion((state) => state * -1);
    setPage(0);
  };

  //paginacion
  const paginas = Math.ceil(productos.length / prodPerPage) - 1;
  const handleNextPage = (e) => {
    if (page >= paginas) return;
    setPage((page) => page + 1);
  };
  const handlePreviousPage = () => {
    if (page <= 0) return;
    setPage((page) => page - 1);
  };

  React.useEffect(() => {
    const primerProd = page * prodPerPage;
    const ultimoProd = primerProd + prodPerPage;

    if (allproducts.length > 0) {
      const productosOrdenados = ordenar([...productos], sortType, direccion);
      let showProducts = productosOrdenados.slice(primerProd, ultimoProd);
      if (showProducts.length < prodPerPage) {
        const empties = prodPerPage - showProducts.length;
        let vacios = [];
        for (let i = 0; i < empties; i++) {
          vacios[i] = { _id: i };
        }
        showProducts = showProducts.concat(vacios);
      }
      setShowProducts(() => showProducts);
    }
    if (page > paginas) {
      setPage(0);
    }
  }, [sortType, direccion, page, productos, prodPerPage]);

  return (
    <div className="transfer_lista">
      <div className="transfer_lista_header">
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
          %
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
      </div>
      <div className="transfer_lista_items">
        {loading ? (
          <div>Cargando</div>
        ) : productos?.length === 0 ? (
          <p className="transfer_lista_sinresultados">
            No se encontraron Productos
          </p>
        ) : null}
        {showProducts.map((producto) => {
          return (
            <div className="transfer_lista_item">
              <Item
                key={producto._id}
                producto={producto}
                pedido={pedido}
                setPedido={setPedido}
              />
            </div>
          );
        })}
      </div>
      <div className="transfer_lista_footer">
        <div className="transfer_lista_footer_paginacion">
          <button onClick={handlePreviousPage}>Pagina Anterior</button>

          <button onClick={handleNextPage}>Pagina Siguiente</button>
          <p>
            Pagina {page + 1} de {paginas + 1}
          </p>
        </div>
        <div className="transfer_lista_footer_resultados">
          <p>Resultados por Pagina</p>
          <select
            value={prodPerPage}
            onChange={(e) => setProdsPerPage(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}
