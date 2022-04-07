import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockProductos } from "../../mocks/productos";
import ItemDetail from "./ItemDetail/ItemDetail";

const taskProductos = new Promise((resolve, reject) => {
  setTimeout(() => resolve(mockProductos), 2000);
});

export default function ItemDetailContainer() {
  const [item, setItem] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      taskProductos
        .then((resp) => setItem(resp.find((prod) => prod.id === id)))
        .catch((err) => console.error(err));
    }
  });

  return item ? <ItemDetail item={item} /> : <p>No encontrado...</p>;
}
