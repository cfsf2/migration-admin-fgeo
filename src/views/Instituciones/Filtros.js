import React from "react";

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

  React.useEffect(() => {
    if (
      listado.length === 0 ||
      (listado.length < 10 && search.trim() !== "" && search.length > 1)
    ) {
      (async () => {
        await props.SEARCH_INSTITUCIONES(search, 10).then((res) => {
          console.log(res);
          setListado(() => Ordenar(res, "nombre", search));
        });
      })();
      return;
    }
  }, [search]);

  return (
    <>
      <Input
        type="text"
        placeholder="buscar institucion..."
        name="filtro"
        className="instituciones_buscar"
        onChange={handleFilterSearch}
        value={search}
      />
    </>
  );
}
