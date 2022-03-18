import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";

const ItemCount = () => {
  const initial = 1;
  const stock = 5;

  const [count, setCount] = useState(initial);

  const aumentar = () => {
    setCount(count + 1);
  };

  const disminuir = () => {
    setCount(count - 1);
  };

  const onAdd = () => {
    alert("Agregarás " + count + " productos");
  };

  return (
    <Stack gap={2} className="col-md-4 mx-auto">
      <Row className="justify-content-md-center">
        <Col xs lg="2" className="justify-content-md-center">
          <Button
            variant="warning"
            onClick={disminuir}
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
            onClick={aumentar}
            disabled={count === stock}
          >
            +
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5" className="justify-content-md-center">
          <Button onClick={onAdd} disabled={stock === 0}>
            Agregar al Carrito
          </Button>
        </Col>
      </Row>
    </Stack>
  );
};

export default ItemCount;
