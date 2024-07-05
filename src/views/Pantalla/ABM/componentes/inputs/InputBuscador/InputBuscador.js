import React, { useContext, useState, useEffect } from "react";
import { withTools } from "../../../../helper/withTools";
import FuncionesContext from "../../../../context/FuncionesContext";
import ModalesContext from "../../../../context/ModalContext";
import TextField from "@mui/material/TextField";
import ABMContext from "../../../context/ABMContext";
import Axios from "axios";
import { farmageo_api } from "../../../../../../config";

const InputBuscador = (props) => {
  const { data, cab, qsBody, valor, setValor, campokey } = props;
  const {
    seleccion_multiple,
    columna_ida_valor,
    columna_ida_mostrar,
    filtro_ida_valor,
    pantalla_ida,
    filtro_ida_recuperacion,
  } = cab;

  // const { superSubmit } = useContext(FuncionesContext);

  const [termino, setTermino] = useState(valor);
  const value = data[campokey];
  const [select_data, setSelectData] = useState({});
  const [disable, setdisabled] = useState();

  const handleInput = (e) => {
    const { value } = e.target;
    setTermino(value);
  };

  const { enviarAModal } = useContext(FuncionesContext);
  const { cerrarModal } = useContext(ModalesContext);
  const { valorFormulario } = useContext(ABMContext);

  const filtro = {
    [filtro_ida_valor]: termino, // filtro id_a a pasar al listado "MONODRO_LST_FILTRO_NOMBRE"
  };

  //pasar como filtro
  // eslint-disable-next-line no-unused-expressions
  cab.pasar_input_como_filtro?.split(",").forEach((ida, i) => {
    if (valorFormulario) {
      filtro[cab.filtros_ida?.split(",")[i]] = valorFormulario[ida];
    }
  });

  class handleSubmit {
    // const data_send = data_selected.map((d) => {
    //   return d[columna_ida_valor];
    // });
    constructor(e, row, data_selected) {
      this.data_selected = data_selected;
      this.row = row;
      this.event = e;
    }

    static submitMultiple(data_selected) {
      setValor(data_selected);
      cerrarModal(pantalla_ida);
    }

    static submitSimple() {
      cerrarModal(pantalla_ida);
    }
  }

  const opMultiple = {
    listado_seleccion: "s",
    showSelectAllCheckbox: false,
    showTextRowsSelected: false,
    onSelectionChange: (rowData) => {
      // const noid = rowData.map((o) => o[columna_ida_valor]); // columna a setear como value "MONODRO_LST_ID"
      setTermino(rowData.map((t) => t[columna_ida_mostrar]).toString()); // columnda a mostrar "MONODRO_LST_NOMBRE"
      //funcion de guardar
      setSelectData(() => {
        return rowData;
      });
    },
    listado_filtro_termino: termino,
    filtrosDesdeInput: filtro,
    activarListado: !!termino,
    iniciar_activo: "n",
    submit_button: true,
    submit_texto: "Seleccionar",
    submit_button_handleSubmit: handleSubmit.submitMultiple,
  };

  const opSimple = {
    onRowClick: (e, rowData, data) => {
      const noid = rowData[columna_ida_valor]; // columna a setear como value
      setTermino(rowData[columna_ida_mostrar]); // columnda a mostrar
      setValor(noid);
      setSelectData(noid);
    },
    onRowDoubleClick: (e, rowData) => {
      const noid = rowData[columna_ida_valor]; // columna a setear como value
      setTermino(rowData[columna_ida_mostrar]); // columnda a mostrar
      setValor(noid);
      setSelectData(noid);
      cerrarModal(pantalla_ida);
    },
    rowStyle: true,
    listado_filtro_termino: termino,
    filtrosDesdeInput: filtro,
    activarListado: !!termino,
    // activarListado: "s",
    iniciar_activo: "n", // como en realidad llama a la pantalla, el atributo inicial del listado es quien prevalece
    submit_button: true,
    submit_texto: "Seleccionar",
    submit_button_handleSubmit: handleSubmit.submitSimple, //handleSubmit.submitSimple,
  };

  const showModal = () => {
    enviarAModal(
      pantalla_ida, // Listado para abrir "PANTALLA_LIST_MONODRO"
      {},
      seleccion_multiple === "s" ? opMultiple : opSimple,
      qsBody
    );
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      showModal();
    }
  };

  useEffect(() => {
    const componentIsMounted = { current: true }; // Utilizar una referencia mutable

    const fetchData = async () => {
      try {
        if (
          value &&
          value !== "" &&
          filtro_ida_recuperacion &&
          filtro_ida_recuperacion !== ""
        ) {
          setdisabled(true);
          const filtros = {
            [filtro_ida_recuperacion]: value,
            activarListado: "s",
          };

          const response1 = await Axios.post(
            farmageo_api + "/ib/" + pantalla_ida,
            { ...Object.assign(filtros, qsBody) },
            { params: filtros }
          );

          // Verificar si el componente está montado antes de realizar más operaciones
          if (!componentIsMounted.current) return;

          const term =
            response1.data.configuraciones[0].datos[0][columna_ida_mostrar];
          const valor =
            response1.data.configuraciones[0].datos[0][columna_ida_valor];

          setValor(valor);
          setTermino(() => term);
          setdisabled(() => false);
        } else {
          setdisabled(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Manejar el error según sea necesario
      }
    };

    fetchData();

    return () => {
      componentIsMounted.current = false;
    };
  }, [columna_ida_mostrar, filtro_ida_recuperacion, pantalla_ida, value]);

  const disabled = (() => {
    if (data[cab.id_a + "_disabled"]) {
      return data[cab.id_a + "_disabled"] === "s";
    }
    if (cab.disabled) {
      return cab.disabled === "s";
    }
    return false;
  })();

  return (
    <div id={cab.id_a} style={{ display: "flex" }}>
      {cab.nombre ? (
        <div className="vista_label vista_label_fuente">{cab.nombre}:</div>
      ) : (
        <></>
      )}
      <div className="filtroBuscador">
        {disabled ? (
          <>
            <TextField
              value={termino}
              style={{ width: "80%", padding: "0 0" }}
              type="text"
              variant="outlined"
              label={props.label}
              disabled
            />
          </>
        ) : (
          <>
            <TextField
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              value={termino}
              style={{ width: "80%", padding: "0 0" }}
              type="text"
              variant="outlined"
              label={props.label}
              onClick={
                cab.buscar_onClick === "s" ? () => showModal() : () => {}
              } // Abre modal on click o bien deja usar el input
              // onClick={() => showModal()}
            />

            <button onClick={() => showModal()} className="InputBusquedaLupa">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default withTools(InputBuscador);
