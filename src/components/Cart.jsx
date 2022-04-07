import { Col, Row, Container } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";

function Cart() {
  const { cartList, removeCart } = useCartContext();
  return (
    <Container>
      <Row>
        <Col xs lg="3">
          <strong>Producto</strong>
        </Col>
        <Col xs lg="3">
          <strong>Cantidad</strong>
        </Col>
        <Col xs lg="3">
          <strong>Precio Unitario</strong>
        </Col>
        <Col xs lg="3">
          <strong>Total</strong>
        </Col>
      </Row>
      {cartList.map((item) => (
        <>
          <Row key={item.item.id}>
            <Col xs lg="3">
              {item.item.title}
            </Col>
            <Col xs lg="3">
              {item.cantidad}
            </Col>
            <Col xs lg="3">
              $ {item.item.price}
            </Col>
            <Col xs lg="3">
              $ {item.cantidad * item.item.price}
            </Col>
          </Row>
        </>
      ))}
      <br />
      <button className="btn btn-outline-warning" onClick={removeCart}>
        Limpiar Carro
      </button>
    </Container>
  );
}

export default Cart;
