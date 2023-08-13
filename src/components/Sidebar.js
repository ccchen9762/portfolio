import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiLogoGmail, BiBriefcaseAlt } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Sidebar() {
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

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  return (
    <div className="flex items-center w-20 h-screen m-0 py-2">
      <Nav className="h-fit p-0">
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Profile")}>
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
              <CgProfile color={onRoute === 0 ? "coral" : "white"} className="w-full h-auto px-3 pt-1" />
              <p className={ onRoute === 0 ? "w-full h-fit m-0 px-0 pb-1 text-xs text-orange-600" : "w-full h-fit m-0 px-0 pb-1 text-xs text-white"}>Profile</p>
            </Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Experience")}>
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
              <BiBriefcaseAlt color={onRoute === 1 ? "coral" : "white"} className="w-full h-auto px-3 pt-1" />
              <p className={ onRoute === 1 ? "w-full h-fit m-0 px-0 pb-1 text-xs text-orange-600" : "w-full h-fit m-0 px-0 pb-1 text-xs text-white"}>Experience</p>
            </Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Portfolio")}>
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
              <AiOutlineAppstore color={onRoute === 2 ? "coral" : "white"} className="w-full h-auto px-3 pt-1" />
              <p className={ onRoute === 2 ? "w-full h-fit m-0 px-0 pb-1 text-xs text-orange-600" : "w-full h-fit m-0 px-0 pb-1 text-xs text-white"}>Portfolio</p>
            </Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="flex items-center w-full h-3">
          <div className="w-full h-1 mx-2.5 my-0 p-0 rounded-2xl bg-white"></div>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("ccchen9762@gmail.com")}>
            <Nav.Link
              href="mailto:ccchen9762@gmail.com"
              target="_blank"
              className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
            >
              <BiLogoGmail color="white" className="w-full h-fit px-3 pt-1" />
              <p className="w-full h-fit m-0 px-0 pb-1 text-xs text-white">Email</p>
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("https://github.com/ccchen9762")}>
            <Nav.Link
              href="https://github.com/ccchen9762"
              target="_blank"
              className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
            >
              <FaGithub color="white" className="w-full h-fit px-3 py-1" />
              <p className="w-full h-fit m-0 px-0 pb-1 text-xs text-white">Github</p>
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("https://www.linkedin.com/in/ching-chih-chen/")}>
            <Nav.Link
              href="https://www.linkedin.com/in/ching-chih-chen/"
              target="_blank"
              className="w-full h-fit m-0 p-0 rounded-xl text-center hover:bg-stone-500"
            >
              <FaLinkedin color="white" className="w-full h-fit px-3 py-1" />
              <p className="w-full h-fit m-0 px-0 pb-1 text-xs text-white">Linkedin</p>
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
