import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { farmageo_api } from "../../config";
import store from "../store/index";
import { ALERT } from "./alertActions";
import authReducer from "../reducers/authReducer";

//******************** LABORATORIOS ********************************* */
export const ADD_LABORATORIO = (laboratorio, pantalla) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/laboratorios", laboratorio)
      .then(function (response) {
        dispatch(GET_LABORATORIOS());

        if (pantalla === "s") {
          window.location.replace(
            `${process.env.PUBLIC_URL}/#/configuracion/PANTALLA_ADMIN_LABORATORIOS`
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_LABORATORIOS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/laboratorios")
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_LABORATORIOS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_LABORATORIOS_ADMIN = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/laboratorios_admin")
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_LABORATORIOS",
          payload: { categorias: [], laboratorios: response.data },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_LABORATORIO = (laboratorio) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/laboratorios?id=" + laboratorio._id, laboratorio)
      .then(function (response) {
        dispatch(GET_LABORATORIOS());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//********************** DROGUERIAS ******************************* */
export const ADD_DROGUERIA = (drogueria) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/droguerias", {
        nombre: drogueria.nombre,
      })
      .then(function (response) {
        dispatch(GET_DROGUERIAS());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_DROGUERIAS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/droguerias")
      .then(function (response) {
        dispatch({
          type: "GET_DROGUERIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_DROGUERIAS_ADMIN = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/droguerias/admin")
      .then(function (response) {
        dispatch({
          type: "GET_DROGUERIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_DROGUERIA = (drogueria) => {
  return (dispatch) => {
    //console.log(drogueria);
    axios
      .put(farmageo_api + "/droguerias?id=" + drogueria._id, drogueria)
      .then(function (response) {
        dispatch(GET_DROGUERIAS_ADMIN());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//********************** PRODUCTOS ******************************* */
export const ADD_PRODUCTO_TRANSFER = (productosTransfers, instituciones) => {
  return (dispatch) => {
    return axios
      .post(farmageo_api + "/productosTransfers", {
        codigo: productosTransfers.codigo,
        laboratorioid: productosTransfers.laboratorioid,
        nombre: productosTransfers.nombre,
        presentacion: productosTransfers.presentacion,
        imagen: productosTransfers.imagen,
        cantidad_minima: parseInt(productosTransfers.cantidad_minima),
        descuento_porcentaje: productosTransfers.descuento_porcentaje,
        instituciones: instituciones,
      })
      .then(function (response) {
        if (response.status >= 400) {
          console.log("ERROR", productosTransfers.id);
        }

        dispatch(GET_PRODUCTOS_TRANSFERS());
        // dispatch(ALERT("Exito", "Producto Transfer Creado", "success", "OK"));
        return response;
      })
      .catch(function (error) {
        ALERT("Error", "Ha ocurrido un error", "error", ":(");
        console.log(error);
        return error;
      });
  };
};

export const ADD_PRODUCTO_TRANSFER_BULK = (
  productosTransfers,
  instituciones
) => {
  return (dispatch) => {
    return axios
      .post(farmageo_api + "/productosTransfers", {
        codigo: productosTransfers.codigo,
        laboratorioid: productosTransfers.laboratorioid,
        nombre: productosTransfers.nombre,
        presentacion: productosTransfers.presentacion,
        imagen: productosTransfers.imagen,
        cantidad_minima: parseInt(productosTransfers.cantidad_minima),
        descuento_porcentaje: productosTransfers.descuento_porcentaje,
        instituciones: instituciones,
        precio: productosTransfers.precio,
      })
      .then(function (response) {
        if (response.status >= 400) {
          console.log("ERROR", productosTransfers.id);
        }

        //dispatch(GET_PRODUCTOS_TRANSFERS());
        // dispatch(ALERT("Exito", "Producto Transfer Creado", "success", "OK"));
        return response;
      })
      .catch(function (error) {
        ALERT("Error", "Ha ocurrido un error", "error", ":(");
        console.log(error);
        return error;
      });
  };
};

export const GET_PRODUCTOS_TRANSFERS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/productosTransfers")
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_PRODUCTOS_TRANSFERS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_PRODUCTO_TRANSFER = (productosTransfers, instituciones) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/productosTransfers?id=" + productosTransfers._id, {
        productosTransfers,
        instituciones,
      })
      .then(function (response) {
        dispatch(GET_PRODUCTOS_TRANSFERS());
        dispatch(
          ALERT("Exito", "Los cambios han sido aceptados", "success", "OK")
        );
      })
      .catch(function (error) {
        ALERT("Error", "Ha ocurrido un error", "error", ":(");
        console.log(error);
      });
  };
};

export const SET_LABORATORIO_SELECTED = async (lab) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LABORATORIO_SELECTED",
      payload: lab,
    });
  };
};

export const GET_PRODUCTOS_TRANSFERS_BY_LAB = async (laboratorio) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LABORATORIO_SELECTED",
      payload: laboratorio,
    });
  };
};

export const CLEAN_PRODUCTOS = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_PRODUCTOS_TRANSFERS",
      payload: [],
    });
  };
};

export const DELETE_PRODUCTO_TRANSFER = (obj) => {
  return (dispatch) => {
    axios
      .delete(farmageo_api + "/productosTransfers/" + obj._id)
      .then(function (response) {
        dispatch(GET_PRODUCTOS_TRANSFERS());
      })
      .catch(function (error) {});
  };
};

export const DELETE_PRODUCTO_TRANSFER_BY_LAB = (id) => {
  return (dispatch) => {
    return axios
      .delete(farmageo_api + "/productosTransfers/laboratorio/" + id)
      .then(function (response) {
        dispatch(GET_PRODUCTOS_TRANSFERS());
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };
};

//********************** TRANSFERS ******************************* */
export const ADD_TRANSFER = (transfer, history) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/transfers", {
        ...transfer,
        version: "2",
      })
      .then(function (response) {
        if (response.status == 200) {
          history.push("/ConfirmacionPedido");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SET_TOTAL_AHORRO = ({ total, ahorro }) => {
  return (dispatch) => {
    dispatch({
      type: "SET_TOTAL_AHORRO",
      payload: { total, ahorro },
    });
  };
};

export const SET_PEDIDO = (newPedido) => {
  return (dispatch) => {
    dispatch({
      type: "SET_PEDIDO",
      payload: newPedido,
    });
  };
};

export const RESET_PEDIDO = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_PEDIDO",
      payload: [],
    });
  };
};

export const GET_TRANSFERS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/transfers")
      .then(function (response) {
        dispatch({
          type: "GET_TRANSFERS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const REENVIAR_EMAIL = async (id) => {
  console.log(id);
  return async (dispatch) => {
    return await axios.post(farmageo_api + "/transfers/enviarTransfer", { id });
  };
};

export const GET_TRANSFERS_FARMACIA = (farmaciaid) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/transfers/farmacia/" + farmaciaid)
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_TRANSFERS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_TRANSFER = (transfer) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/transfers?id=" + transfer._id, transfer)
      .then(function (response) {
        dispatch(GET_PRODUCTOS_TRANSFERS());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SUBMITTING = (value) => {
  return (dispatch) => {
    dispatch({
      type: "SUBMITTING",
      payload: value,
    });
  };
};
