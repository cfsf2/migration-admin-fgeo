import React from "react";
import { connect } from "react-redux";
import Modal from "../../../../src/components/Modal";
import "../components/capturaWs.css";

import { NUEVO_REQUERIMIENTO } from "../../../../src/redux/actions/campanasAction";
import {
  UPDATE_USER_LOGUEADO,
  // UPDATE_LOCAL_USER,
} from "../../../../src/redux/actions/userActions";

const CapturaWs = (props) => {
  const [mostrar, setMostrar] = React.useState(false);
  const [state, setState] = React.useState({
    caracteristica: "",
    telefono: "",
  });

  const [error, setError] = React.useState(false);
  const campana = props.campana;
  const usuario = props.UsuarioReducer.usuario;
  const farmacia = props.farmacia;

  const [capturaExitosa, setCapturaExitosa] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const rexExp = new RegExp(
      /[a-z]|\s|\.|\+|\*|\?|\^|\$|\(|\)|\[|\]|\{|\}|\|\\|,|=|;|'|:|-|\/|\\|\||!|@|#|%|&|_|"/,
      "gi"
    );
    const esNumero = rexExp.test(value);
    if (esNumero) {
      return;
    }

    if (
      state.caracteristica.length + value.length > 10 &&
      name !== "caracteristica"
    )
      return;

    if (state.telefono.length + value.length > 10 && name !== "telefono")
      return;

    setState({
      ...state,
      [name]: value,
    });
  };

  const validacion = () => {
    if (
      state.caracteristica.trim() === "" ||
      state.telefono.trim() === "" ||
      state.caracteristica.length + state.telefono.length !== 10
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validacion()) {
      props
        .NUEVO_REQUERIMIENTO({
          id_campana: campana._id,
          id_usuario: usuario ? usuario._id : null,
          id_farmacia: farmacia ? farmacia._id : null,
          celular: unirTelefono(),
        })
        .then((res) => {
          setCapturaExitosa(true);

          setTimeout(() => {
            setMostrar(false);
          }, 2000);

          if (props.actulizarTel) {
            props.UPDATE_USER_LOGUEADO({
              telefono: unirTelefono(),
            });
          }

          if (campana.funcion_callback) {
            props[campana.funcion_callback]();
          }
        })
        .catch((err) => {
          console.log(err)
          alert("Ha ocurrido un error");
        });
    }
  };

  const unirTelefono = () => {
    const inputSeparado = [state.caracteristica, state.telefono];
    const inputUnico = inputSeparado.join("");

    return inputUnico;
  };

  React.useEffect(() => {
    console.log("--->", props.UsuarioReducer.load);
    props.UsuarioReducer.load && setMostrar(true);
  }, [props.UsuarioReducer.load]);

  React.useEffect(() => {
    if (props.UsuarioReducer.usuario && props.UsuarioReducer.usuario.telefono) {
      setState({
        caracteristica: props.UsuarioReducer.usuario.telefono
          ?.toString()
          .slice(0, 3),
        telefono: props.UsuarioReducer.usuario.telefono
          ?.toString()
          .slice(3, 10),
      });
    } else {
      setState({
        caracteristica: "",
        telefono: "",
      });
    }
  }, [props.UsuarioReducer, props.UsuarioReducer.usuario]);


  return (
    <Modal
      open={mostrar}
      handleClose={setMostrar}
      style={{ position: "fixed", left: "50%", minwidth: "500px" }}
    >
      <div className="modal-dialog modal-md ">
        <div className="modal-content">
          <div style={{ float: "right" }}></div>
          <div className="modal-body" align="left">
            {capturaExitosa ? (
              <div> En Breve nos comunicaremos con usted</div>
            ) : (
              <div className="alerta">
                <h3 style={{ textAlign: "center" }}>
                  <b>{campana.titulo}</b>
                </h3>
                <div className="div-imagen">
                  {campana.url_imagen_principal && (
                    <img
                      className="style-imagen"
                      src={campana.url_imagen_principal}
                    />
                  )}
                </div>
                <div className="form-row mt-1 pr-3 pl-3 form-position">
                  <div className="col-md-12 mb-1 pr-3 div-text">
                    <p style={{ textAlign: "center" }}>{campana.descripcion}</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row col-md-12 mb-1 pr-3 input-position">
                      <input
                        className="col-4 h-100 registro"
                        // type="number"
                        name="caracteristica"
                        placeholder="Sin 0"
                        value={state.caracteristica}
                        onChange={handleChange}
                      />
                      <input
                        className="col-7 h-100 registro"
                        // type="number"
                        name="telefono"
                        placeholder="Celular (sin 15)"
                        value={state.telefono}
                        onChange={handleChange}
                      />
                    </div>
                    {error || (usuario.telefono && usuario.telefono !== "") ? (
                      <p className="registro-alert">
                        Revise los datos ingresados &#128070;
                      </p>
                    ) : null}
                    <div className="form-row justify-content-center pt-3">
                      <button
                        type="submit"
                        className="btn btn-info"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    CampanaReducer: state.campanasReducer,
    UsuarioReducer: state.userReducer,
  };
};

const mapDispatchToProps = {
  NUEVO_REQUERIMIENTO,
  UPDATE_USER_LOGUEADO,
  //UPDATE_LOCAL_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(CapturaWs);
