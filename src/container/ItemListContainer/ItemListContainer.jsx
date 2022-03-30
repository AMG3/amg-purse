import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockProductos } from "../../mocks/productos";
import ItemList from "./ItemList/ItemList";

const taskProductos = new Promise((resolve, reject) => {
  setTimeout(() => resolve(mockProductos), 2000);
});

function ItemListContainer() {
  const [productos, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      taskProductos
        .then((resp) =>
          setProducts(resp.filter((prod) => prod.category === categoryId))
        )
        .catch((err) => console.log(err));
    } else {
      taskProductos
        .then((resp) => setProducts(resp))
        .catch((err) => console.log(err));
    }
  }, [categoryId]);

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
