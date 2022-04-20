import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function MessagePopUp({ orderId, show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Orden Generada</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Su orden fue generada con el código: <strong>{orderId}</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
