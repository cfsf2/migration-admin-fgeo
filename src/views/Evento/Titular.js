import React, { useState } from "react";

export const Titular = ({

  titular,
}) => {

  return (
    <div className="evento_container_telefono">
      <div className="evento_titular" >{titular.nombre}</div>
    </div>
  );
};
