import React from "react";
import { Button, Card } from "react-bootstrap";

export default function ItemDetail({ item }) {
  return (
    <Card style={{ width: "80%", margin: "2rem" }}>
      <Card.Img
        variant="top"
        src={item.pictureUrl}
        style={{ width: "18rem", margin: "1rem 0" }}
      />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          $ {item.price}
        </Card.Subtitle>
        <Button variant="primary">Comprar</Button>
      </Card.Body>
    </Card>
  );
}
