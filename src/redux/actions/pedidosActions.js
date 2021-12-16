import axios from "axios";
import { errorParser } from "../../helpers/errorHelper";
import { farmageo_api } from "../../config";

export const GET_PEDIDOS = (idFarmacia) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/pedidos/farmacias/" + idFarmacia)
      .then(function (response) {
        dispatch({
          type: "GET_PEDIDOS",
          payload: response.data,
        });

        //console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
        alert("Ha ocurrido un error");
      });
  };
};

//no se usa
export const VER_PEDIDO = (pedido) => {
  return (dispatch) => {
    dispatch({
      type: "VER_PEDIDO",
      payload: pedido,
    });
  };
};

export const GET_INFO_SOCIO = (username) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/users/" + username)
      .then(function (response) {
        dispatch({
          type: "GET_INFO_SOCIO",
          payload: response.data,
        });
        //console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
        // alert('Ha ocurrido un error')
        dispatch({
          type: "GET_INFO_SOCIO",
          payload: {},
        });
      });
  };
};

export const UPDATE_PEDIDO = (pedido) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/pedidos?id=" + pedido._id, {
        username: pedido.username,
        fechaalta: pedido.fechaalta,
        fechamodificacion: pedido.fechamodificacion,
        fechaentrega: pedido.fechaentrega,
        descripcion: pedido.descripcion,
        comentarios: pedido.comentarios,
        estado: pedido.estado,
        idfarmacia: pedido.idfarmacia,
        nombrefarmacia: pedido.nombrefarmacia,
        idsocio: pedido.idsocio,
        habilitado: pedido.habilitado,
        envio: pedido.envio,
        costoenvio: pedido.costoenvio,
        domicilioenvio: pedido.domicilioenvio,
        pago_online: pedido.pago_online,
        gruposproductos: pedido.gruposproductos,
      })
      .then(async function (response) {
        //console.log(response.data);
        var login = await JSON.parse(localStorage.getItem("login"));

        if (login.user_rol.includes("admin")) {
          dispatch(GET_ALL_PEDIDOS_ADMIN());
        } else {
          dispatch(GET_PEDIDOS(pedido.idfarmacia));
        }

        alert("Se guardaron los cambios");
      })
      .catch(function (error) {
        console.log(error);
        alert("Ha ocurrido un error");
      });
  };
};

export const GET_ALL_PEDIDOS_ADMIN = (token) => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/pedidos")
      .then(function (response) {
        dispatch({
          type: "GET_PEDIDOS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        alert("Ha ocurrido un error");
      });
  };
};
