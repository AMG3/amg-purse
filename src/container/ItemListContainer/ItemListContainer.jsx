import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList/ItemList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

function ItemListContainer() {
  const [productos, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const querydb = getFirestore();

    const queryCollection = collection(querydb, "productos");

    if (categoryId) {
      const q = query(
        queryCollection,
        where("category", "==", categoryId),
        where("stock", ">", 0)
      );
      getDocs(q).then((resp) => {
        if (resp.size === 0) {
          console.log("No hay productos de esta categoria");
          setProducts([]);
        }
        const prods = resp.docs.map((p) => ({ id: p.id, ...p.data() }));
        setProducts(prods);
      });
    } else {
      const q = query(queryCollection, where("stock", ">", 0));
      getDocs(q).then((resp) => {
        const prods = resp.docs.map((p) => ({ id: p.id, ...p.data() }));
        setProducts(prods);
      });
    }
  }, [categoryId]);

  return (
    <div>
      {productos.length > 0 ? (
        <ItemList productos={productos} />
      ) : productos.length === 0 ? (
        <p>No hay productos de esta categoría</p>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
}

export default ItemListContainer;
