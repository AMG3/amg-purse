import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import ItemCount from "../../../components/ItemCount/ItemCount";

export default function ItemDetail({ item }) {
  // TODO:Agregar un estado acà,
  // meter la funcion onadd
  //si el estado cambia mostrar los dos botones de ir al carro o seguir comprando y desaparecer el item count
  // cuando agrega al carrito desaparecen las opciones y solo sale terminar compra y continuar comprando

  const [agregado, setAgregado] = useState(0);

  const onAdd = (cantidad) => {
    setAgregado(cantidad);
  };

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
        {agregado <= 0 ? (
          <ItemCount onAdd={onAdd} />
        ) : (
          <>
            <Link to={`/cart/`}>
              <Button variant="primary">Terminar Compra</Button>
            </Link>
            <Link to={`/`}>
              <Button variant="primary">Seguir Comprando</Button>
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

/* <Link to="Cart">
  <Button onClick={}>Ir al Carrito o Seguir Comprando</Button>
</Link>;

<Link to="Cart">
  <Button onClick={}>Ir al Carrito o Seguir Comprando</Button>
</Link>; */
