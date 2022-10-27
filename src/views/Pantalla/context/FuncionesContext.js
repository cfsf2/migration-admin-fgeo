import React, { createContext, useContext } from "react";
import { Redirect, useHistory } from "react-router";
import { farmageo_api } from "../../../config";
import axios from "axios";
import AlertasContext from "./AlertaContext";
import PantallaContext from "./PantallaContext";
const S = require("sweetalert2");

const FuncionesContext = createContext();

export const ALERT = ({
  title,
  text,
  icon,
  confirmButtonText,
  timer = 5000,
  denyButtonText,
}) => {
  return S.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText && confirmButtonText,
    timer: timer,
    denyButtonText: denyButtonText && denyButtonText,
    showDenyButton: denyButtonText && true,
    allowOutsideClick: true,
    allowEscapeKey: true,
  });
};

const alertarError = async (mensaje) => {
  return ALERT({
    title: "Error",
    text: mensaje,
    icon: "error",
    timer: 10000,
    confirmButtonText: "Aceptar",
  });
};

export const requestErrorHandler = async (res) => {
  if (res.status < 400) return res;
  return alertarError(res.data.error.message);
};

export const FuncionesProvider = (props) => {
  const history = useHistory();
  const { ALERT } = useContext(AlertasContext);
  const { PantallaDispatch, pantalla } = useContext(PantallaContext);

  const pedirConfirmacion = async (props) => {
    return ALERT({
      title: "Confirmar",
      text: `Desea confirmar la accion?
      ${props?.advertencia ? props.advertencia : ""}
      `,
      icon: "question",
      denyButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    });
  };

  const alertarExito = async (res) => {
    return ALERT({
      title: "Exito",
      text: "La accion se ha completado con exito",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const superSubmit = async ({
    valor,
    id_a,
    update_id,
    handleCancelar,
    cab,
    data,
    indiceData,
  }) => {
    if (!update_id) {
      if (cab.alerta_confirmar === "s") {
        return await insertarConConfirmacion({
          valor,
          id_a,
          update_id,
          handleCancelar,
          cab,
          data,
          indiceData,
        });
      }

      return await insertarSinConfirmar({
        valor,
        id_a,
        update_id,
        handleCancelar,
        cab,
        data,
        indiceData,
      });
    }

    if (cab.alerta_confirmar === "s") {
      return await guardarConConfirmacion({
        valor,
        id_a,
        update_id,
        handleCancelar,
        cab,
        data,
        indiceData,
      });
    }
    return await guardarSinConfirmar({
      valor,
      id_a,
      update_id,
      handleCancelar,
      cab,
      data,
      indiceData,
    });
  };

  const guardarSinConfirmar = async (props) => {
    const { valor, id_a, update_id, handleCancelar, cab, data, indiceData } =
      props;
    return await guardar({
      valor,
      id_a,
      update_id,
      handleCancelar,
      cab,
      data,
      indiceData,
    })
      .then((res) => {
        if (res.status >= 400) {
          throw res;
        }

        if (cab.alerta_exito === "s") {
          alertarExito(res);
        }

        if (
          cab.refrescarConfiguracion &&
          cab.refrescarConfiguracion.trim() !== ""
        ) {
          console.log(cab.refrescarConfiguracion, "guardarSinConfirmar");
          refrescarConfiguracion({ cab });
        }
        return res;
      })
      .catch((err) => {
        handleCancelar();
        requestErrorHandler(err);
        throw err;
      });
  };

  const guardarConConfirmacion = async (props) => {
    return pedirConfirmacion().then(async (result) => {
      if (!result.isConfirmed) {
        props.handleCancelar();
        throw result;
      }
      return await guardarSinConfirmar(props);
    });
  };

  const insertarSinConfirmar = async (props) => {
    const { valor, id_a, update_id, handleCancelar, cab, data, indiceData } =
      props;
    return await insertar({
      valor,
      id_a,
      update_id,
      handleCancelar,
      cab,
      data,
      indiceData,
      insert_ids: data[cab.insert_ids_alias],
    })
      .then((res) => {
        if (res.status >= 400) {
          throw res;
        }
        if (cab.alerta_exito === "s") {
          alertarExito(res);
        }
        if (
          cab.refrescarConfiguracion &&
          cab.refrescarConfiguracion.trim() !== ""
        ) {
          refrescarConfiguracion({ cab });
        }
        return res;
      })
      .catch((err) => {
        handleCancelar();
        requestErrorHandler(err);
        throw err;
      });
  };

  const insertarConConfirmacion = async (props) => {
    return pedirConfirmacion().then(async (result) => {
      if (!result.isConfirmed) {
        props.handleCancelar();
        throw result;
      }
      return await insertarSinConfirmar(props);
    });
  };

  const guardar = async ({ valor, update_id, id_a }) => {
    if (!update_id || !id_a) {
      throw { message: "No hay update_id o id_a", id_a, update_id };
    }

    return await axios.post(farmageo_api + "/guardar", {
      valor,
      update_id,
      id_a,
    });
  };

  const guardarEP = async ({ data, cab, indiceData, handleCancelar }) => {
    const { id_a, update_id_alias } = cab;
    const update_id = data[update_id_alias];

    if (!update_id || !id_a) {
      throw { message: "No hay update_id o id_a", id_a, update_id };
    }

    try {
      axios
        .post(farmageo_api + "/guardar", {
          update_id,
          id_a,
        })
        .then((res) => {
          if (res.status >= 400) {
            requestErrorHandler(res);
            throw res.data;
          }
          if (cab.alerta_exito === "s") {
            alertarExito(res);
          }
          if (
            cab.refrescarConfiguracion &&
            cab.refrescarConfiguracion.trim() !== ""
          ) {
            refrescarConfiguracion({ cab });
          }
          return res;
        });
    } catch (err) {
      handleCancelar();
      requestErrorHandler(err);
      throw err;
    }
  };

  const insertar = async ({ valor, id_a, insert_ids }) => {
    return await axios.post(farmageo_api + "/insertar", {
      valor,
      id_a,
      insert_ids,
    });
  };

  const subirArchivo = async ({
    archivo,
    valor,
    handleCancelar,
    cab,
    data,
    indiceData,
  }) => {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("valor", valor);
    formData.append("insert_ids", data[cab.insert_ids_alias]);
    formData.append("update_id", data[cab.update_id_alias]);
    formData.append("id_a", cab.id_a);

    if (cab.alerta_confirmar === "s") {
      const confirmacion = await pedirConfirmacion();
      if (!confirmacion.isConfirmed) {
        handleCancelar();
      }
    }
    const ruta = !data[cab.update_id_alias] ? "/insertar" : "/guardar";

    return await axios
      .post(farmageo_api + ruta, formData)
      .then((res) => {
        if (res.status >= 400) {
          throw res;
        }
        if (cab.alerta_exito === "s") {
          alertarExito(res);
        }
        if (
          cab.refrescarConfiguracion &&
          cab.refrescarConfiguracion.trim() !== ""
        ) {
          refrescarConfiguracion({ cab });
        }
        return res;
      })
      .catch((err) => {
        handleCancelar();
        throw err;
      });
  };

  const eliminar = async ({ id_a, delete_id }) => {
    return await axios.post(farmageo_api + "/eliminar", {
      id_a,
      delete_id,
    });
  };

  const refrescarConfiguracion = async ({ cab }) => {
    const ids = cab.refrescarConfiguracion.split(",");
    ids.forEach((id) => {
      PantallaDispatch({ type: "REFRESCAR", payload: id.trim() });
    });
    return;
  };

  const getConfiguracion = async (id_a, id, params) => {
    params.pantalla = id_a;
    return axios.post(farmageo_api + "/config/" + pantalla, { id }, { params });
  };

  const checkID_A = (string) => {
    const regex = new RegExp("(^[A-Z]+(_[A-Z]+)*)$", "g");

    const esID_A = regex.test(string);
    return esID_A;
  };

  const ABMSubmit = async ({ opciones, id_a, id, params, setLoading }) => {
    const { endpoint, enlace_siguiente, alerta_exito, alerta_confirmar } =
      opciones;
    try {
      let confirmado = true;

      if (alerta_confirmar)
        confirmado = (await pedirConfirmacion(opciones)).isConfirmed;

      if (!confirmado) throw new Error({ message: "Cancelado" });

      setLoading(true);

      const res = await putConfiguracion(id_a, id, params, endpoint);

      setLoading(false);
      if (res.status > 400) {
        throw res.data;
      }
      if (alerta_exito) await alertarExito(res);
      if (enlace_siguiente) redireccionar({ cab: opciones, res });

      return res;
    } catch ({ error }) {
      return alertarError(error.message);
    }
  };

  const redireccionar = async ({ cab, data, res }) => {
    const enlace_siguiente_pasar_id = cab.enlace_siguiente_pasar_id === "s";
    const id_nombre = cab.update_id_nombre ?? "id";

    if (checkID_A(cab.enlace_siguiente)) {
      const location = {
        pathname: `/Configuracion/${cab.enlace_siguiente}`,
        search: enlace_siguiente_pasar_id
          ? `?&id=${res.data[id_nombre]}`
          : undefined,
      };

      return history.push(location);
    }

    return history.push({
      pathname: `${cab.enlace_siguiente}`,
    });
  };

  const putConfiguracion = async (id_a, id, body, endpoint = "/insertar") => {
    body.id_a = id_a;
    body.id = id;
    return axios.post(farmageo_api + endpoint, body);
  };

  const eliminarRegistro = async (props) => {
    const { data, cab, indiceData } = props;

    const result = await pedirConfirmacion({
      advertencia: "Esta accion no se puede deshacer",
    });

    if (!result.isConfirmed) {
      props.handleCancelar();
      throw result;
    }
    try {
      const response = await eliminar({
        id_a: cab.id_a,
        delete_id: data[cab.delete_id_alias],
      });

      if (response.status >= 400) {
        props.handleCancelar();
        return requestErrorHandler(response);
      }

      alertarExito(response);

      if (
        cab.refrescarConfiguracion &&
        cab.refrescarConfiguracion.trim() !== ""
      ) {
        refrescarConfiguracion({ cab });
      }
      return response;
    } catch (err) {
      ALERT({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return err;
    }
  };

  return (
    <FuncionesContext.Provider
      value={{
        insertar,
        insertarConConfirmacion,
        insertarSinConfirmar,
        guardarEP,
        guardar,
        guardarSinConfirmar,
        guardarConConfirmacion,
        refrescarConfiguracion,
        getConfiguracion,
        putConfiguracion,
        eliminarRegistro,
        requestErrorHandler,
        superSubmit,
        ABMSubmit,
        subirArchivo,
      }}
    >
      {props.children}
    </FuncionesContext.Provider>
  );
};

export default FuncionesContext;
