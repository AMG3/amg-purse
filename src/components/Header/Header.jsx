import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{
            padding: "1rem",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          to="/"
        >
          AMG-PURSE
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              style={{
                padding: "1rem",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/category/bags"
            >
              Bolsos y Morrales
            </NavLink>

            <NavLink
              style={{
                padding: "1rem",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/category/clothes"
            >
              Ropa
            </NavLink>

            <NavLink
              style={{
                padding: "1rem",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/category/accessories"
            >
              Accesorios
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/cart">
              <CartWidget />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
