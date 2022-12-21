import React, { useReducer, useContext, createContext, useMemo } from "react";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import Pantalla from "../Pantalla";

export const initialState = {
  modales: [], // ejemplo : [{ id_a: "UN_MODAL", open: false, data: {}, zIndex }],
  zIndex: 8000,
};

export const ModalesContext = createContext();
export default ModalesContext;

export const ModalProvider = (props) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const abrirModal = (id_a, data) => {
    dispatch({ type: "OPEN_MODAL", payload: { id_a, data } });
  };

  const cerrarModal = (id_a) => {
    dispatch({ type: "CLOSE_MODAL", payload: { id_a } });
  };

  const addModal = ({ id_a, data, parametro_id }) => {
    dispatch({
      type: "ADD_MODAL",
      payload: {
        id_a,
        open: true,
        data,
        parametro_id,
        zIndex: state.modales.length + state.zIndex,
      },
    });
  };

  const getModal = (id_a) => {
    const modal = state.modales.find((m) => m.id_a === id_a);

    if (!modal) return {};
    return modal;
  };

  return (
    <ModalesContext.Provider
      value={useMemo(() => {
        return {
          state,
          modales: state.modales,
          zIndex: state.zIndex,
          abrirModal,
          cerrarModal,
          addModal,
          getModal,
          dispatch,
        };
      }, [state])}
    >
      {props.children}
    </ModalesContext.Provider>
  );
};

export const ModalReducer = (state, action) => {
  const ns = state.modales;
  let modal = {}; //ns.find((m) => m.id_a === action.payload.id_a);
  let mindex = ns.findIndex((m) => m.id_a === action.payload.id_a);

  switch (action.type) {
    case "ADD_MODAL":
      const nm = state.modales;
      nm.push(action.payload);
      return {
        ...state,
        modales: nm,
      };

    case "OPEN_MODAL":
      modal.open = true;
      modal.data = action.payload.data;
      ns[mindex] = modal;
      return {
        ...state,
        modales: ns,
        zIndex: state.zIndex + state.modales.length,
      };

    case "CLOSE_MODAL":
      ns.splice(mindex, 1);
      return {
        ...state,
        modales: ns,
      };

    default:
      return state;
  }
};

export const GestorModales = () => {
  const { cerrarModal, modales, zIndex } = useContext(ModalesContext);

  return modales.map((m, i) => {
    return (
      <Modal
        key={uuidv4()}
        open={m.open}
        modalContainerStyle={{}}
        zIndex={zIndex + i}
        handleClose={() => cerrarModal(m.id_a)}
        data={m.data}
      >
        {/* <PantallaModal pantalla={m.id_a} id={m.data.id} /> */}
      </Modal>
    );
  });
};
