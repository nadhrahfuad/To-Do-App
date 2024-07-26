import { Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import image from "../assets/applogo.png";

const Layout = () => {
  const { username, logout } = AuthContext();

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={image} width={50} height={50} alt="Travel Logo" />
          </Navbar.Brand>
          {/* pass name */}
          <Nav.Item className="me-3">Welcome, {username}</Nav.Item>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="d-flex justify-content-center" href="/">
                My Trips
              </Nav.Link>
              <Nav.Link className="d-flex justify-content-center" href="/add">
                Add Trip
              </Nav.Link>
              <Nav.Link
                className="d-flex justify-content-center"
                href="/travelnews"
              >
                Travel News
              </Nav.Link>
              <Nav.Link
                className="d-flex justify-content-center"
                href="/mygallery"
              >
                Snapshots
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link
                className="d-flex justify-content-center"
                onClick={logout}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
