import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { farmageo_api } from "../../../../config";
import Axios from "axios";

const Excel = ({ opciones }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    Axios.post(farmageo_api + "/excel", {
      conf: opciones.id_a,
      filtros: Object.assign(opciones.filtros, { pantalla: opciones.padre }),
      id: opciones.id_global,
    }).then((res) => {
      const excel = Buffer.from(res.data.excel.archivo, "base64");
      const blob = new Blob([excel], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      opciones.dispatch({
        type: "SET_DATOS",
        payload: res.data.conf.datos,
      });
      setLoading(false);
      // para abrir la ventana de descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = res.data.excel.nombre;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <>
      {loading ? (
        ReactDOM.createPortal(
          <>
            <div
              className="pantalla-fondo-modal"
              // onClick={() => handleClose(false)}
              style={{
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1020,
              }}
            ></div>

            <div
              // id={data.opciones.id_a}
              className="pantalla-modal-container maquinaescribir"
              style={{
                zIndex: 1021,
                background: "white",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Generando Excel ...
            </div>
          </>,
          document.getElementById("modal-root")
        )
      ) : (
        <></>
      )}
      <div
        className={
          opciones.titulo
            ? "flex_acciones_vista_excel"
            : "flex_acciones_vista_alt_excel"
        }
      >
        <div
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          title="Descargar Excel"
        >
          <FontAwesomeIcon icon={faFileArrowDown} />
        </div>
      </div>
    </>
  );
};

export default Excel;
