import { Button, Card } from "react-bootstrap";

export default function Item({ producto }) {
  return (
    <Card style={{ width: "18rem", margin: "1rem 0" }}>
      <Card.Img variant="top" src={producto.pictureUrl} />
      <Card.Body>
        <Card.Title>{producto.title}</Card.Title>
        <Button variant="primary">Ver detalles</Button>
      </Card.Body>
    </Card>
  );
}
