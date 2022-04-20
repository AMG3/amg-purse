import { Col, Container, Row } from "react-bootstrap";
import Item from "../Item/Item";

export default function ItemList({ products }) {
  return (
    <Container>
      <Row gap={2}>
        {products.map((p) => (
          <Col key={p.id}>
            <Item product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
