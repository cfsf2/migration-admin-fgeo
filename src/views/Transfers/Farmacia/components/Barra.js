import React from "react";

export default function Barra(props) {
  const { stage, setStage, Submit } = props;

  const [confirm, setConfirm] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);

  const handleClick = () => {
    if (props.transfer.drogueria_id || props.transfer.bro_cuenta_drogueria) {
      setConfirm(() => true);
      setTimeout(() => {
        setConfirm((state) => !state);
      }, 3000);
      return;
    }
    alert("Drogueria y su Nro de Cuenta son campos Obligatorios");
  };

  const handleSubmit = async () => {
    setEnviando((state) => !state);
    await Submit();
    setTimeout(() => {
      setEnviando((state) => !state);
      setConfirm(() => false);
    }, 10000);
  };
  return (
    <div className="transfer_barra">
      <div className="transfer_barra_nav">
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
            : "Siguiente"}
          <div className={`no-enviando ${enviando ? "enviando" : ""}`}></div>
        </button>
      </div>
      <a
        href={process.env.PUBLIC_URL + "/#/NuevoTransfer"}
        className="btn btn-labs"
      >
        <b style={{ fontSize: 15 }}>{"<   "}</b>
        <b>Elegir Otro Laboratorio</b>
      </a>
    </div>
  );
}
