import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { farmageo_api } from "../../config";

//******************** LABORATORIOS ********************************* */
export const ADD_LABORATORIO = (laboratorio) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/laboratorios", laboratorio)
      .then(function (response) {
        dispatch(GET_LABORATORIOS());
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
          payload: response.data.sort((a, b) =>
            a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
          ),
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
export const ADD_PRODUCTO_TRANSFER = (productosTransfers) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/productosTransfers", {
        codigo: productosTransfers.codigo,
        laboratorioid: productosTransfers.laboratorioid,
        nombre: productosTransfers.nombre,
        presentacion: productosTransfers.presentacion,
        imagen: productosTransfers.imagen,
        cantidad_minima: parseInt(productosTransfers.cantidad_minima),
        descuento_porcentaje: parseInt(productosTransfers.descuento_porcentaje),
      })
      .then(function (response) {
        dispatch(GET_PRODUCTOS_TRANSFERS());
      })
      .catch(function (error) {
        console.log(error);
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

export const UPDATE_PRODUCTO_TRANSFER = (productosTransfers) => {
  return (dispatch) => {
    axios
      .put(
        farmageo_api + "/productosTransfers?id=" + productosTransfers._id,
        productosTransfers
      )
      .then(function (response) {
        dispatch(GET_PRODUCTOS_TRANSFERS());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_PRODUCTOS_TRANSFERS_BY_LAB = (laboratorio) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/productosTransfers/laboratorio/" + laboratorio._id)
      .then(function (response) {
        //console.log(response.data);

        dispatch({
          type: "GET_PRODUCTOS_TRANSFERS",
          payload: response.data,
        });

        dispatch({
          type: "SET_LABORATORIO_SELECTED",
          payload: laboratorio,
        });
      })
      .catch(function (error) {
        console.log(error);
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//********************** TRANSFERS ******************************* */
export const ADD_TRANSFER = (transfer, history, html, destinatario) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/transfers", {
        ...transfer,
        destinatario:
          destinatario +
          ";transfers@farmageo.com.ar;santiagoalarcon2@hotmail.com",
        asunto: "Confirmación de pedido de Transfer",
        html,
        version: "2",
      })
      .then(function (response) {
        // dispatch(GET_TRANSFERS());
        // dispatch(SUBMITTING(false));
        if (response.status == 200) {
          history.push("/ConfirmacionPedido");
        } else {
          alert("ha ocurrido un error");
        }
      })
      .catch(function (error) {
        //dispatch(SUBMITTING(false));
        console.log(error);
        alert("ha ocurrido un error");
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
