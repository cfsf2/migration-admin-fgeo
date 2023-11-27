import React, { useCallback } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Label from "./LabelF";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core";
import ar from "date-fns/locale/es";
import { TextField } from "@mui/material";
import "../filtros.scss";
registerLocale("ar", ar);

const useStyle = makeStyles({
  dateComponent: {
    "& .MuiInputBase-input": {
      height: "1.55em",
      padding: "16.5px 14px",
    },
  },
  inputDate: {
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    },
  },
});

function parseISOString(s) {
  if (!s) return;
  var b = s.split(/\D+/).filter((b) => b);

  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const Fecha = (props) => {
  const {
    id_a,
    setFiltrosAAplicar,
    filtrosAAplicar,
    operador,
    componente,
    grid_span,
    error,
    setError,
  } = props;

  const parseFecha = useCallback((fecha) => {
    if (!fecha) return [null];

    try {
      if (Array.isArray(JSON.parse(fecha))) {
        let fechas = JSON.parse(fecha);

        if (fechas[0]) fechas[0] = parseISOString(fechas[0]);
        if (fechas[1]) fechas[1] = parseISOString(fechas[1]);
        return fechas;
      }
      return [parseISOString(fecha)];
    } catch (e) {
      return [parseISOString(fecha)];
    }
  }, []);

  const startDate = parseFecha(filtrosAAplicar[id_a])[0];

  const endDate = parseFecha(filtrosAAplicar[id_a])[1];

  const styles = {
    gridColumn: grid_span,
   // height: "82.3px",
  };

  const classes = useStyle();
  
  return (
      <div>
        <Label
          label={props.nombre}
          opcionales_null={props.opcionales_null}
          permite_null={props.permite_null}
        />
        <div className="filtro_grid_fecha">
          <DatePicker
            className="fecha_input"
            showTimeSelect={
              operador !== "fecha" && /HH|mm|ss/.test(props.fecha_formato)
            }
            timeFormat="p"
            timeIntervals={15}
            dateFormat={props.fecha_formato?.toString() ?? "dd/MM/yyyy"}
            locale="ar"
            selected={filtrosAAplicar[id_a] ? startDate : null}
            onChange={(date) => {
              //setStartDate(date);
              setError((e) => {
                return { ...e, [id_a]: false };
              });
              setFiltrosAAplicar((prevState) => {
                if (!date?.toISOString().trim()) {
                  return { ...prevState, [id_a]: "" };
                }
                if (componente === "fecha_simple") {
                  return {
                    ...prevState,
                    [id_a]: date?.toISOString(),
                  };
                }

                let fechas = [];
                if (prevState[id_a]) {
                  fechas = JSON.parse(prevState[id_a]);
                }
                fechas[0] = date?.toISOString();

                return {
                  ...prevState,
                  [id_a]: JSON.stringify(fechas),
                };
              });
            }}
            selectsStart
            startDate={filtrosAAplicar[id_a] ? startDate : null}
            endDate={filtrosAAplicar[id_a] ? endDate : null}
            customInput={
              <TextField
                className={`${classes.dateComponent} ${classes.inputDate}`}
                //style={{ marginTop: props.label ? "6.1px" : "0px" }}
                label="Desde"
              />
            }
            isClearable
            withPortal
          />
          {componente === "fecha_simple" ? null : (
            <DatePicker
              className="fecha_input"
              showTimeSelect={
                operador !== "fecha" && /HH|mm|ss/.test(props.fecha_formato)
              }
              timeFormat="p"
              timeIntervals={15}
              dateFormat={props.fecha_formato?.toString() ?? "dd/MM/yyyy"}
              locale="ar"
              selected={filtrosAAplicar[id_a] ? endDate : null}
              onChange={(date) => {
                //setEndDate(date);
                setFiltrosAAplicar((prevState) => {
                  let fechas = [];

                  if (prevState[id_a]) {
                    fechas = JSON.parse(prevState[id_a]);
                  }

                  fechas[1] = date?.toISOString();

                  return {
                    ...prevState,
                    [id_a]: JSON.stringify(fechas),
                  };
                });
              }}
              selectsEnd
              startDate={filtrosAAplicar[id_a] ? startDate : null}
              endDate={filtrosAAplicar[id_a] ? endDate : null}
              minDate={filtrosAAplicar[id_a] ? startDate : null}
              customInput={
                <TextField
                  label="Hasta"
                  className={`${classes.dateComponent} ${classes.inputDate}`}
                  //style={{ marginTop: "6.1px" }}
                />
              }
              isClearable
              withPortal
            />
          )}
        </div>
      </div>
  );
};

export default Fecha;
