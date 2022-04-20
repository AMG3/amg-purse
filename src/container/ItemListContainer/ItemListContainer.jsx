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
import { PRODUCTS } from "../../constants/firebase-tables";

function ItemListContainer() {
  const [products, setProducts] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    const querydb = getFirestore();

    const queryCollection = collection(querydb, PRODUCTS);

    if (categoryId) {
      const q = query(
        queryCollection,
        where("category", "==", categoryId),
        where("stock", ">", 0)
      );
      getDocs(q)
        .then((resp) => {
          if (resp.size === 0) {
            setProducts([]);
          }
          const prods = resp.docs.map((p) => ({ id: p.id, ...p.data() }));
          setProducts(prods);
        })
        .catch((error) => console.error(error));
    } else {
      const q = query(queryCollection, where("stock", ">", 0));
      getDocs(q)
        .then((resp) => {
          if (resp.size === 0) {
            setProducts([]);
          }
          const prods = resp.docs.map((p) => ({ id: p.id, ...p.data() }));
          setProducts(prods);
        })
        .catch((error) => console.error(error));
    }
  }, [categoryId]);

  return (
    <div>
      {products && products.length > 0 ? (
        <ItemList products={products} />
      ) : products && products.length === 0 ? (
        <p>No hay productos de esta categoría</p>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
}

export default ItemListContainer;
