import { useState, useContext } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import image from "../assets/applogored.png";
import MainButton from "../components/MainBtn";
import GIf from "../assets/logogif.gif"

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);

    // YELLOW
    if (success) {
      navigate("/");
    } else {
      setError("You've reached the wrong login destination. Please re-enter your credentials.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Form onSubmit={handleLogin} className="my-4">
            <div className="d-flex justify-content-center mb-4">
              <img src={GIf} alt="App Logo" style={{ height: '300px' }}  />
            </div>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3 mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger text-center mt-2">{error}</p>}
            <div className="d-flex justify-content-center">
              <MainButton>
                LOGIN
              </MainButton>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

// FIXFIXFIIXXXXXXX==============================


// import { useState, useContext } from "react";
// import { Form, Container, Row, Col } from "react-bootstrap";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// // import image from "../assets/applogored.png";
// import LoginButton from "../components/LoginBtn";
// import GIf from "../assets/logogif.gif"

// const Login = () => {
//   const { login, userID  } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const success = login(username, password);

//     // YELLOW
//     if (success) {
//       navigate(`/${userID}`);
//     } else {
//       setError("You've reached the wrong login destination. Please re-enter your credentials.");
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center mt-5">
//         <Col xs={12} md={6}>
//           <Form onSubmit={handleLogin} className="my-4">
//             <div className="d-flex justify-content-center mb-4">
//               <img src={GIf} alt="App Logo" style={{ height: '300px' }}  />
//             </div>

//             <Form.Group controlId="username">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="password" className="mt-3 mb-4">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             {error && <p className="text-danger text-center mt-2">{error}</p>}
//             <div className="d-flex justify-content-center">
//             <LoginButton/>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
