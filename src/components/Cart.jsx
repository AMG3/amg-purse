import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartList from "./CartList/CartList";
import CartForm from "./CartForm/CartForm";
import MessagePopUp from "./MessagePopUp/MessagePopUp";
import { MESSAGE_TYPES } from "../constants/constants";

function Cart() {
  const { cartContent, cleanCart, removeFromCart } = useCartContext();

  const [orderId, setOrderId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      {cartContent.list.length <= 0 ? (
        <div className="container-center-elements">
          <p>No hay nada en el carro</p>
          <Link to={`/`}>
            <Button variant="primary">Seguir Comprando</Button>
          </Link>
        </div>
      ) : (
        <Container>
          <CartList cartContent={cartContent} removeFromCart={removeFromCart} />
          <br />
          <div className="container-center-elements">
            <Button variant="warning" onClick={cleanCart}>
              Limpiar Carro
            </Button>
            <hr />
            <CartForm
              cartContent={cartContent}
              setOrderId={setOrderId}
              setShow={setShow}
              cleanCart={cleanCart}
            />
          </div>
        </Container>
      )}
      <MessagePopUp
        messageType={MESSAGE_TYPES.NOTIFICATION}
        orderId={orderId}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}

export default Cart;
