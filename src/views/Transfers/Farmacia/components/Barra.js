import React from "react";
import { useEffect, useState } from "react";

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
    setTotalAhorro,
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
            if (!p.producto) return accumulator;
            const pvp = p.producto.precio;

            const descuento =
              pvp *
              (1 -
                (1 - descuentoDrogueria / 100) *
                  (1 - p.descuento_porcentaje / 100));

            const precioFinal = pvp - descuento;
            return accumulator + p.cantidad * precioFinal;
          }, 0)
          .toFixed(2)
      : 0;

  const ahorroAprox =
    calcularPrecio === "s"
      ? pedido
          ?.reduce((accumulator, p) => {
            if (!p.producto) return accumulator;
            const pvp = p.producto.precio;

            const descuento =
              pvp *
              (1 - descuentoDrogueria / 100) *
              (p.descuento_porcentaje / 100);

            //  const precioFinal = pvp - descuento;

            return accumulator + p.cantidad * descuento;
          }, 0)
          .toFixed(2)
      : 0;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (total && ahorroAprox) setTotalAhorro({ total, ahorro: ahorroAprox });
  }, [total, ahorroAprox]);

  return (
    <div className="transfer_barra">
      <div
        className="transfer_barra_nav"
        style={{
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

        {calcularPrecio === "s" ? (
          <>
            <div
              style={{ position: "relative" }}
              className="transfer_total_numero"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="transfer_cart_barra_total">Total: {total}</div>

              <div className={isHovered ? "mensaje_flotante" : "d-none"}>
                El precio es solo una aproximación. El costo real se verá
                reflejado en la factura
              </div>
            </div>
            <div>Ahorro Aproximado: {ahorroAprox}</div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div style={{ width: "100%" }} className="transfer_lista_footer">
        <div className="transfer_lista_footer_paginacion">
          <button onClick={handlePreviousPage}>Página Anterior</button>

          <button onClick={handleNextPage}>Página Siguiente</button>
          <p>
            Página {page + 1} de {paginas + 1}
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
          <select
            value={prodPerPage}
            onChange={(e) => {
              setProdsPerPage(Number(e.target.value));
            }}
          >
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={60}>60</option>
          </select>
          <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>
            Resultados por Página
          </p>
        </div>
      </div>
    </div>
  );
}
