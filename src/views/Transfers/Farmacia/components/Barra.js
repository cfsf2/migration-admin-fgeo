import React from "react";
import { useEffect } from "react";

export default function Barra(props) {
  const {
    stage,
    setStage,
    Submit,
    handleNextPage,
    handlePreviousPage,
    page,
    prodPerPage,
    paginas,
    setProdsPerPage,
    productos,
    pedido,
    descuentoDrogueria,
    calcularPrecio,
  } = props;

  const [confirm, setConfirm] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);

  const handleClick = () => {
    if (
      !props.transfer.nro_cuenta_drogueria ||
      props.transfer.nro_cuenta_drogueria.toString().trim() === ""
    ) {
      alert("Nro de Cuenta es un campo Obligatorio");
      return;
    }

    if (props.tranfersReducer.lab_selected.permite_nro_cuenta === "n") {
      if (
        !props.transfer.id_drogueria ||
        props.transfer.id_drogueria.trim() === ""
      )
        return alert("Drogueria es un campo Obligatorio");
    }

    setConfirm(() => true);
    setTimeout(() => {
      setConfirm((state) => !state);
    }, 3000);
  };

  const handleSubmit = async () => {
    setEnviando((state) => !state);
    await Submit();
    setTimeout(() => {
      setEnviando((state) => !state);
      setConfirm(() => false);
    }, 10000);
  };

  const total =
    calcularPrecio === "s"
      ? pedido
          ?.reduce((accumulator, p) => {
            return (
              accumulator +
              p.producto.precio *
                p.cantidad *
                (1 - descuentoDrogueria / 100) *
                (1 - p.descuento_porcentaje / 100)
            );
          }, 0)
          .toFixed(2)
      : 0;

  return (
    <div className="transfer_barra">
      <div
        className="transfer_barra_nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        {stage !== 0 ? (
          <button
            className="btn volver"
            onClick={() => setStage((state) => state - 1)}
          >
            Volver
          </button>
        ) : null}
        <button
          className={`btn  ${confirm ? "confirmar" : "siguiente"} ${
            enviando ? "no-text" : ""
          }`}
          onClick={
            stage === 1
              ? confirm
                ? enviando
                  ? () => {}
                  : handleSubmit
                : handleClick
              : () => setStage((state) => state + 1)
          }
          disabled={props.tranfersReducer.pedido.length === 0}
        >
          {stage === 1
            ? confirm
              ? enviando
                ? "Confirmar y Enviar"
                : "Confirmar y Enviar"
              : "Finalizar"
            : "Revisar Pedido"}
          <div className={`no-enviando ${enviando ? "enviando" : ""}`}></div>
        </button>
        {calcularPrecio === "s" ? <div>Total: {total}</div> : <></>}
      </div>

      <div style={{ width: "100%" }} className="transfer_lista_footer">
        <div className="transfer_lista_footer_paginacion">
          <button onClick={handlePreviousPage}>Pagina Anterior</button>

          <button onClick={handleNextPage}>Pagina Siguiente</button>
          <p>
            Pagina {page + 1} de {paginas + 1}
          </p>
        </div>

        <div className="transfer_lista_footer_mostrando">
          <p>
            Mostrando {page * prodPerPage + 1} a{" "}
            {(page + 1) * prodPerPage < productos.length
              ? (page + 1) * prodPerPage
              : productos.length}{" "}
            de {productos.length} productos
          </p>
        </div>
        <div className="transfer_lista_footer_resultados">
          <p style={{ marginRight: "1rem" }}>Resultados por Pagina</p>
          <select
            value={prodPerPage}
            onChange={(e) => {
              setProdsPerPage(Number(e.target.value));
            }}
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
