import React, { useState, useEffect, useCallback } from "react";
import "./evento.scss";
import c from "./fiesta_farmaceutica.jpeg";
import Axios from "axios";
import { farmageo_api } from "../../config";
import { useLocation } from "react-router-dom";

import { Invitados } from "./Invitado";
import { Formulario } from "./Formulario";

export default function Evento(props) {
  const [usuarioInvitado, setUsuarioInvitado] = useState({
    cuit: "",
    matricula: "",
  });
  const location = useLocation();
  const [farmacia, setFarmacia] = useState({});

  const [invitados, setInvitados] = useState([]);

  const [confirmoAsistencia, setConfirmoAsistencia] = useState(false);
  const [titular, setTitular] = useState({});
  const [evento, setEvento] = useState({});

  const handleAddInvitados = (invitado) => {
    Axios.post(farmageo_api + "/usuario_invitado/add", {
      usuario: invitado,
      farmacia,
    }).then((res) =>
      setInvitados((s) => {
        const ns = [...s];
        ns.push(res.data);
        return ns;
      })
    );
  };

  const handleEliminarInvitado = (uuid) => {
    setInvitados((s) => {
      const ns = [...s];
      const ons = ns.filter((n) => n.token !== uuid);
      return ons;
    });

    Axios.post(farmageo_api + "/usuario_invitado/delete", {
      usuario: { token: uuid },
      farmacia,
    }).then((res) => console.log(res));
  };

  const handleForm = (e) => {
    e.preventDefault();

    Axios.post(farmageo_api + "/usuario_invitado", {
      usuario: usuarioInvitado,
    }).then((res) => {
      setFarmacia(res.data);
      setInvitados(res.data.invitados);
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
        setUsuarioInvitado({
          cuit: res.data.cuit,
          matricula: res.data.matricula,
        });
        setInvitados(res.data.invitados);
        const titular = res.data.invitados
          .filter((i) => i.titular === "s")
          .pop();
        setTitular(titular);
        setConfirmoAsistencia(titular.confirmo_asistencia === "s");
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
    });
  };

  useEffect(() => {
    getEvento();
    if (urlParams.get("token")) {
      getInvitados();
    }
  }, []);

  return (
    <>
      {" "}
      <div className="fondo_evento"></div>
      <div className="main_evento">
        <Header />
        <Formulario
          usuarioInvitado={usuarioInvitado}
          setUsuarioInvitado={setUsuarioInvitado}
          handleSubmit={handleForm}
          confirmarAsistencia={confirmarAsistencia}
          confirmoAsistencia={confirmoAsistencia}
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
