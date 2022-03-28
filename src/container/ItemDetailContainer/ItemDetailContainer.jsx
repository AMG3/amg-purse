import React, { useEffect, useState } from "react";
import { mockProductos } from "../../mocks/productos";
import ItemDetail from "./ItemDetail/ItemDetail";

const taskProductos = new Promise((resolve, reject) => {
  setTimeout(() => resolve(mockProductos), 2000);
});

export default function ItemDetailContainer({ id }) {
  const [item, setItem] = useState({});

  useEffect(() => {
    taskProductos
      .then((resp) => setItem(resp.find((prod) => prod.id === 1)))
      .catch((err) => console.log(err));
  });

  return <ItemDetail item={item} />;
}
