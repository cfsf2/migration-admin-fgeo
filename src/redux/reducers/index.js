import { combineReducers } from "redux";
import productoReducer from "./productoReducer";
import authReducer from "./authReducer";
import imageReducer from "./imageReducer";
import pedidosReducer from "./pedidosReducer";
import publicidadesReducer from "./publicidadesReducer";
import farmaciasAdminReducer from "./FarmaciasAdminReducer";
import denunciasReducer from "./denunciasReducer";
import tranfersReducer from "./tranfersReducer";
import packsproductosReducer from "./packsproductosReducer";
import reportOSReducer from "./reportOSReducer";
import debitospamiReducer from "./debitospamiReducer";
import userReducer from "./userReducer";

export default combineReducers({
  imageReducer,
  productoReducer,
  authReducer,
  pedidosReducer,
  publicidadesReducer,
  farmaciasAdminReducer,
  denunciasReducer,
  tranfersReducer,
  packsproductosReducer,
  reportOSReducer,
  debitospamiReducer,
  userReducer,
});
