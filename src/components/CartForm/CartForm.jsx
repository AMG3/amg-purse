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
} from "../../constants/constants";
import { Button } from "react-bootstrap";
import MessagePopUp from "../MessagePopUp/MessagePopUp";
import Loader from "../Loader/Loader";

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
  const [isLoading, setIsLoading] = useState(false);

  const generateOrder = (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      return;
    }

    setIsLoading(true);

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
        setIsLoading(false);
        setOrderId(id);
        setShow(true);
        updateStock(order);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      })
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
      <h3>Datos del cliente</h3>
      <form
        onSubmit={generateOrder}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Ingrese su Nombre"
            value={formData.name}
            className="form-input"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Ingrese su Email"
            value={formData.email}
            className="form-input"
            onChange={handleChange}
          />
          <input
            type="phone"
            name="phone"
            placeholder="Ingrese su Teléfono"
            value={formData.phone}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button variant="success" type="submit">
            Generar Orden
          </Button>
        </div>
      </form>
      <br />
      {isLoading ? <Loader message="Generando orden..." /> : <></>}
      <MessagePopUp
        messageType={MESSAGE_TYPES.ERROR}
        show={showError}
        handleClose={handleClose}
        errorMessage={errorMessage}
      />
    </>
  );
}
