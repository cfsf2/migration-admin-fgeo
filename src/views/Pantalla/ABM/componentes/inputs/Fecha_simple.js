import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Label from "./LabelF";
import "react-datepicker/dist/react-datepicker.css";
//import "../filtros.scss";
import ar from "date-fns/locale/es";
import { parseISOString } from "../../../context/FuncionesContext";

import { TextField } from "@mui/material";
registerLocale("ar", ar);

function transformarFechaISOaMySQL(fechaISO) {
  try {
    if (
      fechaISO === null ||
      fechaISO === undefined ||
      fechaISO === "" ||
      isNaN(Date.parse(fechaISO))
    )
      return null;

    const fecha = new Date(fechaISO);
    const fechaMySQL = fecha.toISOString().replace("T", " ").replace("Z", "");
    return fechaMySQL;
  } catch (er) {
    console.log(er, fechaISO);
    return fechaISO;
  }
}

const FechaSimple = (props) => {
  const { id_a, setValor, valor, grid_span, error, setError, cab, data } =
    props;

  const def = data[cab.id_a + "_default"] ?? cab.default;
  const permite_null =
    data[cab.id_a + "_permite_null"] === "s" || cab.permite_null === "s";

  const [fecha, setFecha] = useState("");

  const styles = {
    gridColumn: grid_span,
  };

  function validaFormatoFecha(valor) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return regex.test(valor);
  }

  useEffect(() => {
    setFecha(parseISOString(valor));
    if (!valor && validaFormatoFecha(def)) {
      setFecha(parseISOString(def));
    }
  }, []);

  useEffect(() => {
    if (validaFormatoFecha(valor)) {
      setValor(transformarFechaISOaMySQL(valor));
    }
    if (!valor && def && validaFormatoFecha(def)) {
      setValor(def);
    }
  }, []);

  const handleChange = (date) => {
    if (!permite_null && date === null) return;
    setFecha(date);
    setError((e) => {
      return { ...e, [id_a]: false };
    });
    setValor(transformarFechaISOaMySQL(date));
  };

  return (
    <div style={styles}>
      <div
        className="filtro_grid_fecha"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Label
          label={cab.nombre}
          opcionales_null={cab.opcionales_null}
          permite_null={cab.permite_null}
        />
        <div style={{ display: "flex" }} className="fecha_simple_datepicker">
          <DatePicker
            timeFormat="p"
            timeIntervals={15}
            dateFormat={cab.fecha_formato}
            locale="ar"
            selected={fecha}
            value={fecha}
            showYearDropdown={true}
            placeholderText={cab.placeholder ?? cab.fecha_formato}
            onChange={handleChange}
            customInput={
              <TextField
                className={error[id_a] ? "filtro_fecha_input_error" : " w-100"}
                label={
                  cab.label && cab.label.trim() !== "" ? cab.label : undefined
                }
              />
            }
            // isClearable
            // withPortal
            autoComplete="off"
          />{" "}
          {permite_null ? (
            <div
              onClick={() => handleChange(null)}
              className="columna_input_date_null"
            >
              x
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FechaSimple;
