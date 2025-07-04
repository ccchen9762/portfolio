import "./Works.css"

import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import projectInfo from "../../assets/data/ProjectInfo.json";

function WorkBlock({index}) {
  return (
    <Col
      sm={12}
      xl={6}
      xxl={4}
      className="h-fit mt-3 px-2 py-2 d-flex align-items-center justify-content-center"
    >
      <Link to={`/portfolio/works/${projectInfo.projects[index].title}`} className="w-72 flex flex-col items-center justify-center no-underline shiftAnim">
        <div className="w-80 flex flex-col items-center justify-center">
          <Image
            src={require(`../../assets/images/${projectInfo.projects[index].cover.src}`)}
            className="w-full h-60 rounded-md object-cover object-center shadow-black hover:!shadow-xl"
          />
          <h3 className="text-amber-300 text-center text-xl mt-2 bg-transparent	Monstserrat">{projectInfo.projects[index].title.replaceAll('-', ' ')}</h3>
        </div>
      </Link>
    </Col>
  );
}

function Works() {
  const len = projectInfo.projects.length;
  const WorkBlocks = () => {
    const blocks = [];
    for (let i = 0; i < len; i++) {
      blocks.push(
        <WorkBlock key={i} index={i} />
      );
    }
    return blocks;
  };

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
      <Row className="w-full h-fit m-0 p-0">
        <h3 className="text-yellow-300 text-4xl text-center mt-5 Monstserrat truncate">PORTFOLIO</h3>
      </Row>
      <Row className="w-full h-fit m-0 p-0">
        {WorkBlocks()}
      </Row>
    </motion.div>
  );
}

export default Works;
