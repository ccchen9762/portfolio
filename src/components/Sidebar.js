import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
//import { BiMenu } from "react-icons/bi";
//import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiBriefcaseAlt } from "react-icons/bi";
//import { GrProjects } from "react-icons/gr";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Sidebar() {
  const [onRoute, setOnRoute] = useState(0);

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  return (
    <div className="flex items-center w-16 h-screen m-0 py-1">
      <Nav className="h-fit p-0">
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Profile")}>
            <Link
              to="/"
              onClick={() => {
                setOnRoute(0);
              }}
              className={
                onRoute === 0
                  ? "w-full h-fit m-0 p-0 nav-link rounded-2xl bg-stone-100"
                  : "w-full h-fit m-0 p-0 nav-link rounded-2xl hover:bg-stone-500"
              }
            >
              <CgProfile color={onRoute === 0 ? "coral" : "white"} className="w-full h-12 p-2" />
            </Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Experience")}>
            <Link
              to="/experience"
              onClick={() => {
                setOnRoute(1);
              }}
              className={
                onRoute === 1
                  ? "w-full h-fit m-0 p-0 nav-link rounded-2xl bg-stone-100"
                  : "w-full h-fit m-0 p-0 nav-link rounded-2xl hover:bg-stone-500"
              }
            >
              <BiBriefcaseAlt color={onRoute === 1 ? "coral" : "white"} className="w-full h-12 p-2" />
            </Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Protfolio")}>
            <Link
              to="/works"
              onClick={() => {
                setOnRoute(2);
              }}
              className={
                onRoute === 2
                  ? "w-full h-fit m-0 p-0 nav-link rounded-2xl bg-stone-100"
                  : "w-full h-fit m-0 p-0 nav-link rounded-2xl hover:bg-stone-500"
              }
            >
              <AiOutlineAppstore
                color={onRoute === 2 ? "coral" : "white"}
                className="w-full h-12 p-2"
              />
            </Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="flex items-center w-full h-3">
          <div className="w-full h-1 mx-2.5 my-0 p-0 rounded-2xl bg-white"></div>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("Github Page")}>
            <Nav.Link
              href="https://github.com/moom1315"
              target="_blank"
              className="w-full h-fit m-0 p-0 rounded-2xl hover:bg-stone-500"
            >
              <FaGithub color="white" className="w-full h-12 p-2" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Item className="w-full h-fit px-2 py-1.5">
          <OverlayTrigger placement="right" overlay={renderTooltip("LinkedIn Page")}>
            <Nav.Link
              href="https://www.linkedin.com/in/ching-chih-chen/"
              target="_blank"
              className="w-full h-fit m-0 p-0 rounded-2xl hover:bg-stone-500"
            >
              <FaLinkedin color="white" className="w-full h-12 p-2" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
