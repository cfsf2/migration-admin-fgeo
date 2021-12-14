import React from "react";
import axios from "axios";
import { farmageo_api } from "../../config";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Table,
} from "reactstrap";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export const Ordenar = (array, key, termino) => {
  const empiezaCon = [...array].filter((item) => {
    return item[key].toLowerCase().startsWith(termino.toLowerCase());
  });
  const incluye = [...array].filter((item) => {
    return item[key].toLowerCase().includes(termino.toLowerCase());
  });
  const result = new Set(empiezaCon.concat(incluye));
  const arrayResult = Array.from(result);

  return arrayResult;
};

export default function Filtros(props) {
  const { listado, setListado } = props;
  const allInstituciones = props.institucionesReducer.instituciones;

  const [search, setSearch] = React.useState("");
  const [madre, setMadre] = React.useState();

  //Busqueda de opciones para el autocomplete
  const [madreListado, setMadreListado] = React.useState([]);
  const [habilitada, setHabilitada] = React.useState();
  const [madreSearch, setMadreSearch] = React.useState();
  const [auto, setAuto] = React.useState();

  const handleFilterSearch = (e) => {
    const value = e.target.value;
    setSearch(() => value);

    if (value.trim() === "") {
      setListado(() => allInstituciones);
      return;
    }
    const arrayResult = Ordenar(allInstituciones, "nombre", value);
    setListado(() => arrayResult);
  };

  const handleMadreSearch = async (e) => {
    const value = e.target.value;
    setMadreSearch(() => value);

    await axios(farmageo_api + "/instituciones/search", {
      params: {
        search: value.trim(),
        limit: 10,
      },
    }).then((res) => setMadreListado(() => res.data));
  };

  const handleHabilitadaSearch = (e) => {
    if (e.target.value === "todas") {
      setHabilitada(() => null);
      return;
    }
    const value = Boolean(e.target.value);
    setHabilitada(() => value);
  };

  React.useEffect(() => {
    if (
      listado.length === 0 ||
      (listado.length < 10 && search.trim() !== "" && search.length > 1) ||
      madre ||
      habilitada ||
      !habilitada
    ) {
      (async () => {
        await props
          .SEARCH_INSTITUCIONES(search, 10, habilitada, madre?.id)
          .then((res) => {
            setListado(() => Ordenar(res, "nombre", search));
          });
      })();

      return;
    }
  }, [search, madre, habilitada]);

  React.useEffect(() => {
    (async () => {
      await props
        .SEARCH_INSTITUCIONES(search, 10, [], madre?.id)
        .then((res) => {
          setListado(() => Ordenar(res, "nombre", search));
          setMadreListado(() => res);
        });
    })();
    return;
  }, []);

  return (
    <>
      <div className="instituciones_container">
        <div className="instituciones_container_titulo">Filtros</div>
        <div className="instituciones_filtros">
          <TextField
            type="text"
            placeholder="buscar institucion..."
            name="filtro"
            className="instituciones_filtros_buscar"
            onChange={handleFilterSearch}
            value={search}
            label="Buscar"
          />
          <Autocomplete
            className="instituciones_filtros_madre"
            getOptionLabel={(option) => option.name}
            options={madreListado.map((inst) => {
              return { id: inst._id, name: inst.nombre };
            })}
            renderInput={(params) => (
              <TextField
                label={"Institucion Madre"}
                {...params}
                onChange={handleMadreSearch}
                value={madreSearch}
              />
            )}
            onChange={(e, newMadre) => {
              if (!newMadre) {
                newMadre = " ";
              }
              setMadre(() => newMadre);
            }}
            value={madre}
          />
          <FormControl className="instituciones_filtros_habilitada">
            <InputLabel id="habilitada">Habilitada</InputLabel>
            <Select
              value={habilitada}
              label="Habilitadas"
              onChange={handleHabilitadaSearch}
              label="Habilitada"
              labelId="habilitada"
            >
              <MenuItem value={"todas"}>Todas</MenuItem>
              <MenuItem value={true}>Si</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}
