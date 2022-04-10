import { useEffect, useState } from "react";
import { Col, Row, Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function Cart() {
  const { cartContent, cleanCart, removeFromCart } = useCartContext();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cartContent.list.forEach((item) => {
      total += item.cantidad * item.item.price;
    });

    setTotalPrice(total);
  }, [cartContent, totalPrice]);

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
              <strong>$ {totalPrice.toFixed(2)}</strong>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
          <br />
          <button className="btn btn-outline-warning" onClick={cleanCart}>
            Limpiar Carro
          </button>
        </Container>
      )}
    </>
  );
}

export default Cart;
