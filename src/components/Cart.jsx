import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartList from "./CartList/CartList";
import CartForm from "./CartForm/CartForm";

function Cart() {
  const { cartContent, cleanCart, removeFromCart } = useCartContext();

  const [orderId, setOrderId] = useState(null);
  const [show, setShow] = useState(false);

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
            <CartForm
              cartContent={cartContent}
              setOrderId={setOrderId}
              setShow={setShow}
              cleanCart={cleanCart}
            />
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
