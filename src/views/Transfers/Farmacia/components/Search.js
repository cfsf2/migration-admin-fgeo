import React from "react";
import { ordenar } from "./ListadoProductos";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  CardImg,
  Label,
  CardFooter,
} from "reactstrap";

export default function Search(props) {
  const { setProductos, allproducts } = props;
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    let filteredProds = [];

    const startsWithProducts = allproducts.filter((prod) =>
      prod.nombre.toLowerCase().startsWith(searchTerm)
    );
    ordenar(startsWithProducts, "nombre", 1);
    let includesProducts = [];
    if (searchTerm.length > 1) {
      includesProducts = allproducts.filter((prod) => {
        return prod.nombre.toLowerCase().includes(searchTerm);
      });
    }
    ordenar(includesProducts, "nombre", 1);
    filteredProds = filteredProds.concat(startsWithProducts);
    filteredProds = filteredProds.concat(includesProducts);
    filteredProds = new Set(filteredProds);
    filteredProds = Array.from(filteredProds);

    setProductos(() => filteredProds);
  };

  return (
    <div className="transfer_search">
      <Input
        name="search"
        type="text"
        placeholder="Buscar..."
        onChange={handleChange}
      />
    </div>
  );
}
