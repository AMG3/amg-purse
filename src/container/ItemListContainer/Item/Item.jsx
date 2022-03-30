import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Item({ producto }) {
  return (
    <Card style={{ width: "18rem", margin: "1rem 0" }}>
      <Card.Img
        variant="top"
        src={producto.pictureUrl}
        style={{ height: "318px" }}
      />
      <Card.Body>
        <Card.Title>{producto.title}</Card.Title>
        <Link to={`/detail/${producto.id}`}>
          <Button variant="primary">Ver detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
