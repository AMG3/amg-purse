import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

export default function CartList({ cartContent, removeFromCart }) {
  return (
    <>
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
            {item.quantity}
          </Col>
          <Col xs lg="2">
            $ {item.item.price.toFixed(2)}
          </Col>
          <Col xs lg="2">
            $ {(item.quantity * item.item.price).toFixed(2)}
          </Col>
          <Col xs lg="2">
            <Button variant="danger" onClick={() => removeFromCart(item)}>
              <BsFillTrashFill />
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
          <strong>$ {cartContent.totalPrice.toFixed(2)}</strong>
        </Col>
        <Col xs lg="2"></Col>
      </Row>
    </>
  );
}
