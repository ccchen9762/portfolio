import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, OverlayTrigger, Tooltip, Container, Col } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiLogoGmail, BiBriefcaseAlt } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Topbar() {
  const [onRoute, setOnRoute] = useState(-1);
  useEffect(() => {
    const currentURL = window.location.href;
    if(currentURL.includes("experience")){
      setOnRoute(1);
    }
    else if(currentURL.includes("works")){
      setOnRoute(2);
    }
    else{
      setOnRoute(0);
    }
  }, []); 

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleCopyClick = async (address) => {
    await navigator.clipboard.writeText(address);
    setShowCopiedMessage(true);
  };

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  return (
    <Container className="sticky left-0 z-50 flex w-full h-14 mx-auto my-0">
      <Col className="flex flex-row w-fit h-full px-4 py-0">
        <Nav className="w-fit h-full p-0">
          <Nav.Item className="w-20 h-full px-2 py-0.5">
            <Link
              to="/portfolio"
              onClick={() => {
                setOnRoute(0);
              }}
              className={
                onRoute === 0
                  ? "w-full h-fit m-0 p-0 nav-link rounded-xl text-center bg-stone-100"
                  : "w-full h-fit m-0 p-0 nav-link rounded-xl text-center hover:bg-stone-500"
              }
            >
              <CgProfile color={onRoute === 0 ? "coral" : "white"} className="w-full h-fit mx-auto px-3 py-0.5" />
              <p className={ onRoute === 0 ? "w-full h-fit m-auto p-0 text-xs text-orange-600" : "w-full h-fit m-auto p-0 text-xs text-white"}>Profile</p>
            </Link>
          </Nav.Item>
          <Nav.Item className="w-20 h-full px-2 py-0.5">
            <Link
              to="/portfolio/experience"
              onClick={() => {
                setOnRoute(1);
              }}
              className={
                onRoute === 1
                  ? "w-full h-fit m-0 p-0 nav-link rounded-xl text-center bg-stone-100"
                  : "w-full h-fit m-0 p-0 nav-link rounded-xl text-center hover:bg-stone-500"
              }
            >
              <BiBriefcaseAlt color={onRoute === 1 ? "coral" : "white"} className="w-full h-fit mx-auto px-3 py-0.5" />
              <p className={ onRoute === 1 ? "w-full h-fit m-auto p-0 text-xs text-orange-600" : "w-full h-fit m-auto p-0 text-xs text-white"}>Experience</p>
            </Link>
          </Nav.Item>
          <Nav.Item className="w-20 h-full px-2 py-0.5">
            <Link
              to="/portfolio/works"
              onClick={() => {
                setOnRoute(2);
              }}
              className={
                onRoute === 2
                  ? "w-full h-fit m-0 p-0 nav-link rounded-xl text-center bg-stone-100"
                  : "w-full h-fit m-0 p-0 nav-link rounded-xl text-center hover:bg-stone-500"
              }
            >
              <AiOutlineAppstore color={onRoute === 2 ? "coral" : "white"} className="w-full h-fit mx-auto px-3 py-0.5" />
              <p className={ onRoute === 2 ? "w-full h-fit m-auto p-0 text-xs text-orange-600" : "w-full h-fit m-auto p-0 text-xs text-white"}>Portfolio</p>
            </Link>
          </Nav.Item>
        </Nav>
      </Col>
      
      <Col className="flex flex-row-reverse w-fit h-full px-4 py-0">
        <Nav className="w-fit h-full p-0">
          <Nav.Item onMouseLeave={() => {setShowCopiedMessage(false)}} className="w-20 h-full px-2 py-0.5">
            <OverlayTrigger placement="bottom" overlay={showCopiedMessage ? renderTooltip("Email address copied!") : renderTooltip("click to copy: \n ccchen9762@gmail.com")}>
              <Nav.Link
                className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
                onClick={() => handleCopyClick("ccchen9762@gmail.com")}
              >
                <BiLogoGmail color="white" className="w-full h-fit mx-auto px-3 py-0.5" />
                <p className="w-full h-fit m-auto p-0 text-xs text-white">Email</p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item className="w-20 h-full px-2 py-0.5">
            <OverlayTrigger placement="bottom" overlay={renderTooltip("https://github.com/ccchen9762")}>
              <Nav.Link
                href="https://github.com/ccchen9762"
                target="_blank"
                className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
              >
                <FaGithub color="white" className="w-full h-fit mx-auto px-3 py-0.5" />
                <p className="w-full h-fit m-auto p-0 text-xs text-white">Github</p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
          <Nav.Item className="w-20 h-full px-2 py-0.5">
            <OverlayTrigger placement="bottom" overlay={renderTooltip("https://www.linkedin.com/in/ching-chih-chen/")}>
              <Nav.Link
                href="https://www.linkedin.com/in/ching-chih-chen/"
                target="_blank"
                className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
              >
                <FaLinkedin color="white" className="w-full h-fit mx-auto px-3 py-0.5" />
                <p className="w-full h-fit m-auto p-0 text-xs text-white">Linkedin</p>
              </Nav.Link>
            </OverlayTrigger>
          </Nav.Item>
        </Nav>
      </Col>
    </Container>
  );
}

export default Topbar;
