import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import ErrorPage from "./components/ErrorPage.js";
//import Sidebar from "./components/nav/Sidebar.js";
import Topbar from "./components/nav/Topbar.js";
import Profile from "./components/profile/Profile.js";
import Experience from "./components/experience/Experience.js";
import Works from "./components/portfolio/Works.js";
import Overview from "./components/portfolio/Overview.js";

function App() {
  return (
    <Router>
      <div className="w-full h-full">
        {/*<div className="sticky top-0 w-fit h-screen bg-zinc-600 z-50">
          <Sidebar />
        </div>*/}
        <div className="flex flex-col w-full min-h-screen h-fit bg-zinc-800">
          <Topbar />
          <Container fluid="lg" className="flex-grow h-full">
            <Row className="h-full m-0 p-0">
                <Routes>
                  <Route path='*' exact={true} element={<ErrorPage />} />
                  <Route path="/" element={<Navigate to="/portfolio" replace />} />
                  <Route path="/portfolio" exact={true} element={<Profile />} />
                  <Route path="/portfolio/experience" exact={true} element={<Experience />} />
                  <Route path="/portfolio/works" exact={true} element={<Works />} />
                  <Route path="/portfolio/works/:title" exact={true} element={<Overview />} />
                </Routes>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
