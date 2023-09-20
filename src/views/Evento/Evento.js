import React, { useState, useEffect, useCallback } from "react";
import "./evento.scss";
import c from "./fiesta_farmaceutica.jpeg";
import Axios from "axios";
import { farmageo_api } from "../../config";
import { useLocation } from "react-router-dom";

import Swal from "sweetalert2";

import { Invitados } from "./Invitado";
import { Formulario } from "./Formulario";
import { BloquePago } from "./BloquePago";

export default function Evento(props) {
  const [usuarioInvitado, setUsuarioInvitado] = useState({
    cuit: "",
    matricula: "",
    id_evento_forma_pago: "",
  });
  const location = useLocation();

  const [invitados, setInvitados] = useState([]);
  const [error, setError] = useState(false);

  const [confirmoAsistencia, setConfirmoAsistencia] = useState(false);
  const [confirmoTelefono, setConfirmoTelefono] = useState(false);
  const [titular, setTitular] = useState({});
  const [evento, setEvento] = useState({});
  const [total, setTotal] = useState(0);

  const handleAddInvitados = (invitado) => {
    try {
      Axios.post(farmageo_api + "/usuario_invitado/add", {
        usuario: invitado,
        titular,
      }).then((res) =>
        setInvitados((s) => {
          const ns = [...s];
          ns.push(res.data);
          calcularTotal(ns);
          return ns;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEliminarInvitado = (uuid) => {
    setInvitados((s) => {
      const ns = [...s];
      const ons = ns.filter((n) => n.token !== uuid);
      calcularTotal(ons);
      return ons;
    });

    Axios.post(farmageo_api + "/usuario_invitado/delete", {
      usuario: { token: uuid },
      titular,
    }).then((res) => console.log(res));
  };

  const calcularTotal = (invitados) => {
    const _total = invitados.reduce((acc, i) => {
      return acc + i.costo;
    }, 0);
    setTotal(_total);
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (usuarioInvitado.cuit.toString().length < 7) {
      return setError(() => true);
    }
    setError(false);

    Axios.post(farmageo_api + "/usuario_invitado", {
      usuario: usuarioInvitado,
    }).then((res) => {
      if (res.status > 400) {
        return Swal.fire({
          text: res.data.message,
          icon: "error",
          timer: 3000,
        });
      }

      const invitados = res.data.invitados;
      invitados.push(res.data);
      if (invitados.length > 0) {
        calcularTotal(invitados);
      }

      const _titular = res.data;

      setInvitados((s) => {
        calcularTotal(invitados);
        return invitados;
      });
      setTitular(_titular);
    });
  };
  const urlParams = new URLSearchParams(location.search);

  const getInvitados = useCallback(
    () =>
      Axios.post(farmageo_api + "/usuario_invitado", {
        usuario: {
          token: urlParams.get("token"),
        },
      }).then((res) => {
        setInvitados(res.data.invitados);
        if (res.data.invitados.length > 0) {
          calcularTotal(res.data.invitados);
        }
        const _titular = res.data;
        setTitular(_titular);
        setInvitados((s) => {
          const ns = [...s];
          ns.push(res.data);
          calcularTotal(ns);
          return ns;
        });
        setUsuarioInvitado({
          ...usuarioInvitado,
          cuit: res.data.cuit,
          matricula: res.data.matricula,
          id_evento_forma_pago: _titular.id_evento_forma_pago ?? "",
          token: _titular.token,
        });

        setConfirmoAsistencia(_titular.confirmo_asistencia === "s");
      }),
    [urlParams]
  );
  const getEvento = useCallback(
    () =>
      Axios.post(farmageo_api + "/usuario_invitado/evento").then((res) => {
        const fecha_inicio = new Date(res.data.evento.fecha_inicio_campana);
        const fecha_fin = new Date(res.data.evento.fecha_fin_campana);
        const hoy = new Date(Date.now());

        // Verificar si la fecha3 está entre fecha1 y fecha2
        if (hoy >= fecha_inicio && hoy <= fecha_fin) {
          setEvento(res.data);
          return;
        } else {
          window.location.href = "#/login";
        }
      }),
    [urlParams]
  );

  const confirmarAsistencia = (e) => {
    const { checked } = e.target;
    setConfirmoAsistencia((s) => {
      return !s;
    });
    Axios.post(farmageo_api + "/usuario_invitado", {
      usuario: { id: titular.id, confirmo_asistencia: checked ? "s" : "n" },
    }).then((res) => {
      if (checked) {
        Swal.fire({
          title: "Gracias por confirmar su asistencia al evento!",
          icon: "success",
          timer: 3000,
        });
      }
    });
  };

  const confirmarTelefono = (telefono) => {
    const patron = /^\d{10}$/;
    const esCelular = patron.test(telefono);

    if (!esCelular) {
      return Swal.fire({
        title: "El numero debe tener 10 digitos exactos.",
        icon: "error",
        timer: 3000,
      });
    }
    setConfirmoTelefono((s) => true);
    Axios.post(farmageo_api + "/usuario_invitado", {
      usuario: { id: titular.id, telefono: telefono },
    }).then((res) => {
      if (res.status > 400) {
        return Swal.fire({
          title: "Ocurrio un Error",
          text: res.data.message,
          icon: "Error",
          timer: 3000,
        });
      }
      Swal.fire({
        title: "Su numero de telefono fue actualizado",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const handleConfirmarPago = () => {
    if (!usuarioInvitado.id_evento_forma_pago) {
      return Swal.fire({
        title: "Debe seleccionar una forma de Pago",
        icon: "error",
        timer: 3000,
      });
    }
    Axios.post(farmageo_api + "/usuario_invitado", {
      usuario: {
        id: titular.id,
        id_evento_forma_pago: usuarioInvitado.id_evento_forma_pago,
      },
    }).then((res) => {
      Swal.fire({
        title: "El metodo de pago ha sido confirmado",
        icon: "success",
        timer: 3000,
      });
    });
  };

  useEffect(() => {
    getEvento();
    if (urlParams.get("token")) {
      getInvitados();
    }
    setTimeout(() => {
      // Obtener una referencia al elemento con la clase "formulario_evento"
      const formularioEvento = document.querySelector(".formulario_evento");

      if (formularioEvento) {
        // Desplazarse hacia el elemento utilizando scrollIntoView
        formularioEvento.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  }, []);

  return (
    <>
      {evento.evento?.id ? (
        <div className="fondo_evento">
          <div className="main_evento">
            <Header />
            <Formulario
              usuarioInvitado={usuarioInvitado}
              setUsuarioInvitado={setUsuarioInvitado}
              handleSubmit={handleForm}
              confirmarAsistencia={confirmarAsistencia}
              confirmoAsistencia={confirmoAsistencia}
              titular={titular}
              setTitular={setTitular}
              evento={evento}
              total={total}
              invitados={invitados}
              addInvitado={handleAddInvitados}
              handleConfirmarPago={handleConfirmarPago}
              confirmoTelefono={confirmoTelefono}
              setConfirmoTelefono={setConfirmoTelefono}
              confirmarTelefono={confirmarTelefono}
              error={error}
              setError={setError}
            />
            {confirmoTelefono && invitados?.length > 0 ? (
              <div className="evento_body">
                <Invitados
                  invitados={invitados}
                  addInvitado={handleAddInvitados}
                  eliminarInvitado={handleEliminarInvitado}
                  confirmoAsistencia={confirmoAsistencia}
                  confirmarAsistencia={confirmarAsistencia}
                  setConfirmoAsistencia={setConfirmoAsistencia}
                />
              </div>
            ) : (
              <></>
            )}
            {confirmoTelefono && confirmoAsistencia ? (
              <div style={{ padding: 0 }} className="cont_bloque_pago">
                <BloquePago
                  usuarioInvitado={usuarioInvitado}
                  setUsuarioInvitado={setUsuarioInvitado}
                  evento={evento}
                  total={total}
                  handleConfirmarPago={handleConfirmarPago}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="fondo_evento"></div>
      )}
    </>
  );
}

const Header = () => {
  return (
    <header className="header_evento">
      <div className="d-flex flex-column">
        <img alt="invitacion" src={c} />
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="evento_footer">
      Por cualquier inconveniente o consulta no dude en comunicarse al
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://wa.me/543415010022"
        style={{ margin: "0 5px" }}
      >
        3415010022
      </a>{" "}
      de Lunes a viernes de 8 hs a 16 hs. Recuerde que desde este número de
      celular le enviaremos por whatsapp los QR para el ingreso al evento
    </footer>
  );
};
