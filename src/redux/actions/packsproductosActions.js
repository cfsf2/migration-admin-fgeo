import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { farmageo_api } from "../../config";

//******************** ENTIDADES ********************************* */
export const ADD_ENTIDAD = (entidad) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/entidades", entidad)
      .then(function (response) {
        dispatch(GET_ENTIDADES());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const DELETE_ENTIDAD = (entidadId) => {
  return (dispatch) => {
    axios
      .delete(farmageo_api + "/entidades/" + entidadId)
      .then(function (response) {
        dispatch(GET_ENTIDADES());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_ENTIDADES = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/entidades/entidadesAdmin")
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_ENTIDADES",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_ENTIDAD = (entidad) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/entidades?id=" + entidad._id, entidad)
      .then(function (response) {
        dispatch(GET_ENTIDADES());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//********************** CATEGORIAS ******************************* */
export const ADD_CATEGORIA = (categoria) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/categorias", categoria)
      .then(function (response) {
        dispatch(GET_CATEGORIAS());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_CATEGORIAS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/categorias")
      .then(function (response) {
        dispatch({
          type: "GET_CATEGORIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_CATEGORIAS_ADMIN = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/categorias/admin")
      .then(function (response) {
        dispatch({
          type: "GET_CATEGORIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_CATEGORIA = (categoria) => {
  return (dispatch) => {
    //console.log(drogueria);
    axios
      .put(farmageo_api + "/categorias?id=" + categoria._id, categoria)
      .then(function (response) {
        dispatch(GET_CATEGORIAS_ADMIN());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//********************** PRODUCTOS ******************************* */
export const ADD_PRODUCTO_PACK = (producto) => {
  return (dispatch) => {
    axios
      .post(farmageo_api + "/productospack", producto)
      .then(function (response) {
        dispatch(GET_PRODUCTOS_PACK());
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_PRODUCTOS_PACK = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/productospack/all")
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_PRODUCTOS_PACK",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_PRODUCTO_PACK = (producto) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/productospack?id=" + producto._id, producto)
      .then(function (response) {
        dispatch(GET_PRODUCTOS_PACK());
        return true;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const RECUPERAR_PRODUCTO_PACK = (producto) => {
  return axios
    .put(farmageo_api + "/productospack?id=" + producto._id, producto)
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GET_PRODUCTOS_PACK_BY_ENTIDAD = (entidad) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/productospack/entidad/" + entidad._id)
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_PRODUCTOS_PACK",
          payload: response.data,
        });

        dispatch({
          type: "SET_ENTIDAD_SELECTED",
          payload: entidad,
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
      type: "GET_PRODUCTOS_PACK",
      payload: [],
    });
  };
};

export const DELETE_PRODUCTO_PACK = (obj) => {
  return (dispatch) => {
    axios
      .delete(farmageo_api + "/productospack/" + obj._id)
      .then(function (response) {
        console.log("se borro el producto...");
        dispatch(GET_PRODUCTOS_PACK());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//********************** SOLICITUDES PROVEEDURIA ******************************* */
export const ADD_SOLICITUD_PROVEEDURIA = (
  solicitudproveeduria,
  history,
  html,
  destinatario
) => {
  return (dispatch) => {
    console.log(solicitudproveeduria);
    axios
      .post(farmageo_api + "/solicitudesproveeduria", {
        ...solicitudproveeduria,
        destinatario: destinatario + ";comercial@farmageo.com.ar;",
        asunto: "Confirmación de pedido a Proveeduria Nro ",
        html,
        version: "2",
      })
      .then(function (response) {
        // dispatch(GET_TRANSFERS());
        // dispatch(SUBMITTING(false));
        if (response.status == 200) {
          history.push("/ConfirmacionPedidoProveeduria");
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

export const GET_SOLICITUDES_PROVEEDURIA = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/solicitudesproveeduria")
      .then(function (response) {
        dispatch({
          type: "GET_SOLICITUDES_PROVEEDURIA",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_SOLICITUDES_PROVEEDURIA_FARMACIA = (farmaciaid) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/solicitudesproveeduria/farmacia/" + farmaciaid)
      .then(function (response) {
        //console.log(response.data);
        dispatch({
          type: "GET_SOLICITUDES_PROVEEDURIA",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_SOLICITUD_PROVEEDURIA = (solicitudproveeduria) => {
  return (dispatch) => {
    axios
      .put(
        farmageo_api + "/solicitudesproveeduria?id=" + solicitudproveeduria._id,
        solicitudproveeduria
      )
      .then(function (response) {
        dispatch(GET_PRODUCTOS_PACK());
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
