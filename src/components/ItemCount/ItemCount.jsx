import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";

const ItemCount = ({ onAdd, stock }) => {
  const initial = 1;

  const [count, setCount] = useState(initial);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <Stack gap={2} className="col-md-4 mx-auto">
      <Row className="justify-content-md-center">
        <Col xs lg="2" className="justify-content-md-center">
          <Button
            variant="warning"
            onClick={decrease}
            disabled={count === initial}
          >
            -
          </Button>
        </Col>
        <Col xs lg="2" className="justify-content-md-center">
          <label>{count}</label>
        </Col>
        <Col xs lg="2" className="justify-content-md-center">
          <Button
            variant="success"
            onClick={increase}
            disabled={count === stock}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="6" className="justify-content-md-center">
          <Button onClick={() => onAdd(count)} disabled={stock === 0}>
            Agregar al Carrito
          </Button>
        </Col>
      </Row>
    </Stack>
  );
};

export default ItemCount;
