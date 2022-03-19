import { Col, Container, Row } from "react-bootstrap";
import Item from "../Item/Item";

export default function ItemList({ productos }) {
  return (
    <Container>
      <Row gap={2}>
        {productos.map((p) => (
          <Col>
            <Item key={p.id} producto={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
