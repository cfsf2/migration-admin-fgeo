import React, { useState, useContext, useRef } from "react";
import FuncionesContext from "../context/FuncionesContext";

const InputFile = ({ data, cab, campokey, indiceData }) => {
  const { subirArchivo } = useContext(FuncionesContext);
  const [imagenOnClick, setImagenOnClick] = useState();
  const [valor, setValor] = useState();

  const inputRef = useRef(null);

  const handleCancelar = () => {};

  const handleSubmit = (archivos) => {
    if (!archivos) return;
    const arrFiles = [...archivos];
    arrFiles.forEach((archivo) => {
      subirArchivo({ archivo, valor, handleCancelar, cab, data, indiceData });
    });
  };

  return (
    <>
      {
        <>
          <input
            type="file"
            multiple
            onChange={
              cab.archivo_subir_onclick === "s"
                ? (e) => {
                    setImagenOnClick(e.target.files);
                  }
                : (e) => {
                    handleSubmit(e.target.files);
                  }
            }
            ref={inputRef}
            style={{ display: "none" }}
          />
          <button onClick={() => inputRef.current.click()}>
            {cab.boton_texto ? cab.boton_texto : "Seleccionar archivos"}
          </button>
        </>
      }
      {cab.archivo_subir_onclick === "s" ? (
        <button onClick={() => handleSubmit(imagenOnClick)}>
          {cab.archivo_subir_onclick_texto
            ? cab.archivo_subir_onclick_texto
            : "Subir archivos"}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default InputFile;