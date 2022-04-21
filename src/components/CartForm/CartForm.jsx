import React, { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  EMAIL_REGEXP,
  MESSAGE_TYPES,
  ORDERS,
  PRODUCTS,
} from "../../constants/firebase-tables";
import { Button } from "react-bootstrap";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

export default function CartForm({
  cartContent,
  cleanCart,
  setOrderId,
  setShow,
}) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const generateOrder = (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      return;
    }

    const order = createOrder();
    sendOrder(order);
  };

  const isValidForm = () => {
    const { email, name, phone } = formData;

    if (!email || !name || !phone) {
      setErrorMessage(
        "Por favor diligencie los datos del formulario para continuar con la orden"
      );
      setShowError(true);
      return false;
    }

    if (!email.toLowerCase().match(EMAIL_REGEXP)) {
      setErrorMessage("Por favor ingrese un email válido");
      setShowError(true);
      return false;
    }

    setErrorMessage("");
    setShowError(false);
    return true;
  };

  const createOrder = () => {
    let order = {};

    order.buyer = formData;

    order.total = +cartContent.totalPrice.toFixed(2);
    order.date = new Date();

    order.items = cartContent.list.map(({ item, quantity }) => {
      const id = item.id;
      const title = item.title;
      const price = item.price * quantity;

      return { id, title, price, quantity };
    });

    return order;
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
      getDoc(product)
        .then((resp) => {
          updateDoc(product, { stock: resp.data().stock - item.quantity });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => setShowError(false);

  return (
    <>
      <form onSubmit={generateOrder}>
        <input
          type="text"
          name="name"
          placeholder="Ingrese su Nombre"
          value={formData.name}
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
      <MessagePopUp
        messageType={MESSAGE_TYPES.ERROR}
        show={showError}
        handleClose={handleClose}
        errorMessage={errorMessage}
      />
      ;
    </>
  );
}
