import axios from "axios";
import { farmageo_api, wp_api_auth } from "../../config";
import { ALERT } from "./alertActions";
const URL = farmageo_api;

// Falta implemwp_api_authentar.
const VALIDAR_TOKEN = async () => {
  var token = await localStorage.getItem("token");
  axios
    .get(
      URL + "/wp-json/wp/v2/users",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response.status === 200) {
        console.log("ok");
      }
    })
    .catch(function (error) {});
};

export const GET_FARMACIAS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/farmacias", {})
      .then(function (response) {
        // console.log(response);
        dispatch({
          type: "GET_FARMACIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const CHEQUEAR_SI_EXISTE = (farmaciaid) => {
  return async (dispatch) => {
    axios
      .get(farmageo_api + "/farmacias/matricula/" + farmaciaid, {})
      .then(function (response) {
        if (response.data.length !== 0) {
          // alert('La matrícula ya existe')
          dispatch({
            type: "CHEQUEAR_SI_EXISTE",
            payload: {
              yaExiste: true,
              msj:
                "La matrícula ya fue cargada para la farmacia " +
                response.data.nombre,
            },
          });
        } else {
          dispatch({
            type: "CHEQUEAR_SI_EXISTE",
            payload: {
              yaExiste: false,
              msj: "La matrícula aún no ha sido utilizada",
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("ha ocurrido un error");
      });
  };
};

export const ALTA_USUARIO_SUBMIT = (
  farmacia,
  login,
  history,
  permisos,
  perfil,
  instituciones
) => {
  return async (dispatch) => {
    var token = await localStorage.getItem("token");
    var emailDefault = login.username.toLowerCase() + "@farmageoapp.com.ar";
    axios
      .post(farmageo_api + "/users/alta-usuario", {
        username: login.username,
        password: login.password,
        name: farmacia.nombre,
        first_name: "farmacia",
        last_name: farmacia.nombre,
        email: emailDefault,
        roles: ["farmacia"],
        farmaciaId: farmacia.matricula, // id unica de farmacia
        perfil: perfil,
        permisos: permisos,
      })
      .then((response) => {
        if (response.status == "201" || response.status == "200") {
          dispatch(
            ALTA_USER_API_FARMAGEO(
              farmacia,
              login,
              history,
              perfil,
              instituciones
            )
          );
        } else {
          alert("Ha ocurrido un error");
        }
      })
      .catch((error) => {
        if (error.message) {
          console.log(error.message);
          alert("Ha ocurrido un error");
        }
      });
  };
};

const ALTA_USER_API_FARMAGEO = (
  farmacia,
  login,
  history,
  perfil,
  instituciones
) => {
  var username = farmacia.usuario.includes("@")
    ? farmacia.usuario.toLowerCase()
    : farmacia.usuario.toUpperCase();

  return (dispatch) => {
    axios
      .post(
        farmageo_api + "/farmacias",
        {
          usuario: username,
          nombrefarmaceutico: farmacia.nombrefarmaceutico,
          matricula: farmacia.matricula,
          localidad: farmacia.localidad,
          nombre: farmacia.nombre,
          cp: farmacia.cp,
          cuit: farmacia.cuit,
          cufe: farmacia.cufe,
          email: farmacia.email.toLowerCase(),
          telefono: farmacia.telefono,
          calle: farmacia.calle,
          provincia: farmacia.provincia,
          farmaciaid: farmacia.matricula,
          productos: [],
          horarios: [],
          pedidos: [],
          promociones: [],
          mediospagos: [],
          servicios: [],
          nohagoenvios: true,
          habilitado: true,
          imagen: "",
          costoenvio: 0,
          tiempotardanza: "15 minutos",
          numero: parseInt(farmacia.numero),
          direccioncompleta: "",
          lat: "",
          log: "",
          password: login.password,
          perfil,
          instituciones,
        },
        { timeout: 10000 }
      )
      .then((response) => {
        if (response.status == "200") {
          dispatch(GET_FARMACIAS);
          ALERT(
            "",
            "Se agregó una nueva farmacia correctamente",
            "success",
            "Yay!"
          );
          history.push("/farmaciasAdmin");
        } else {
          ALERT("Ha ocurrido un error", "", "error", ":(");
        }
      })
      .catch((error) => {
        if (error.message) {
          console.log(error.message);
        }
      });
  };
};

export const GET_USUARIOS_APP = () => {
  return async (dispatch) => {
    axios
      .get(farmageo_api + "/users/")
      .then(function (response) {
        // console.log(response);
        dispatch({ type: "GET_USUARIOS_APP", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_PASSWORDS_FARMACIAS = () => {
  return async (dispatch) => {
    var user = await localStorage.getItem("user");
    var pass = await localStorage.getItem("pass");
    axios
      .post(farmageo_api + "/farmacias/admin/passwords", {
        usuario: user,
        password: pass,
      })
      .then(function (response) {
        dispatch({
          type: "GET_PASSWORDS_FARMACIAS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const SET_HABILITADO_USUARIO = (usuario) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/users?id=" + usuario._id, {
        _id: usuario._id,
        admin: usuario.admin,
        deleted: usuario.deleted,
        dni: usuario.dni,
        email: usuario.email,
        esfarmacia: usuario.esfarmacia,
        habilitado: usuario.habilitado,
        name: usuario.name,
        newsletter: usuario.newsletter,
        obras_sociales: usuario.obras_sociales,
        telephone: usuario.telephone,
        usuario: usuario.usuario,
      })
      .then(function (response) {
        console.log(response);
        dispatch(GET_USUARIOS_APP());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_FARMACIA_ADMIN = (farmacia) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/farmacias/?username=" + farmacia.usuario, {
        _id: farmacia.id,
        usuario: farmacia.usuario,
        nombrefarmaceutico: farmacia.nombrefarmaceutico,
        matricula: farmacia.matricula,
        localidad: farmacia.localidad,
        nombre: farmacia.nombre,
        cp: farmacia.cp,
        calle: farmacia.calle,
        provincia: farmacia.provincia,
        farmaciaid: farmacia.farmaciaid,
        direccioncompleta: farmacia.direccioncompleta,
        lat: farmacia.lat,
        log: farmacia.log,
        productos: farmacia.productos,
        pedidos: farmacia.pedidos,
        promociones: farmacia.promociones,
        mediospagos: farmacia.mediospagos,
        servicios: farmacia.servicios,
        fechaalta: farmacia.fechaalta,
        habilitado: farmacia.habilitado,
        imagen: farmacia.imagen,
        costoenvio: farmacia.costoenvio,
        tiempotardanza: farmacia.tiempotardanza,
        numero: farmacia.numero,
        email: farmacia.email,
        facebook: farmacia.facebook,
        instagran: farmacia.instagran,
        web: farmacia.web,
        telefonofijo: farmacia.telefonofijo,
        whatsapp: farmacia.whatsapp,
        ubicacion: farmacia.ubicacion,
        nohagoenvios: farmacia.nohagoenvios,
        horarios: farmacia.horarios,
        papeleraProductos: farmacia.papeleraProductos,
        descubrir: farmacia.descubrir,
        visita_comercial: farmacia.visita_comercial,
      })
      .then(function (response) {
        if (response.status === 201) {
          dispatch(GET_FARMACIAS());
        } else {
          alert("ha ocurrido un error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UPDATE_FARMACIA_ADMIN_RESPONSE = (farmacia) => {
  return (dispatch) => {
    axios
      .put(farmageo_api + "/farmacias/?username=" + farmacia.usuario, {
        _id: farmacia.id,
        usuario: farmacia.usuario,
        nombrefarmaceutico: farmacia.nombrefarmaceutico,
        matricula: farmacia.matricula,
        localidad: farmacia.localidad,
        nombre: farmacia.nombre,
        cp: farmacia.cp,
        calle: farmacia.calle,
        provincia: farmacia.provincia,
        farmaciaid: farmacia.farmaciaid,
        direccioncompleta: farmacia.direccioncompleta,
        lat: farmacia.lat,
        log: farmacia.log,
        productos: farmacia.productos,
        pedidos: farmacia.pedidos,
        promociones: farmacia.promociones,
        mediospagos: farmacia.mediospagos,
        servicios: farmacia.servicios,
        fechaalta: farmacia.fechaalta,
        habilitado: farmacia.habilitado,
        imagen: farmacia.imagen,
        costoenvio: farmacia.costoenvio,
        tiempotardanza: farmacia.tiempotardanza,
        numero: farmacia.numero,
        email: farmacia.email,
        facebook: farmacia.facebook,
        instagran: farmacia.instagran,
        web: farmacia.web,
        telefonofijo: farmacia.telefonofijo,
        whatsapp: farmacia.whatsapp,
        ubicacion: farmacia.ubicacion,
        nohagoenvios: farmacia.nohagoenvios,
        horarios: farmacia.horarios,
        papeleraProductos: farmacia.papeleraProductos,
        descubrir: farmacia.descubrir,
        visita_comercial: farmacia.visita_comercial,
      })
      .then(function (response) {
        if (response.status === 201) {
          dispatch(GET_FARMACIAS());
          return response;
        } else {
          alert("ha ocurrido un error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GET_ALL_DENUNCIAS = () => {
  return (dispatch) => {
    axios
      .get(farmageo_api + "/denuncias")
      .then(function (response) {
        console.log(response);
        dispatch({ type: "GET_ALL_DENUNCIAS", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
