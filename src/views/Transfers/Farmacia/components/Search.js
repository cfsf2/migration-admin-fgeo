import React from "react";
import { ordenar } from "./ListadoProductos";
import { Input } from "reactstrap";

export default function Search(props) {
  const { setProductos, allproducts } = props;
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(() => searchTerm);
    console.log("buscaste algo?");
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
    debugger;
  };

  return (
    <div className="transfer_search">
      <Input
        name="search"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}
