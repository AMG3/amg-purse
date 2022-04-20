import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartList from "./CartList/CartList";
import CartForm from "./CartForm/CartForm";
import MessagePopUp from "./MessagePopUp/MessagePopUp";

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
      <MessagePopUp orderId={orderId} show={show} handleClose={handleClose} />
    </>
  );
}

export default Cart;
