import { Button, Card } from "react-bootstrap";

export default function Item({ producto }) {
  console.log(producto);
  return (
    <Card style={{ width: "18rem", margin: "1rem 0" }}>
      <Card.Img variant="top" src={producto.pictureUrl} />
      <Card.Body>
        <Card.Title>{producto.title}</Card.Title>
        <Card.Text>{producto.description}</Card.Text>
        <Button variant="primary">Ver detalles</Button>
      </Card.Body>
    </Card>
  );
}
