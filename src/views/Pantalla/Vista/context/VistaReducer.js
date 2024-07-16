export default function Vistareducer(state, action) {
  switch (action.type) {
    case "SET_DATOS":
      return {
        ...state,
        datos: action.payload,
      };
    case "SET_CABECERAS":
      return {
        ...state,
        cabeceras: action.payload,
      };
    case "SET_OPCIONES":
      return {
        ...state,
        opciones: action.payload,
      };
    case "SET_DATO_ESPECIFICO":
      try {
        const { value, indiceData, key } = action.payload;

        const nuevosDatos = state.datos;

        nuevosDatos[indiceData][key] = value;
        return {
          ...state,
          datos: nuevosDatos,
        };
      } catch (err) {
        console.log("SET_DATO_ESPECIFICO error: ",err);
        return { ...state };
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export const initialState = {
  datos: [],
  cabeceras: [],
  opciones: {},
};
