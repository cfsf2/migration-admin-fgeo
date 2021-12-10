import React from "react";

export default function Barra(props) {
  const { stage, setStage } = props;
  return (
    <div className="transfer_barra">
      <div>
        {stage !== 0 ? (
          <button
            className="btn volver"
            onClick={() => setStage((state) => state - 1)}
          >
            Volver
          </button>
        ) : null}
        <button
          className="btn siguiente"
          onClick={() => setStage((state) => state + 1)}
          disabled={props.tranfersReducer.pedido.length === 0 || stage >= 1}
        >
          {stage === 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
      <a
        href={process.env.PUBLIC_URL + "/#/NuevoTransfer"}
        className="btn btn-labs"
      >
        <b style={{ fontSize: 15 }}>{"<   "}</b>
        <b>Volver a elegir un Laboratorio</b>
      </a>
    </div>
  );
}
