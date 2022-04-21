import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import ItemCount from "../../../components/ItemCount/ItemCount";
import { useCartContext } from "../../../context/CartContext";

export default function ItemDetail({ item }) {
  const [quantity, setQuantity] = useState(0);

  const { addToCart } = useCartContext();

  const onAdd = (quantity) => {
    setQuantity(quantity);
    addToCart({ item, quantity });
  };

  return (
    <Card style={{ width: "80%", margin: "2rem" }}>
      <Card.Img
        variant="top"
        src={item.pictureUrl}
        style={{ width: "10rem", margin: "1rem 0" }}
      />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          $ {item.price}
        </Card.Subtitle>
        {quantity <= 0 ? (
          <ItemCount onAdd={onAdd} stock={item.stock} />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Link to={`/cart/`}>
              <Button variant="primary">Terminar Compra</Button>
            </Link>
            <Link to={`/`}>
              <Button variant="primary">Seguir Comprando</Button>
            </Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
