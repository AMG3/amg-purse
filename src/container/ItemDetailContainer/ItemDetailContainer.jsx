import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail/ItemDetail";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { PRODUCTS } from "../../constants/firebase-tables";

export default function ItemDetailContainer() {
  const isMounted = useRef(false);
  const [item, setItem] = useState({});

  const { id } = useParams();

  useEffect(() => {
    isMounted.current = true;

    if (id) {
      const querydb = getFirestore();
      const queryProd = doc(querydb, PRODUCTS, id);
      getDoc(queryProd).then((resp) => {
        if (isMounted.current) {
          setItem({ id: resp.id, ...resp.data() });
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  });

  return item ? <ItemDetail item={item} /> : <p>No encontrado...</p>;
}
