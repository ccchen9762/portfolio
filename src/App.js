import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar.js";
import Works from "./components/Works.js";

function App() {
  return (
    <Router>
      <div className="flex h-fit">
        <div className="sticky top-0 w-fit h-screen bg-stone-700">
          <Sidebar />
        </div>
        <div className="w-full bg-stone-500">
          <Container>
            <Row>
              <Col className="m-0 p-0">
                <Routes>
                  <Route path="/" element={<></>} />
                  <Route path="/experience" element={<></>} />
                  <Route path="/works" element={<Works />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
