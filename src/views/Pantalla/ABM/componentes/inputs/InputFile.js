import React, { useState, useEffect, useRef } from "react";
import { useFiles } from "../../context/FileContext";

const InputFile = ({
  data,
  cab,
  campokey,
  indiceData,
  id_elemento,
  setValor,
  valor,
}) => {
  const { files, setFiles, limpiarArchivos } = useFiles();
  const [fileNames, setFileNames] = useState("");

  const inputRef = useRef(null);

  const classes = data[cab.id_a + "_className"] ?? cab.className;

  const handleCancelar = () => {
    limpiarArchivos(cab.id_a);
  };

  const handleSubmit = (archivos) => {
    if (!archivos) return;
    const arrFiles = [...archivos];
    let fnames = "";
    arrFiles.forEach((archivo) => {
      // subirArchivo({ archivo, valor, handleCancelar, cab, data, indiceData });
      fnames = fnames.concat(" | " + archivo.name);
    });
    try {
      setFileNames(() => fnames);
      if (cab.clave_envio && cab.clave_envio.trim() !== "") {
        return setFiles(archivos, cab.clave_envio + "|" + cab.id_a);
      }
      setFiles(archivos, cab.id_a);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const arrFiles = [...files];
    let fnames = "";
    arrFiles.forEach((archivo) => {
      // subirArchivo({ archivo, valor, handleCancelar, cab, data, indiceData });
      fnames = fnames.concat(" | " + archivo.name);
    });
    setFileNames(() => fnames);
  }, []);

  return (
    <>
      {
        <div
          id={id_elemento}
          style={{
            width: "100%",
            textAlign: cab.align,
            gridColumn: cab.grid_span,
          }}
        >
          <input
            type="file"
            value={valor}
            multiple
            onChange={(e) => {
              handleSubmit(e.target.files);
            }}
            ref={inputRef}
            style={{ display: "none" }}
          />
          <button className={classes} onClick={() => inputRef.current.click()}>
            {cab.boton_texto ? cab.boton_texto : "Seleccionar archivos"}
          </button>
          <div style={{ fontSize: "0.6rem" }}>{fileNames}</div>
        </div>
      }
    </>
  );
};

export default InputFile;
