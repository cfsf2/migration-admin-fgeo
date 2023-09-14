import React, { useState, useEffect, useCallback } from "react";
import "./evento.scss";
import c from "./fiesta_farmaceutica.jpeg";
import Axios from "axios";
import { farmageo_api } from "../../config";
import { useLocation } from "react-router-dom";

import Swal from "sweetalert2";

import { Invitados } from "./Invitado";
import { Formulario } from "./Formulario";

export default function Evento(props) {
  const [usuarioInvitado, setUsuarioInvitado] = useState({
    cuit: "",
    matricula: "",
    id_evento_forma_pago: "",
  });
  const location = useLocation();
  const [farmacia, setFarmacia] = useState({});

  const [invitados, setInvitados] = useState([]);

  const [confirmoAsistencia, setConfirmoAsistencia] = useState(false);
  const [titular, setTitular] = useState({});
  const [evento, setEvento] = useState({});
  const [total, setTotal] = useState({});

  const handleAddInvitados = (invitado) => {
    Axios.post(farmageo_api + "/usuario_invitado/add", {
      usuario: invitado,
      farmacia,
    }).then((res) =>
      setInvitados((s) => {
        const ns = [...s];
        ns.push(res.data);
        calcularTotal(ns);
        return ns;
      })
    );
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
      farmacia,
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

    Axios.post(farmageo_api + "/usuario_invitado", {
      usuario: usuarioInvitado,
    }).then((res) => {
      setFarmacia(res.data);
      setInvitados(res.data.invitados);
      if (res.data.invitados.length > 0) {
        calcularTotal(res.data.invitados);
      }
      const _titular = res.data.invitados
        .filter((i) => i.titular === "s")
        .pop();
      setTitular(_titular);
    });
    // Aquí puedes manejar la lógica del formulario, como enviar los datos al servidor.
  };
  const urlParams = new URLSearchParams(location.search);

  const getInvitados = useCallback(
    () =>
      Axios.post(farmageo_api + "/usuario_invitado", {
        usuario: {
          token: urlParams.get("token"),
        },
      }).then((res) => {
        setFarmacia(res.data);

        setInvitados(res.data.invitados);
        if (res.data.invitados.length > 0) {
          calcularTotal(res.data.invitados);
        }
        const _titular = res.data.invitados
          .filter((i) => i.titular === "s")
          .pop();
        setTitular(_titular);
        setUsuarioInvitado({
          ...usuarioInvitado,
          cuit: res.data.cuit,
          matricula: res.data.matricula,
          id_evento_forma_pago: _titular.id_evento_forma_pago ?? "",
        });

        setConfirmoAsistencia(_titular.confirmo_asistencia === "s");
      }),
    [urlParams]
  );
  const getEvento = useCallback(
    () =>
      Axios.post(farmageo_api + "/usuario_invitado/evento").then((res) => {
        setEvento(res.data);
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

  const handleConfirmarPago = () => {
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
      const formularioEvento = document.querySelector('.formulario_evento');

      if (formularioEvento) {
        // Desplazarse hacia el elemento utilizando scrollIntoView
        formularioEvento.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }, []);

  return (
    <>
      {" "}
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
            evento={evento}
            total={total}
            invitados={invitados}
            addInvitado={handleAddInvitados}
            handleConfirmarPago={handleConfirmarPago}
          />
          {invitados?.length > 0 ? (
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
        </div>
      </div>
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
