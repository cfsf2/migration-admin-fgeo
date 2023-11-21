import React from "react";

const BotonWhatsapp = ({
  data,
  cab,
  hijos,
  campokey,
  indiceData,
  id_elemento,
}) => {
  const { wsp_mostrar, wsp_texto, id_a } = cab;

  const mostrar = data[id_a + "_wsp_mostrar"] ?? wsp_mostrar;
  const contacto = data[id_a + "_wsp_contacto"] ?? null;
  const texto = data[id_a + "_wsp_texto"] ?? wsp_texto;
  if (!contacto || contacto === "") return <></>;

  const classNames = data[cab.id_a + "_className"] ?? cab.className;

  return (
    <div className={` ${classNames} wsp_div`}>
      <BtnWsp contacto={contacto} mostrar={mostrar} texto={texto} />
    </div>
  );
};
export default BotonWhatsapp;

export const BtnWsp = ({ contacto, mostrar, texto, className }) => {
  const numero_wsp = eliminarNoNumericos(contacto);
  if (numero_wsp.length !== 10)
    return (
      <div
        href={`https://wa.me/54${numero_wsp}?text=${texto}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", textDecoration: "none", color: "inherit" }}
        className={className}
      >
        {mostrar || mostrar !== "" ? (
          <div className="wsp_div_texto">{mostrar}</div>
        ) : (
          <></>
        )}
      </div>
    );
  return (
    <>
      <a
        href={`https://wa.me/54${numero_wsp}?text=${texto}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", textDecoration: "none", color: "inherit" }}
        className={className}
      >
        {mostrar || mostrar !== "" ? (
          <div className="wsp_div_texto">{mostrar}</div>
        ) : (
          <></>
        )}
        <div className="wsp_icon" style={{ color: "#25d366" }}>
          <i class="fa fa-whatsapp"></i>
        </div>
      </a>
    </>
  );
};

function eliminarNoNumericos(valor) {
  if (typeof valor === "string" || typeof valor === "number") {
    return String(valor).replace(/\D/g, "");
  }
  return "";
}
