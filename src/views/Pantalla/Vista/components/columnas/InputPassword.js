import React, { useState, useContext } from "react";
import FuncionesContext from "../../../context/FuncionesContext";
import VistaContext from "../../context/VistaContext";

const InputPassword = ({ data, cab, hijos, campokey, id_elemento }) => {
  const { guardarSinConfirmar, guardarConConfirmacion } =
    useContext(FuncionesContext);

  const { datos, VistaDispatch } = useContext(VistaContext);

  const [value, setValue] = useState("");
  const [valueConfirmar, setValueConfirmar] = useState("");
  const [error, setError] = useState(false);
  const [lastValue, setLastvalue] = useState(data[campokey]);

  const nombre = (() => {
    if (cab.nombre_alias) {
      return data[cab.nombre_alias];
    }
    return cab.nombre;
  })();

  const {
    pass_minimo,
    pass_maximo,
    pass_req_mayuscula,
    pass_req_numero,
    pass_confirmar,
  } = cab;

  const handleInput = (e) => {
    const valor = e.target.value;
    setValue(valor);
  };

  const handleInputConfirmar = (e) => {
    const valorConfirmar = e.target.value;
    setValueConfirmar(valorConfirmar);
  };

  const handleCancelar = () => {
    setValue("");
    setLastvalue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiereMayusc = /(?=.*[A-Z])/;
    const requiereNum = /(?=.*\d)/;

    if (
      value.trim() === "" ||
      value.length < pass_minimo ||
      (pass_maximo && value.length > pass_maximo) ||
      (pass_req_mayuscula === "s" && !requiereMayusc.test(value)) ||
      (pass_req_numero === "s" && !requiereNum.test(value))
    ) {
      //console.log("avhe el error", value.length);
      //console.log("pass: ", value);

      return setError(true);
    }
    //console.log("todo pago con la 1ra pass: ", value);
    setError(false);

    if (pass_confirmar === "s") {
      if (valueConfirmar.trim() === "" || valueConfirmar !== value) {
        //console.log("fijate la passConfirmar amigo: ", valueConfirmar);
        return setError(true);
      }
      console
        .log
        // `${value} = ${valueConfirmar}la pass y la confirmacion están ok: ${value} = ${valueConfirmar}`
        ();
      return setError(false);
    }

    //funcion guardar, ojo que no tiene campo asignado!

    const update_id = data[cab.update_id_alias];
    const { id_a } = cab;

    if (cab.alerta_confirmar === "s") {
      return guardarConConfirmacion({
        valor: value,
        update_id,
        id_a,
        handleCancelar,
        refrescar: cab.refrescarConfiguracion,
      }).then((result) => {
        setLastvalue(value);
        return result;
      });
    }

    return guardarSinConfirmar({
      valor: value,
      update_id,
      id_a,
      handleCancelar,
      refrescar: cab.refrescarConfiguracion,
    }).then(() => {
      setLastvalue(value);
    });
  };

  return (
    <form
      id={id_elemento}
      onSubmit={handleSubmit}
      className="tarjeta_grid_item_label_item"
    >
      {nombre ? <label className="vista_label">{nombre}:</label> : <></>}
      <input type="password" value={value} onChange={handleInput} />
      {pass_confirmar === "s" && (
        <>
          <label>Confirme su {nombre}: </label>
          <input
            type="password"
            value={valueConfirmar}
            onChange={handleInputConfirmar}
          />
        </>
      )}
      <button type="submit" style={{ marginLeft: "10px" }}>
        Confirmar
      </button>
      {error ? <p style={{ color: "red" }}>tene' algo mal maestro...</p> : null}
    </form>
  );
};

export default InputPassword;
