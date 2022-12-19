import React, { useReducer, useContext, createContext, useMemo } from "react";
import Modal from "../components/Modal";
import PantallaModal from "../PantallaModal";
import { v4 as uuidv4 } from "uuid";
import Pantalla from "../Pantalla";

const initialState = {
  modales: [], // ejemplo : [{ id_a: "UN_MODAL", open: false, data: {} }],
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
      value={useMemo(() => {
        return {
          state,
          abrirModal,
          modales: state.modales,
          cerrarModal,
          dispatch,
        };
      }, [state])}
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
        <Pantalla p={m.id_a} i={m.data.id} />
        {/* <PantallaModal pantalla={m.id_a} id={m.data.id} /> */}
      </Modal>
    );
  });
};
