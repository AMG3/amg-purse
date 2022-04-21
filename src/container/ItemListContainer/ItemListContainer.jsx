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
import { PRODUCTS } from "../../constants/constants";
import Loader from "../../components/Loader/Loader";

function ItemListContainer() {
  const [products, setProducts] = useState(null);

  const { categoryId } = useParams();

  const setProductsFromResponse = (resp) => {
    if (resp.size === 0) {
      setProducts([]);
    }
    const products = resp.docs.map((product) => ({
      id: product.id,
      ...product.data(),
    }));
    setProducts(products);
  };

  useEffect(() => {
    const querydb = getFirestore();

    const queryCollection = collection(querydb, PRODUCTS);

    const getProductsFromFirebase = (query) => {
      getDocs(query)
        .then((resp) => {
          setProductsFromResponse(resp);
        })
        .catch((error) => console.error(error));
    };

    let queryRequest;

    if (categoryId) {
      queryRequest = query(
        queryCollection,
        where("category", "==", categoryId),
        where("stock", ">", 0)
      );
    } else {
      queryRequest = query(queryCollection, where("stock", ">", 0));
    }

    getProductsFromFirebase(queryRequest);
  }, [categoryId]);

  return (
    <div>
      {products && products.length > 0 ? (
        <ItemList products={products} />
      ) : products && products.length === 0 ? (
        <p>No hay productos de esta categoría</p>
      ) : (
        <Loader message="Cargando productos..." />
      )}
    </div>
  );
}

export default ItemListContainer;
