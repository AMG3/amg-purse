import { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Col, Row, Container, Button, Image, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function Cart() {
  const { cartContent, cleanCart, removeFromCart } = useCartContext();

  const [orderId, setOrderId] = useState(null);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    phone: "",
  });

  const generarOrden = (e) => {
    e.preventDefault();

    let orden = {};

    // Validar formulario

    orden.buyer = formData;

    orden.total = +cartContent.precioTotal.toFixed(2);
    orden.date = new Date();

    orden.items = cartContent.list.map(({ item, cantidad }) => {
      const id = item.id;
      const title = item.title;
      const precio = item.price * cantidad;

      return { id, title, precio, cantidad };
    });

    sendOrder(orden);
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
      const product = doc(db, "productos", item.id);
      getDoc(product).then((resp) => {
        updateDoc(product, { stock: resp.data().stock - item.cantidad });
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
          <Row>
            <Col xs lg="4">
              <strong>Producto</strong>
            </Col>
            <Col xs lg="2">
              <strong>Cantidad</strong>
            </Col>
            <Col xs lg="2">
              <strong>Precio Unitario</strong>
            </Col>
            <Col xs lg="2">
              <strong>Total</strong>
            </Col>
            <Col xs lg="2">
              <strong>Acciones</strong>
            </Col>
          </Row>
          {cartContent.list.map((item) => (
            <Row key={item.item.id}>
              <Col xs lg="4" className="product">
                <Image
                  thumbnail="true"
                  src={item.item.pictureUrl}
                  style={{ width: "50px", margin: "0.5rem 1rem 0 0" }}
                />
                <p>{item.item.title}</p>
              </Col>
              <Col xs lg="2">
                {item.cantidad}
              </Col>
              <Col xs lg="2">
                $ {item.item.price}
              </Col>
              <Col xs lg="2">
                $ {item.cantidad * item.item.price}
              </Col>
              <Col xs lg="2">
                <Button variant="danger" onClick={() => removeFromCart(item)}>
                  Eliminar
                </Button>
              </Col>
            </Row>
          ))}
          <Row>
            <Col xs lg="4"></Col>
            <Col xs lg="2"></Col>
            <Col xs lg="2">
              <strong>
                <em>TOTAL</em>
              </strong>
            </Col>
            <Col xs lg="2">
              <strong>$ {cartContent.precioTotal.toFixed(2)}</strong>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
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
            <form onSubmit={generarOrden}>
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
