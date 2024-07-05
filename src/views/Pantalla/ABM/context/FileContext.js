import React, { createContext, useContext, useState } from "react";

// Crea un contexto
const FileContext = createContext();

// Un componente proveedor que almacena las referencias a los archivos
function FileProvider({ children }) {
  const [files, setFiles] = useState([]);

  // Función para agregar un archivo a la lista de archivos
  const addFile = (file) => {
    setFiles([...files, file]);
  };

  const setArchivos = (_files, id_a) => {
    const arrFiles = [..._files];
    const files = arrFiles.map((f, i) => {
      return {
        file: _files[i],
        id_a,
      };
    });
    setFiles(files);
  };

  const limpiarArchivos = (id_a) => {
    const arrFiles = [...files].filter((f) => f.id_a !== id_a);
    setFiles(arrFiles)
  };

  return (
    <FileContext.Provider value={{ files, addFile, setFiles: setArchivos, limpiarArchivos }}>
      {children}
    </FileContext.Provider>
  );
}

// Un gancho personalizado para acceder al contexto
function useFiles() {
  return useContext(FileContext);
}

export { FileProvider, useFiles };
