import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

const Email = () => {
  const [enviarMail, setEnviarMail] = useState(false);

  const handleClick = () => {
    setEnviarMail(true);
    window.alert("aca mandando un mail...");
  };
  return (
    <div className="flex_acciones_vista_email">
      <a onClick={handleClick} style={{ cursor: "pointer" }} title='Enviar email' >
        <FontAwesomeIcon icon={faAt} />
      </a>
    </div>
  );
};

export default Email;
