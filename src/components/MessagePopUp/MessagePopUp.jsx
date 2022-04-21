import React from "react";
import { Button, Modal } from "react-bootstrap";
import { MESSAGE_TYPES } from "../../constants/firebase-tables";

export default function MessagePopUp({
  messageType,
  orderId,
  show,
  handleClose,
  errorMessage,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Orden Generada</Modal.Title>
      </Modal.Header>
      {messageType === MESSAGE_TYPES.NOTIFICATION ? (
        <Modal.Body>
          Su orden fue generada con el código: <strong>{orderId}</strong>
        </Modal.Body>
      ) : (
        <Modal.Body>{errorMessage}</Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
