import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, OverlayTrigger, Tooltip, Container, Col } from "react-bootstrap";
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

  const NavRouteItem = ({link, routeNum, IconComponent, text}) => {
    return (
    <Nav.Item className="flex flex-col w-16 md:w-20 h-full px-0.5 md:px-2 py-0.5 transition-all duration-300">
      <Link
        to={link}
        onClick={() => {
          setOnRoute(routeNum);
        }}
        className={
          onRoute === routeNum
            ? "w-full h-fit m-0 p-0 nav-link rounded-xl text-center bg-stone-100"
            : "w-full h-fit m-0 p-0 nav-link rounded-xl text-center hover:bg-stone-500"
        }
      >
        <IconComponent color={onRoute === routeNum ? "coral" : "white"} className="flex-grow w-fit h-full mx-auto px-0 py-0.5" />
        <p className={ onRoute === routeNum ? "w-full h-fit m-auto p-0 text-xs text-orange-600" : "w-full h-fit m-auto p-0 text-xs text-white"}>{text}</p>
      </Link>
    </Nav.Item>);
  }

  const NavInfoItem = ({url, IconComponent, text}) => {
    return (
    <Nav.Item className="flex flex-col w-16 md:w-20 h-16 md:h-full px-0.5 md:px-2 py-0.5 transition-all duration-300">
      <OverlayTrigger placement="bottom" overlay={renderTooltip(url)}>
        <Nav.Link
          href={url}
          target="_blank"
          className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
        >
          <IconComponent color="white" className="flex-grow w-fit h-full mx-auto px-0 py-0.5" />
          <p className="w-full h-fit m-auto p-0 text-xs text-white">{text}</p>
        </Nav.Link>
      </OverlayTrigger>
    </Nav.Item>
    );
  }

  return (
    <Container fluid className="sticky top-0 left-0 z-50 w-full h-16 p-0 bg-zinc-800">
      <Container fluid="lg" className="z-50 flex w-full h-16 my-0 !px-0.5 md:!px-3 py-1 bg-zinc-800 border-b">
        <Col xs md={6} className="flex flex-row overflow-y-auto h-full px-1 xl:px-16 py-0 transition-all duration-300">
          <Nav expand="md" className="w-fit h-full p-0">
            <NavRouteItem link="/portfolio" routeNum={0} IconComponent={CgProfile} text="Profile" />
            <NavRouteItem link="/portfolio/experience" routeNum={1} IconComponent={BiBriefcaseAlt} text="Experience" />
            <NavRouteItem link="/portfolio/works" routeNum={2} IconComponent={AiOutlineAppstore} text="Works" />
          </Nav>
        </Col>
        <Col xs="auto" md={6} className="flex flex-row-reverse flex-nowrap h-full px-1 xl:px-16 py-0 transition-all duration-300">
          <Navbar expand="md" variant="dark" className="!justify-center w-16 md:w-full h-full m-0 py-1.5 md:!py-0">
            <Navbar.Toggle aria-controls="personal-info-nav" className="mb-2"/>
            <Navbar.Collapse id="personal-info-nav" className="flex flex-col w-16 md:w-full h-fit md:h-full m-0 p-0">
              <Nav className="ms-auto h-48 md:h-full p-0 shrink">
                <Nav.Item onMouseLeave={() => {setShowCopiedMessage(false)}} className="flex flex-col w-16 md:w-20 h-16 md:h-full px-0.5 md:px-2 py-0.5 transition-all duration-300">
                  <OverlayTrigger placement="bottom" overlay={showCopiedMessage ? renderTooltip("Email address copied!") : renderTooltip("click to copy: \n ccchen9762@gmail.com")}>
                    <Nav.Link
                      className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
                      onClick={() => handleCopyClick("ccchen9762@gmail.com")}
                    >
                      <BiLogoGmail color="white" className="flex-grow w-fit h-full mx-auto px-0 py-0.5" />
                      <p className="w-full h-fit m-auto p-0 text-xs text-white">Email</p>
                    </Nav.Link>
                  </OverlayTrigger>
                </Nav.Item>
                <NavInfoItem url="https://github.com/ccchen9762" IconComponent={FaGithub} text="Github" />
                <NavInfoItem url="https://www.linkedin.com/in/ching-chih-chen/" IconComponent={FaLinkedin} text="Linkedin" />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Container>
    </Container>
  );
}

export default Topbar;
