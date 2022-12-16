import React, { useReducer, useContext, createContext } from "react";
import Modal from "../components/Modal";

const initialState = {
  modales: [{ id_a: "UN_MODAL", open: false, data: {} }],
  zIndex: 1000,
};

const ModalesContext = createContext();
export default ModalesContext;

export const ModalProvider = (props) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const abrirModal = (id_a, data) => {
    dispatch({ type: "OPEN_MODAL", payload: { id_a, data } });
  };

  const cerrarModal = (id_a) => {
    dispatch({ type: "CLOSE_MODAL", payload: { id_a } });
  };

  return (
    <ModalesContext.Provider
      value={{ state, abrirModal, modales: state.modales, cerrarModal }}
    >
      {props.children}
    </ModalesContext.Provider>
  );
};

const ModalReducer = (state, action) => {
  const ns = state.modales;
  let modal = ns.find((m) => m.id_a === action.payload.id_a);
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
        zIndex: state.zIndex + 1,
      };

    case "CLOSE_MODAL":
      modal.open = false;
      ns[mindex] = modal;
      return {
        ...state,
        modales: ns,
        zIndex: state.zIndex - 1,
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
        open={m.open}
        modalContainerStyle={{}}
        zIndex={zIndex + i}
        handleClose={() => cerrarModal(m.id_a)}
        data={m.data}
      ></Modal>
    );
  });
};
