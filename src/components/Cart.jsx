import { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartList from "./CartList/CartList";
import { PRODUCTS } from "../constants/firebase-tables";

function Cart() {
  const { cartContent, cleanCart, removeFromCart } = useCartContext();

  const [orderId, setOrderId] = useState(null);
  const [show, setShow] = useState(false);
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

    const ordersCollection = collection(db, "orders");

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

  const handleClose = () => setShow(false);

  return (
    <>
      {cartContent.list.length <= 0 ? (
        <>
          <p>No hay nada en el carro</p>
          <Link to={`/`}>
            <Button variant="primary">Seguir Comprando</Button>
          </Link>
        </>
      ) : (
        <Container>
          <CartList cartContent={cartContent} removeFromCart={removeFromCart} />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outline-warning" onClick={cleanCart}>
              Limpiar Carro
            </Button>
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
          </div>
        </Container>
      )}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Orden Generada</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Su orden fue generada con el código: <strong>{orderId}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default Cart;
