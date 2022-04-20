import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Item({ product }) {
  return (
    <Card style={{ width: "18rem", margin: "1rem 0" }}>
      <Card.Img
        variant="top"
        src={product.pictureUrl}
        style={{ height: "318px" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Link to={`/detail/${product.id}`}>
          <Button variant="primary">Ver detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
