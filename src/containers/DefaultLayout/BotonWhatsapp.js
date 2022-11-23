import React from "react";
import "../../containers/DefaultLayout/defaultheader.css";


const BotonWhatsapp = () => {
  return (
    <div className="ca-whatsapp">
      <a
        href="https://api.whatsapp.com/send?phone=543412104056"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-wp"
        title="Consúltanos por Whatsapp"
      >
        <i class="fa fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default BotonWhatsapp;
