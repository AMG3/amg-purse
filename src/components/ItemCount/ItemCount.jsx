import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";

//TODO: pasar inital, stock y onAdd como paràmetros,
// al usar este componente se puede pasar hardcoded
const ItemCount = ({ onAdd }) => {
  const initial = 1;
  const stock = 5;

  const [count, setCount] = useState(initial);

  const aumentar = () => {
    setCount(count + 1);
  };

  const disminuir = () => {
    setCount(count - 1);
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
