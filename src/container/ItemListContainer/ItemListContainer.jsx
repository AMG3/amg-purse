import { useState } from "react";
import { mockProductos } from "../../mocks/productos";
import ItemList from "./ItemList/ItemList";

const taskProductos = new Promise((resolve, reject) => {
  setTimeout(() => resolve(mockProductos), 2000);
});

function ItemListContainer() {
  const [productos, setProducts] = useState([]);

  taskProductos
    .then((productos) => setProducts(productos))
    .catch((e) => console.error(e));

  return (
    <div>
      {productos.length > 0 ? (
        <ItemList productos={productos} />
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
}

export default ItemListContainer;
