import React from "react";

export function Hidden({ setValor, valor, id_elemento, cab, data }) {
  const def = data[cab.id_a + "_default"] ?? cab.default;

  if (!valor && def) {
    setValor(def);
  }

  return <></>;
}

export default Hidden;
