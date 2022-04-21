import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader({ message }) {
  return (
    <div className="container-center-elements">
      <p>{message}</p>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
