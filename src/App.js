import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ErrorPage from "./components/ErrorPage.js";
import Sidebar from "./components/Sidebar.js";
import Experience from "./components/Experience.js";
import Works from "./components/Works.js";
import Overview from "./components/Overview.js";

function App() {
  return (
    <Router>
      <div className="flex h-fit">
        <div className="sticky top-0 w-fit h-screen bg-zinc-600">
          <Sidebar />
        </div>
        <div className="w-full bg-zinc-200">
          <Container className="h-full">
            <Row className="h-full">
              <Col className="m-0 p-0">
                <Routes>
                  <Route path='*' exact={true} element={<ErrorPage />} />
                  <Route path="/" exact={true} element={<></>} />
                  <Route path="/experience" exact={true} element={<Experience />} />
                  <Route path="/works" exact={true} element={<Works />} />
                  <Route path="/works/:title" exact={true} element={<Overview />} />
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
