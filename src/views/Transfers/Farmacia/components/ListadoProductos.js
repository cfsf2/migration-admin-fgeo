import React from "react";
import Item from "./Item";
import { SET_PEDIDO } from "../../../../redux/actions/transfersActions";
import { connect } from "react-redux";
import { image_path_server } from "../../../../config";

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

export function ListadoProductos(props) {
  const { loading, productos, page, prodPerPage, paginas, setPage } = props;
  const { laboratorios } = props.tranfersReducer;

  const [direccion, setDireccion] = React.useState(1);
  const [sortType, setSortType] = React.useState("nombre");

  // const [page, setPage] = React.useState(0);
  // const [prodPerPage, setProdsPerPage] = React.useState(20);
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
  //const paginas = Math.ceil(productos.length / prodPerPage) - 1;
  // const handleNextPage = (e) => {
  //   if (page >= paginas) return;
  //   setPage((page) => page + 1);
  // };
  // const handlePreviousPage = () => {
  //   if (page <= 0) return;
  //   setPage((page) => page - 1);
  // };

  React.useEffect(() => {
    const primerProd = page * prodPerPage;
    const ultimoProd = primerProd + prodPerPage;

    if (productos) {
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
  }, [sortType, direccion, page, productos, prodPerPage, paginas, setPage]);

  return (
    <div className="transfer_lista">
      <div className="transfer_lista_header">
        <div
          id="laboratorioid"
          className="transfer_lista_header_titulo"
          style={{ paddingLeft: "7.5px" }}
          onClick={handleSort}
        >
          Laboratorio
        </div>
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
          style={{ paddingRight: "0.55rem" }}
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
        ) : showProducts?.length === 0 ? (
          <p className="transfer_lista_sinresultados">
            No se encontraron Productos
          </p>
        ) : null}
        {showProducts.map((producto) => {
          return (
            //***** Linea de Listado ****/
            <div key={producto._id} className="transfer_lista_item">
              <div
                // style={{
                //   display: "flex",
                //   flexDirection: "column",
                //   alignItems: "center",
                //   marginBottom: "10px",
                // }}
              >
                {laboratorios.filter((lab) => {
                  // return lab._id === producto.laboratorioid;
                  return lab.id === producto.id_laboratorio;
                })[0]?.imagen ? (
                  <img
                    alt={producto.nombre}
                    src={
                      image_path_server +
                      laboratorios.filter(
                        // (lab) => lab._id === producto.laboratorioid
                        (lab) => lab.id === producto.id_laboratorio
                      )[0]?.imagen
                    }
                    className="transfer_lista_item_imagen"
                  />
                ) : null}
                <p>
                  {
                    laboratorios.filter(
                      //(lab) => lab._id === producto.laboratorioid
                      (lab) => lab.id === producto.id_laboratorio
                    )[0]?.nombre
                  }
                </p>
              </div>
              <Item key={producto.id} producto={producto} />
            </div>
          );
        })}
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListadoProductos);
