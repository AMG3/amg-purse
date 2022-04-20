import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { ORDERS, PRODUCTS } from "../../constants/firebase-tables";
import { Button } from "react-bootstrap";

export default function CartForm({
  cartContent,
  cleanCart,
  setOrderId,
  setShow,
}) {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    phone: "",
  });

  const generateOrder = (e) => {
    e.preventDefault();

    let order = {};

    // Validar formulario

    order.buyer = formData;

    order.total = +cartContent.totalPrice.toFixed(2);
    order.date = new Date();

    order.items = cartContent.list.map(({ item, quantity }) => {
      const id = item.id;
      const title = item.title;
      const price = item.price * quantity;

      return { id, title, price, quantity };
    });

    sendOrder(order);
  };

  const sendOrder = (order) => {
    const db = getFirestore();

    const ordersCollection = collection(db, ORDERS);

    addDoc(ordersCollection, order)
      .then(({ id }) => {
        setOrderId(id);
        setShow(true);
        updateStock(order);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        cleanCart();
      });
  };

  const updateStock = ({ items }) => {
    const db = getFirestore();

    for (const item of items) {
      const product = doc(db, PRODUCTS, item.id);
      getDoc(product).then((resp) => {
        updateDoc(product, { stock: resp.data().stock - item.quantity });
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form onSubmit={generateOrder}>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese su Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Ingrese su Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="phone"
          name="phone"
          placeholder="Ingrese su Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button variant="warning" type="submit">
          Generar Orden
        </Button>
      </form>
    </>
  );
}
